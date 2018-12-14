import React, { Component } from 'react';
//import { findDOMNode } from 'react-dom';

class LiveTextBox extends Component {

  state = {
    textIndent: 0
  }

  liveTextRef = React.createRef();
  liveTextBoxRef = React.createRef();

  componentDidMount() {
    setTimeout(this.scrollTextHandler, 1000);
    window.addEventListener('resize', this.resetScroll.bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  resetScroll = () => {
    clearInterval(this.intervalId);
    this.setState({textIndent: 0});
    setTimeout(this.scrollTextHandler, 1000);
  }

  scrollTextHandler = () => {
    //Scrolling Text
    const liveText = this.liveTextRef;
    const liveTextBox = this.liveTextBoxRef;
    const _this = this;
    
    let liveTextInfo = liveText.current.getBoundingClientRect();
    let liveTextBoxInfo = liveTextBox.current.getBoundingClientRect();

    let liveTextW = liveTextInfo.width;
    let liveTextBoxW = liveTextBoxInfo.width;
    

    scrollingText(liveTextW, liveTextBoxW);
    // window.addEventListener('resize', function() {
    //   liveTextW = $liveText.width();
    //   liveTextBoxW = $('#js-live-text-box').width();
    //   scrollingText(liveTextW, liveTextBoxW);
    // });

    function scrollingText(liveTextW, liveTextBoxW) {
      if ( liveTextW > (liveTextBoxW - 4) ) {
          let indent = _this.state.textIndent;
          let leftMax = true;

          const scroll = function() {
            if (leftMax) {
              if ( ( liveTextW - Math.abs(indent) ) > liveTextBoxW ) {
                indent = indent - 1;
                _this.setState({textIndent: indent});
              } else {
                leftMax = false;
              }
            } else {
              if ( ( liveTextW + indent ) < liveTextW ) {
                indent = indent + 1;
                _this.setState({textIndent: indent});
              } else {
                leftMax = true;
              }
            }
          }
          _this.intervalId = setInterval(scroll, 1000/24);
          setTimeout(function() {
            _this.setState({textIndent: 0});
            clearInterval(_this.intervalId);
          }, 30000);
      }
    }
  }

  render() {
    const spanStyle = {
      textIndent: this.state.textIndent
    }

    return (
      <div ref={this.liveTextBoxRef} className="play-bar__box play-bar__box--live-text">
        <span ref={this.liveTextRef} className="play-bar__scroller" style={spanStyle}>
          Live Now: Empower Your Essence with Jill Rappaport 9-10pm
        </span>
      </div>
    )
  }
};

export default LiveTextBox;