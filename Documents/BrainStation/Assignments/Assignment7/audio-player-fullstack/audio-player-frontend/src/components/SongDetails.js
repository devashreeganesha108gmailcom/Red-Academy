import React, {Component} from 'react';

//class for displaying detailed description of songs
class SongDetails extends Component {
    render() {
        //detailed description of the required song
        let description = this.props.songList[this.props.id].description
        return (
            <div>
                <p>{description}</p>
            </div>
        )
    }
}

export default SongDetails;