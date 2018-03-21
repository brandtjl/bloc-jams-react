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
            currentSong: ' ',
            currentTime: 0,
            duration: album.songs[0].duration,
            currentVolume: .5,
            isPlaying: false,
            isHovering: false
        };
        this.audioElement = document.createElement('audio'); //not assigned to state since that would trigger a re-render of DOM
        this.audioElement.src = album.songs[0].audioSrc; //set to the first song
    }
    componentDidMount() {  //pre-defined React Lifecycle method
        //this.audioElement.addEventListener('timeupdate', (e) => { //time update and durationchange are predefined HTML events
        //    this.setState({ currentTime: this.audioElement.currentTime });
        //});
        //this.audioElement.addEventListener('durationchange', (e) => {
        //    this.setState({ duration: this.audioElement.duration });
        //});

        //refactoring componentDidMount() so that the callbacks are being stored on the 'this' keyword ??
        //in order to remove event handlers, the function specified with the addEventListener() method
        //must be an external function
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationChange: e => {
                this.setState({ duration: this.audioElement.duration });
            },
            volumeChange: e => {
                this.setState({ currentVolume: this.audioElement.volume});
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationChange);
        this.audioElement.addEventListener('volumechange', this.eventListeners.volumeChange);
    }
    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate',this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationChange',this.eventListeners.durationChange);
    }

    play() {   //how does this work if it doesn't accept a parameter?
        this.audioElement.play(); //creates <audio> element? which executes its own play()method?
        this.setState({ isPlaying: true }); // this.setState as opposed to this.state.isPLaying
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
    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime; //this currentTime is predefined property of 'audio' element
        this.setState({ currentTime: newTime });
    }
    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ currentVolume: newVolume});
    }
    formatTime(timeInSecs) {
        var minutes = Math.floor(timeInSecs / 60);
        var seconds = (Math.floor(timeInSecs) - minutes * 60);
        var formattedTime = `${minutes} : ${seconds}`;
        if (isNaN(seconds)) {
            return '--:--';
        } else {
        return formattedTime;
    }
        //this.setState({ currentTime: formattedTime });
    }
    handleHover(e) {
        //this.setState({currentSong: song});
        //const isSameSong = this.state.currentSong === song; 
        console.log(this.state.currentSong);
        //console.log(song);
        //if (isSameSong){
        this.setState({ isHovering: true});
        //}
    }   
    handleLeave(e) {
        //const isSameSong = this.state.currentSong === song; 
        //if (isSameSong){
        this.setState({ isHovering: false});
        //}
    }
    render() {
        //var setClassName = this.state.hovered && this.state.isPlaying ? 'ion-play' : 'ion-pause';
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
                            {  
                            this.state.album.songs.map( (song, index) => 
                            //<tr className="song" key={index} onClick={ () => this.handleSongClick(song)} onMouseEnter={ () => this.handleHover(song)} onMouseLeave={ () => this.handleLeave(song)}>
                            <tr className="song" key={index} onClick={ () => this.handleSongClick(song)} onMouseEnter={ () => this.setState({isHovering: index})} onMouseLeave={ () => this.setState({isHovering: false})}>
                            {/*//<td className={this.state.isHovering ? "ion-play" : "noClass"}>
                            //    {!this.state.isHovering &&<div>{index + 1}
                            //    </div>}
                            //</td> */}
                            <td className="song-number"> {this.state.currentSong === song?
                                <span className ={this.state.isPlaying ? "ion-pause" : "ion-play"}></span>
                                : this.state.isHovering === index ? <span className="ion-play"></span>
                                : <span>{index + 1 + "."}</span>
                            }</td>
                            <td>{song.title}</td>
                            <td>{this.formatTime(song.duration)}</td>
                            </tr>
                            )
                             }
                        
                    </tbody>
                </table>   {/* passing props to PlayerBar component */}
                <PlayerBar 
                isPlaying={this.state.isPlaying} 
                currentSong={this.state.currentSong} 
                currentTime={this.formatTime(this.audioElement.currentTime)}  //because these are pre-defined properties of the 'audio' element
                duration={this.formatTime(this.audioElement.duration)}
                volume={this.audioElement.volume}
                handleSongClick={() => this.handleSongClick(this.state.currentSong)}
                handlePrevClick={() => this.handlePrevClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
                /> 
            </section>
        );
    }
}

export default Album;