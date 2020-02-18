import React, { Component } from "react";
import Card from "../Card/Card";

class PostList extends Component {
  renderPosts() {
    return this.props.posts.map((post, i) => {
      let cardImage = "";
      if (
        typeof post["_embedded"] !== "undefined" &&
        typeof post["_embedded"]["wp:featuredmedia"] !== "undefined"
      ) {
        cardImage =
          post["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"][
            "card"
          ]["source_url"];
      }
      if (
        typeof post.acf.banner_image !== "undefined" &&
        post.acf.banner_image !== false
      ) {
        cardImage = post.acf.banner_image.sizes.card;
      }
      return (
        <div className="col-md-6 col-lg-4" key={i}>
          <Card
            title={post.title.rendered}
            link={this.props.baseUrl + post.slug}
            imgUrl={cardImage}
            subtitle={post.acf.schedule_text}
          />
        </div>
      );
    });
  }

  render() {
    return <div className="row">{this.renderPosts()}</div>;
  }
}

export default PostList;
