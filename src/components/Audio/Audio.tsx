import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./Audio.scss";

interface LocalProps {
    url: string;
}
type Props = LocalProps;

interface LocalState {
    isPlaying: boolean;
}

class AudioComponent extends React.Component<Props, LocalState> {
    private audioElem: HTMLAudioElement;
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false
        };
        this.audioElem = new Audio(this.props.url);
        this.audioElem.onended = this.stopPlayback;
    }

    startPlayback = () => {
        this.setState({ isPlaying: true });
        this.audioElem.play();
    }
    
    pausePlayback = () => {
        this.setState({ isPlaying: false });
        this.audioElem.pause();
    }
    
    stopPlayback = () => {
        this.setState({ isPlaying: false });
        this.audioElem = new Audio(this.props.url);
    }

    render() {
        return (
            <div className="audio-softkey-container">
                {!this.state.isPlaying ? 
                    <FontAwesomeIcon size="2x" icon={faVolumeUp} onClick={this.startPlayback} /> : 
                    <FontAwesomeIcon size="2x"  icon={faSpinner} spin={true} onClick={this.pausePlayback} />}
            </div>
        );
    }
}

export default AudioComponent;