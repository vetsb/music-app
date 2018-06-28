import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTracksByArtistId} from "../../actions/toptracks";
import store from '../../store';
import TopTrack from "../TopTrack";

class ArtistMain extends Component {
    constructor() {
        super();

        this.state = {
            tracks: []
        }
    }

    componentDidMount() {
        this.props.getTracksByArtistId(this.props.artist.mbid, 5);

        this.unsubscribe = store.subscribe(() => {
            if (Object.keys(store.getState().toptracks.tracks).length > 0) {
                this.setState({
                    tracks: store.getState().toptracks.tracks,
                })
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (Object.keys(this.state.tracks).length === 0) {
            return (
                <div>
                    <h2>Популярные треки</h2>
                    <div className="loading">Загрузка...</div>
                </div>
            );
        }

        return (
            <div>
                <h2>Популярные треки</h2>
                {this.state.tracks.map((item, key) => {
                    return <TopTrack track={item} key={key} index={key} />
                })}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        artist: state.artist
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getTracksByArtistId: getTracksByArtistId}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistMain)
