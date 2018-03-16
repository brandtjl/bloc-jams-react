import React, {Component} from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <button id="previous" onClick={this.props.handlePrevClick}>
                        <span className="ion-skip-backward"></span>  {/* // span is like <p> but no line break */}
                    </button>
                    <button id="play-pause" onClick={this.props.handleSongClick}>
                        <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>  {/*ionicon images/buttons */}
                        {/* ternary operator - if this.props.isPlaying is true then ion-pause else ion-play */}
                    </button>
                    <button id="next" onClick={this.props.handleNextClick}>
                        <span className="ion-skip-forward"></span>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">{this.props.currentTime}</div>
                    <input type="range" 
                    className="seek-bar" 
                    value={(this.props.currentTime / this.props.duration) || 0}
                    max="1"
                    min="0"
                    step="0.01"
                    onChange={this.props.handleTimeChange}  //sends (e) by default?
                     />
                    <div className="total-time">{this.props.duration}</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-volume-low"></div>  {/* why icon? */}
                    <input type="range" 
                    className="seek-bar" 
                    max="1"
                    min="0"
                    step="0.01"
                    onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-volume-high"></div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;