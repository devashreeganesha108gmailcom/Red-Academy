import React, { Component } from 'react';

class AudioPlayer extends Component {
    render() {
        return (
            <div class="container">
                <div class="row center-align">
                    <div class="col s12 m2">
                        <a class="waves-effect waves-light btn col-content controlbutton" onClick={() => { this.props.play() }}><i class="material-icons">play_circle_outline</i></a>
                    </div>
                    <div class="col s12 m2">
                        <a class="waves-effect waves-light btn col-content controlbutton" onClick={() => { this.props.pause() }}><i class="material-icons">pause</i></a>
                    </div>
                    <div class="col s12 m3">
                        <a class="waves-effect waves-light btn col-content controlbutton" type="button" onClick={() => { this.props.changeSong(this.props.currentSong) }}>Change</a>
                    </div>
                    <div class="col s12 m2">
                        <a class="waves-effect waves-light btn col-content controlbutton" onClick={() => { this.props.prevSong() }}><i class="material-icons">chevron_left</i></a>
                    </div>
                    <div class="col s12 m2">
                        <a class="waves-effect waves-light btn col-content controlbutton" onClick={() => { this.props.nextSong() }}><i class="material-icons">chevron_right</i></a>
                    </div>   
                </div>
            </div>
        )
    }
}

export default AudioPlayer;



