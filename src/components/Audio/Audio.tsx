import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faSpinner } from "@fortawesome/free-solid-svg-icons";

import "./Audio.scss";

interface LocalProps {
    url: string;
}
type Props = LocalProps;

interface LocalState {
    play: boolean;
}

class AudioComponent extends React.Component<Props, LocalState> {
    private audioElem: HTMLAudioElement;
    constructor(props) {
        super(props);
        this.state = {
            play: false
        };
        this.audioElem = new Audio(this.props.url);
        this.audioElem.onended = this.stop;
    }

    play = () => {
        this.setState({ play: true });
        this.audioElem.play();
    }
    
    pause = () => {
        this.setState({ play: false });
        this.audioElem.pause();
    }
    
    stop = () => {
        this.setState({ play: false });
        this.audioElem = new Audio(this.props.url); //start over
    }

    render() {
        return (
            <div className="audio-softkey-container">
                {!this.state.play ? 
                    <FontAwesomeIcon size="2x" icon={faVolumeUp} onClick={this.play} /> : 
                    <FontAwesomeIcon size="2x"  icon={faSpinner} spin={true} onClick={this.pause} />}
            </div>
        );
    }
}

export default AudioComponent;