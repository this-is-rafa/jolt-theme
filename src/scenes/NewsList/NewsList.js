import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../actions/actions";
import TitleBlock from "../../components/TitleBlock/TitleBlock";
import PostList from "../../components/PostList/PostList";
import Button from "../../components/UI/Button/Button";

const JoltSettings = window.JoltSettings;
const baseUrl = JoltSettings.path + "news/";

const mapStateToProps = (state) => {
  return {
    newsList: state.newsList,
  };
};

class NewsList extends Component {
  componentDidMount() {
    if (this.props.newsList.news.length < 1) {
      this.getNews();
    }
  }

  getNews() {
    if (!this.props.newsList.getNews) return;
    this.props.incrementLoad();
    this.props.setNewsList({
      ...this.props.newsList,
      page: this.props.newsList.page + 1,
    });
    let allNews = this.props.newsList.news;
    let totalPages;
    let _this = this;

    fetch(
      JoltSettings.URL.api +
        "/news/?_embed&per_page=12&order=desc&page=" +
        _this.props.newsList.page
    )
      .then(function (response) {
        for (var entry of response.headers.entries()) {
          if (entry[0] === "x-wp-totalpages") {
            totalPages = entry[1];
          }

          if (_this.props.newsList.page > totalPages) {
            _this.props.setNewsList({
              ..._this.props.newsList,
              getNews: false,
            });
          }
        }
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function (results) {
        console.log(results);
        results.forEach(function (single) {
          allNews.push(single);
        });

        _this.props.setNewsList({
          ..._this.props.newsList,
          news: allNews,
        });

        _this.props.decrementLoad();
      })
      .catch(function (error) {
        console.log("Could not fetch News: " + error.message);
        _this.props.decrementLoad();
      });
  }

  renderNewsItems() {
    return this.props.newsList.news.map((post, i) => {
      console.log(post);
      let date = post.date.split("T")[0];
      let featuredImage = "";

      if (typeof post["_embedded"] !== "undefined") {
        if (
          typeof post["_embedded"]["wp:featuredmedia"] !== "undefined" &&
          post["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"][
            "show-banner"
          ] !== "undefined"
        ) {
          featuredImage =
            post["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"][
              "show-banner"
            ]["source_url"];
        }
      }
      return (
        <div className="newsItem" key={i}>
          <div className="post-banner">
            <img
              src={featuredImage}
              className="post-banner__img"
              alt={post.title.rendered}
            />
            <div className="post-banner__content post-banner__content--top">
              <span
                className="post-banner__titles post-banner__titles--main"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>
            <div className="post-banner__content">
              <span
                className="post-banner__titles post-banner__titles--subtitle"
                dangerouslySetInnerHTML={{ __html: date }}
              />
            </div>
          </div>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      );
    });
  }

  render() {
    let news = this.props.newsList.news;
    let notFound = null;

    if (news.length === 0) {
      return null;
    }

    let btn = {
      class: "btn--disabled",
      disabled: true,
      text: "Das It",
    };

    if (this.props.newsList.getNews) {
      btn.class = "";
      btn.disabled = false;
      btn.text = "More";
    }

    return (
      <div className="container">
        <TitleBlock title="Live Wire">
          {notFound !== null ? (
            notFound
          ) : (
            <div className="c-newsListItems">
              {this.renderNewsItems()}
              <div className="c-flex-pos c-flex-pos--right">
                <Button
                  classes={btn.class}
                  clicked={this.getNews.bind(this)}
                  disabled={btn.disabled}
                >
                  {btn.text}
                </Button>
              </div>
            </div>
          )}
        </TitleBlock>
      </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(NewsList);
