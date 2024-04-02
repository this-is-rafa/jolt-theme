import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../../actions/actions";
import Icon from "../../../../components/UI/Icon/Icon";

const mapStateToProps = state => {
  return {
    audioStatus: state.audioStatus,
    twitchStatus: state.twitchStatus,
    show: state.ytPlayerStatus.show,
    ytCode: state.ytPlayerStatus.ytCode
  };
};

class YTPlayer extends Component {

  render() {
    if (this.props.show) {
      return (
        <section className="video-embed">
          <div 
            className="video-embed__close"
            onClick={() => {
              this.props.setYtPlayerStatus({
                show: false,
                ytCode: null
              });
            }}>
            <Icon name="x" parentClass="video-embed__close" /> 
          </div>
          <div class="container">
            <div id="yt-embed">

              <iframe 
                width="100%"
                height="100%"
                src={"https://www.youtube.com/embed/" + this.props.ytCode} title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </section>
      );
    }

    return null;
  }
}

export default connect(mapStateToProps, actionCreators)(YTPlayer);