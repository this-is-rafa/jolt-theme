import React, { Component } from "react";
import { connect } from "react-redux";
import TitleBlock from "../../../../components/TitleBlock/TitleBlock";
import SetList from "../../../../components/SetList/SetList";

const JoltSettings = window.JoltSettings;

const mapDispatchToProps = dispatch => {
  return {
    incrementLoad: () => {
      const action = { type: "LOAD" };
      dispatch(action);
    },
    decrementLoad: () => {
      const action = { type: "UNLOAD" };
      dispatch(action);
    }
  };
};

class FeaturedSets extends Component {
  state = {
    sets: []
  };

  componentDidMount() {
    this.getSets();
  }

  getSets() {
    this.props.incrementLoad();
    let _this = this;

    fetch(JoltSettings.URL.api + "/sets/?_embed&per_page=3&order=desc")
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results) {
        let allSets = [];

        results.forEach(function (single) {
          allSets.push(single);
        });
        _this.setState({ sets: allSets });
        _this.props.decrementLoad();
      })
      .catch(function(error) {
        console.log("Could not fetch sets: " + error.message);
      });
  }

  render() {
    if (this.state.sets.length > 0) {
      return (
        <section className="sets">
          <div className="container">
            <TitleBlock title="Residents' Picks">
              <SetList sets={this.state.sets} baseUrl="sets/" />
            </TitleBlock>
          </div>
        </section>
      );
    } else {
      return null;
    }
  }
}

export default connect(null, mapDispatchToProps)(FeaturedSets);
