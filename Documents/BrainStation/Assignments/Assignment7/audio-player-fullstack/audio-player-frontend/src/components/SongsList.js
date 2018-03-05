import React, {Component} from 'react';
import SongDetails from './SongDetails';
import { Route, Link } from 'react-router-dom'
import '../styles/css/styles.css'

//class for displaying list of songs and their detailed description
class SongsList extends Component {
    render() {
        //function for playing song that calls the corresponding function in the App.js class
        let playSong = (index) => {
            this.props.playSong(index)
        } 
        //function for changing index of the song that calls the corresponding function in the App.js class
        let changeSongIndex = (index) => {
            this.props.changeSongIndex(index)
        }
        //list of songs passed as props
        let songList = this.props.songs
        //array of song list container with the detailed description drop down accordions
        let finalSongList = songList.map(function(element) {
            return( 
                <div class="container black" key={element.id}>  
                    <Link to={`/songslist/songdetail/${element.id}`}>
                        <ul class="col s6 collapsible popup black" data-collapsible="accordion">
                            <li class="list black">
                                <div onClick={() => { changeSongIndex(element.id) }} class="collapsible-header black">
                                    {/* name of the song */}
                                    <div class="listtitle" >{element.title}</div>
                                    {/* button when clicked plays the songs */}
                                    <a class="waves-effect orange darken-4 btn col-content center-align individual" onClick={() => { playSong(element.id) }}>
                                        <i class="material-icons">play_circle_outline</i>
                                    </a>
                                </div>
                                <div class="collapsible-body list">
                                    {/* song details component that dispalys the description of the song */}
                                    <SongDetails id={element.id} songList={songList}/>
                                </div>
                            </li>
                        </ul>
                    </Link>
                </div>
            )
        });
        return(
            <div>
                {finalSongList}
                <Route path="/songslist/songdetail/:id"/>
            </div>
        )
    }
}

export default SongsList;