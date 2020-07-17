import React from "react";
import { Helmet } from "react-helmet";
import PageBanner from "../../components/PageBanner/PageBanner";
import PageContent from "../../components/PageContent/PageContent";
import { decodeEntities } from "@wordpress/html-entities";

const JoltSettings = window.JoltSettings;

const singlePage = (props) => {
  let featuredImage = "";

  if (typeof props.page["_embedded"] !== "undefined") {
    if (
      typeof props.page["_embedded"]["wp:featuredmedia"] !== "undefined" &&
      props.page["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"][
        "show-banner"
      ] !== "undefined"
    ) {
      featuredImage =
        props.page["_embedded"]["wp:featuredmedia"][0]["media_details"][
          "sizes"
        ]["show-banner"]["source_url"];
    }
  }

  const title = decodeEntities(props.page.title.rendered);

  return (
    <section className="single-post">
      <Helmet>
        <title>
          {title} | {JoltSettings.title}
        </title>
      </Helmet>

      <div className="container">
        <PageBanner
          title={title}
          subtitle={props.page.acf.schedule_text}
          image={featuredImage}
        />
        <div className="row">
          <div className="col-md-8">
            <PageContent content={props.page.content.rendered} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default singlePage;
