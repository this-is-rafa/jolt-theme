import React, { Component } from "react";
import CardYt from "../CardYt/CardYt";
import CardCats from "../CardCats/CardCats";

class SetList extends Component {
  renderSets() {
    return this.props.sets.map((set, i) => {
      let ytCode = set.acf.yt_url.split("=").pop();
      return (
        <div className="col-md-6 col-lg-4" key={i}>
          <CardYt
            title={set.title.rendered}
            link={set.acf.yt_url}
            ytCode={ytCode}
            subtitle={set.acf.set_date}
          />
          <CardCats categories={set.acf.set_categories} />
        </div>
      );
    });
  }

  render() {
    return <div className="row">{this.renderSets()}</div>;
  }
}

export default SetList;
