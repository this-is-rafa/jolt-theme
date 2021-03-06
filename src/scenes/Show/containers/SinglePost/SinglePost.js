import React from "react";
import { Helmet } from "react-helmet";
import PostBanner from "../../components/PostBanner/PostBanner";
import PostContent from "../../components/PostContent/PostContent";
import FeaturedImage from "../../components/FeaturedImage/FeaturedImage";
import Categories from "../../components/Categories/Categories";
import { decodeEntities } from "@wordpress/html-entities";

const JoltSettings = window.JoltSettings;

const singlePost = props => {
  let showImage = "";
  let featuredImage = "";
  let showCats = false;

  if (typeof props.post["_embedded"] !== "undefined") {
    if (
      typeof props.post["_embedded"]["wp:featuredmedia"] !== "undefined" &&
      props.post["_embedded"]["wp:featuredmedia"][0]["media_details"]["sizes"][
        "show-banner"
      ] !== "undefined"
    ) {
      showImage =
        props.post["_embedded"]["wp:featuredmedia"][0]["media_details"][
          "sizes"
        ]["show-banner"]["source_url"];
      featuredImage =
        props.post["_embedded"]["wp:featuredmedia"][0]["media_details"][
          "sizes"
        ]["medium"]["source_url"];
    }

    if (typeof props.post["_embedded"]["wp:term"] !== "undefined") {
      showCats = props.post["_embedded"]["wp:term"][0];
    }
  }

  if (
    typeof props.post.acf.banner_image !== "undefined" &&
    props.post.acf.banner_image !== false
  ) {
    showImage = props.post.acf.banner_image.sizes["show-banner"];
  }

  const title = decodeEntities(props.post.title.rendered);

  return (
    <section className="single-post">
      <Helmet>
        <title>
          {title} | {JoltSettings.title}
        </title>
      </Helmet>

      <div className="container">
        <PostBanner
          title={title}
          subtitle={props.post.acf.schedule_text}
          image={showImage}
        />
        <div className="row">
          <div className="col-md-8">
            <PostContent content={props.post.content.rendered} />
          </div>
          <div className="col-md-4">
            <FeaturedImage title={title} image={featuredImage} />
            {showCats ? (
              <Categories
                categories={showCats}
                baseUrl={JoltSettings.path + "artist-category/"}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default singlePost;
