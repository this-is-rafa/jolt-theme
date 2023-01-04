import React from "react";
import { Helmet } from "react-helmet";
import PageBanner from "../../components/PageBanner/PageBanner";
import PageContent from "../../components/PageContent/PageContent";
import { decodeEntities } from "@wordpress/html-entities";

const JoltSettings = window.JoltSettings;

const singleNews = (props) => {
  let featuredImage = "";

  if (typeof props.news["_embedded"] !== "undefined") {
    if (
      typeof props.news["_embedded"]["wp:featuredmedia"] !== "undefined" &&
      props.news["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"][
        "show-banner"
      ] !== "undefined"
    ) {
      featuredImage =
        props.news["_embedded"]["wp:featuredmedia"][0]["media_details"][
          "sizes"
        ]["show-banner"]["source_url"];
    }
  }

  const title = decodeEntities(props.news.title.rendered);
  const date = props.news.date.split("T")[0];

  return (
    <section className="single-post">
      <Helmet>
        <title>
          {title} | {JoltSettings.title}
        </title>
      </Helmet>

      <div className="container">
        <PageBanner title={title} subtitle={date} image={featuredImage} />
        <div className="row">
          <div className="col-md-8">
            <PageContent content={props.news.content.rendered} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default singleNews;
