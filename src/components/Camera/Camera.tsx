import React from 'react';

import './Camera.scss';
import HorizontalListView from '../../views/HorizontalListView/HorizontalListView';
import IconButton from '../IconButton/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck, faRetweet, faRedo } from '@fortawesome/free-solid-svg-icons';

interface LocalProps {
    sendFile: BlobCallback
    focusClass: string;
}

interface LocalState {
    showImage: boolean;
    blob: Blob | undefined;
}

export class Camera extends React.Component<LocalProps, LocalState> {
    private videoPlayer: HTMLVideoElement | null = null;
    private canvas: HTMLCanvasElement | null = null;

    constructor(props){
        super(props);

        this.state = {
            showImage: false,
            blob: undefined
        };
    }

    processDevices(devices) {
        devices.forEach(device => {
            this.setDevice(device);
        });
    }

    async setDevice(device) {
        const { deviceId } = device;
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: { deviceId } });
        if(this.videoPlayer){
            this.videoPlayer.srcObject = stream;
            this.videoPlayer.play();
        }
    }

    async componentDidMount() {
        const cameras = await navigator.mediaDevices.enumerateDevices();
        this.processDevices(cameras);
    }

    takePhoto = () => {
        const { sendFile } = this.props;
        if(this.canvas){
            const context = this.canvas.getContext('2d');
            if(context && this.videoPlayer){
                context.drawImage(this.videoPlayer, 0, 0, 200, 150);
                this.canvas.toBlob((blob) => this.setState({blob}));
                this.setState({showImage: true});
            }
        }
    };

    render() {
        return (
            <div className="c-camera-feed">
                 <div className={"c-camera-feed__stage " + (this.state.showImage ? "" : "hidden")}>
                    <canvas width="200" height="150" ref={ref => (this.canvas = ref)} />
                </div> 
                <div className={"c-camera-feed__viewer " + (this.state.showImage ? "hidden" : "")}>
                    <video ref={ref => (this.videoPlayer = ref)} width="240" height="150" />
                </div>
                {this.state.showImage ? 
                <HorizontalListView 
                    isActive={true} 
                    preserveIndexes={true}
                    className="camera-controls">
                        <IconButton 
                            id="camera-control-accept"
                            index={0} 
                            icon={<FontAwesomeIcon icon={faCheck} size="5x"/>}
                            focusClass={this.props.focusClass}
                            onClick={() => this.props.sendFile(this.state.blob)} /> 
                        <IconButton 
                            id="camera-control-redo"
                            index={1} 
                            icon={<FontAwesomeIcon icon={faRedo} size="5x"/>}
                            focusClass={this.props.focusClass}
                            onClick={() => this.setState({showImage: false})} /> 
                </HorizontalListView>
                :
                <HorizontalListView 
                    isActive={true} 
                    preserveIndexes={true}
                    className="camera-controls">
                        <IconButton 
                            id="camera-control-take"
                            index={0} 
                            icon={<FontAwesomeIcon icon={faCamera} size="5x"/>}
                            focusClass={this.props.focusClass}
                            onClick={this.takePhoto} /> 
                </HorizontalListView>
                }
            </div>
        );
    }
}
