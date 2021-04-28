import './audioPlayer.css';
import React, { Component } from 'react';

class AudioPlayer extends Component{
    queryParams = new URLSearchParams(window.location.search);

    state = {
        Playing: true,
        progress: true,
        song_name: '',
        artist_name: '',
    }
    play = () => {
        if(this.state.Playing){ 
            this.setState({progress: false})
            this.setState({Playing: false});
        }
        else{
            this.setState({progress: true})
            this.setState({Playing: true});

        }
    }
    stopPlaying = () => {
        this.setState({progress: false})
        this.setState({Playing: false})
    }
    render(){
        if(this.queryParams.get('song')){
            return(
                <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></link>
                <div className="player">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR84FYPXM6cXi7hxrgbS_d71HpzPqSzyLr5rg&usqp=CAU"  className={this.state.Playing?"banner-play":"banner-pause"}/>
                    <p className="song">{this.queryParams.get('song')}</p>
                    {/* <audio controls>
                        <source src=""/>
                    </audio> */}
                    <div className="controls">
                        <div class="progress">
                            <div class={this.state.progress? "progress-value":"progress-value-stop"}></div>
                        </div>
                        <i class="fa fa-step-backward"></i>
                        <i class={this.state.Playing? "fa fa-pause":"fa fa-play"} onClick={this.play}></i>
                        <i class="fa fa-stop" onClick={this.stopPlaying}></i>
                        <i class="fa fa-step-forward"></i>
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"></link>
                <div className="player">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR84FYPXM6cXi7hxrgbS_d71HpzPqSzyLr5rg&usqp=CAU" className={this.state.Playing?"banner-play":"banner-pause"}/>
                    <p className="song">Animals</p>
                    {/* <audio controls>
                        <source src=""/>
                    </audio> */}
                    <div className="controls">
                        <div class="progress">
                            <div class={this.state.progress? "progress-value":"progress-value-stop"}></div>
                        </div>
                        <i class="fa fa-step-backward"></i>
                        <i class={this.state.Playing? "fa fa-pause":"fa fa-play"} onClick={this.play}></i>
                        <i class="fa fa-stop" onClick={this.stopPlaying}></i>
                        <i class="fa fa-step-forward"></i>
                    </div>
                </div>
            </div>
        );
    }
};

export default AudioPlayer;


