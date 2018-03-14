import React, {Component} from 'react';
import albumData from './../data/albums';

class Album extends Component {
    constructor(props) {
        super(props);
         
        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });
  //now it sets state.album property to album variable which is album with matching url
        this.state = {
            album: album,
            albums: albumData      
        };
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
                            {
                            this.state.album.songs.map( (song, index) => 
                            <tr className="album-songs" key={index}>
                            <td>{index + 1}</td>
                            <td>{song.title}</td>
                            <td>{song.duration}</td>
                            <td className="ion-play"></td>
                            <td className="ion-pause"></td>
                            </tr>
                            )
                             }
                        
                    </tbody>
                </table>
            </section>
        );
    }
}

export default Album;