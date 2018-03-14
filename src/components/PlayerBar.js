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
                    <button id="next">
                        <span className="ion-skip-forward"></span>
                    </button>
                </section>
                <section id="time-control">
                    <div className="current-time">-:--</div>
                    <input type="range" className="seek-bar" value="0" />
                    <div className="total-time">-:--</div>
                </section>
                <section id="volume-control">
                    <div className="icon ion-volume-low"></div>  {/* why icon? */}
                    <input type="range" className="seek-bar" value="80" />
                    <div className="icon ion-volume-high"></div>
                </section>
            </section>
        );
    }
}

export default PlayerBar;