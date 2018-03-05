import React, { Component } from 'react'
import SongsList from './components/SongsList'
import {Route, Link } from 'react-router-dom'
import axios from 'axios'
import  AudioSpectrum from 'react-audio-spectrum'
import AudioControls from './components/AudioControls'
import Progress from 'react-progressbar'
import './styles/css/styles.css'

//class for the main App
class App extends Component {
  constructor() {
    super()
    this.state = {
      currentSong: 0, //current song index
      playing : false, //boolean variable whose value indicates whether song is currently being played
      songs : [], //array for holding the songs
      isLoading : true, //boolean variable whose value inidicates whether the component is being loaded
      percentage : 0, //the percentage of progress in the progress bar
      currentSongCurrentTime : 0, //time elapsed in the current song being played
      currentSongDuration : 0 //total time duration of the current song being played
    }
    this.componentDidMount = this.componentDidMount.bind(this); //binding the component did mount function
  }
  //function that gets called whenever the state of the component changes
  componentDidUpdate(){
    let duration = this.audioPlayer.duration
    let currentTime = this.audioPlayer.currentTime
    this.state.currentSongCurrentTime = currentTime
    this.state.currentSongDuration = duration
  }
  //function that updates the progress bar
  updateProgressBar = () => {
    //calculate percentage of progress
    let percentage = (Number(this.state.currentSongCurrentTime) / Number(this.state.currentSongDuration)) * 100
    //setting the state for the percentage of progress
    this.setState({
      percentage
    })
  }
  //function that gets called when the component gets loaded
  componentDidMount = () => {
    //fetching data from the server
    axios.get('http://localhost:8080/songslist')
      .then(function (response) {
        this.setState({
          songs : response.data,
          isLoading : false //setting state variable to false after component has loaded
        })
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }
  //function that changes the song index
  changeSongIndex = (index) => {
    this.setState({
      currentSong : index //setting state variable for song index
    })
  }
  //function that gets called when the pervious song button is pressed
  prevSong = () => {
    let tempCurrentSong = this.state.currentSong
    if(tempCurrentSong > 0)
      tempCurrentSong--
    else
      tempCurrentSong = this.state.songs.length-1
    
    //continues playing song if the current song is still playng
    if(this.state.playing){
      this.audioPlayer.load()
      this.audioPlayer.play()
    }

    //setting the state variable
    this.setState({
      currentSong: tempCurrentSong
    })
  }

  //function that gets called when the next song button gets pressed
  nextSong = () => {
    let tempCurrentSong = this.state.currentSong
    if(tempCurrentSong < this.state.songs.length-1)
      tempCurrentSong++
    else
      tempCurrentSong = 0

    //continues playing song if the current song is still playng
    if (this.state.playing) {
      this.audioPlayer.load()
      this.audioPlayer.play()
    }
    //sets the required state variable to their appropriate values
    this.setState({
      currentSong : tempCurrentSong
    })
  }
  
  //function that gets called when the play button besides each song is pressed
  playSong = (index) => {
    //sets the required state variables to their appropriate values
    this.setState({
      playing : !this.state.playing,
      currentSong : index
        }, () => {
        this.audioPlayer.load()
        this.audioPlayer.play()
        })
  }
  //function that gets called when the play button in the main audio controls is pressed
  play = () => {
    this.audioPlayer.play()
    this.setState({
      playing : true
    })
  }
  //function that gets called when the pause button in the main audio controls is pressed
  pause = () => {
    this.audioPlayer.pause()
    this.setState({
      playing : false
    })
  }
  //function that gets called when the change button in the main audio controls is pressed
  changeSong = (index) => {
    let tempCurrentSong = this.state.currentSong
    if (tempCurrentSong < this.state.songs.length-1)
      tempCurrentSong++
    else
      tempCurrentSong = 0
    this.setState({
      currentSong: tempCurrentSong
    }, ()=>{
      this.audioPlayer.load()
      this.audioPlayer.play()
    })   
  }
  
  render() {
    if (!this.state.isLoading){
      return (
        <div className="App">
          <div className="visualizer ">
                <div className="container row">
                  <Link to="/">
                    <h1 class="title center-align col s12">AUDIO PLAYER</h1>
                  </Link>
                  {/* audio player component */}
                  <audio id="audio-element" ref={(self) => { this.audioPlayer = self }} onTimeUpdate={this.updateProgressBar}>
                    <source src={this.state.songs[this.state.currentSong].source} />
                  </audio>
                  <div class="col s12">
                    <AudioControls  songs={this.state.songs} 
                                    currentSong={this.state.currentSong}  
                                    play={this.play}
                                    pause={this.pause}
                                    changeSong={this.changeSong}
                                    nextSong={this.nextSong}
                                    prevSong={this.prevSong}
                                    />
                  </div>
                  <div class="center-align col s12 audiospectrum">
                    {/* audio visualizer component */}
                    <AudioSpectrum class=""
                                   id="audio-canvas"
                                   height={300}
                                   width={260}
                                   audioId={'audio-element'}
                                   capColor={'red'}
                                   capHeight={2}
                                   meterWidth={2}
                                   meterCount={512}
                                   meterColor={[
                                    { stop: 0, color: '#f00' },
                                    { stop: 0.5, color: '#0CD7FD' },
                                    { stop: 1, color: 'red' }
                                  ]}
                                  gap={4}
                    />
                    {/* progress bar component that indicates how much of the song has finished playing  */}
                    <Progress completed={this.state.percentage} />
                  </div>
                  {/* displaying the currently playing or selected song */}
                  <div class="currentsong col s12">
                    { this.state.playing ? 
                      (
                        <div>
                          <h5 class="center-align">CURRENTLY PLAYING SONG</h5>
                          <h5 class="center-align">{this.state.songs[this.state.currentSong].title}</h5>
                        </div>
                      )
                      : 
                      (
                        <div>
                          <h5 class="center-align">CURRENTLY SELECTED SONG</h5>
                          <h5 class="center-align">{this.state.songs[this.state.currentSong].title}</h5>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
          <div class="songlist">
            <Link to="/songslist">
              <div class="container">
                <h5 class="center-align">Songs List</h5>
              </div>
            </Link>
            <Route path="/songslist" render={() => <SongsList changeSongIndex={this.changeSongIndex} playSong={this.playSong} songs={this.state.songs} />} />
          </div>
        </div>
      )
    }
    else{
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

export default App;
