import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);
         
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
  //now it sets state.album property to album variable which is album with matching url
        this.state = {
            album: album,
            currentSong: album.songs[0],
            isPlaying: false
        };
        this.audioElement = document.createElement('audio'); //not assigned to state since that would trigger a re-render of DOM
        this.audioElement.src = album.songs[0].audioSrc; //set to the first song
    }
    play() {   //how does this work if it doesn't accept a parameter?
        this.audioElement.play(); //creates <audio> element? which executes its own play()method?
        this.setState({ isPlaying: true });
    }
    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }
    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song }); //song = song title?
    }
    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song; //if current song equals clicked song, sets to true
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) {
                this.setSong(song);
            }
            this.play();  //how does it know which song to play? current song is reset by setSong method above
        };
    }
    handlePrevClick(song) {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play(newSong);  //how does this work if play() doesn't accept a parameter?
    }
    handleNextClick() {              //does 'song' at beginning of findIndex() function mean anything?
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(this.state.album.songs.length -1, currentIndex + 1); //use .length
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play(newSong);
    }
    render() {
        return(
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt="album cover"/>
                    <div className='album-details'>  {/*why use a className for some but id for others?? */}
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>   
                    <tbody> 
                            {   //will only pause if i click on the first row/song 
                            this.state.album.songs.map( (song, index) => 
                            <tr className="song" key={index} onClick={ () => this.handleSongClick(song) }>
                            <td>{index + 1}</td>
                            <td>{song.title}</td>
                            <td>{song.duration}</td>
                            </tr>
                            )
                             }
                        
                    </tbody>
                </table>   {/* passing props to PlayerBar component */}
                <PlayerBar 
                isPlaying={this.state.isPlaying} 
                currentSong={this.state.currentSong} 
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                /> 
            </section>
        );
    }
}

export default Album;