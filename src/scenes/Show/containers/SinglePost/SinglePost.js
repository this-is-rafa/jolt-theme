import React from 'react';
import { Helmet } from 'react-helmet';
import PostBanner from '../../components/PostBanner/PostBanner';
import PostContent from '../../components/PostContent/PostContent';
import FeaturedImage from '../../components/FeaturedImage/FeaturedImage';
import Categories from '../../components/Categories/Categories';

const JoltSettings = window.JoltSettings;

const singlePost = (props) => {
  let showImage = '';
  let featuredImage = '';
  let ogImage = false;
  let showCats = false;
  let metaProperties = (
    <Helmet>
      <title>{props.post.title.rendered} | {JoltSettings.title}</title>
      <meta property="og:title" content={props.post.title.rendered + ' | ' + JoltSettings.title} />
      <meta name="twitter:title" content={props.post.title.rendered + ' | ' + JoltSettings.title } />
      <meta property="og:description" content={props.post.title.rendered + ' on ' + JoltSettings.title} />
      <meta name="twitter:description" content={props.post.title.rendered + ' on ' + JoltSettings.title} />
    </Helmet>
  );

  if (typeof props.post['_embedded'] !== 'undefined') {
    if (typeof props.post['_embedded']['wp:featuredmedia'] !== 'undefined' && props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['show-banner'] !== 'undefined') {
      showImage = props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['show-banner']['source_url'];
      featuredImage = props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['medium']['source_url'];
      ogImage = {
        url: props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['show-banner']['source_url'],
        width: props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['show-banner']['width'],
        height: props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['show-banner']['height']
      };
    }

    if (typeof props.post['_embedded']['wp:term'] !== 'undefined') {
      showCats = props.post['_embedded']['wp:term'][0];
    }
  }

  if (typeof props.post.acf.banner_image !== 'undefined' && props.post.acf.banner_image !== false){
    showImage = props.post.acf.banner_image.sizes['show-banner'];
    ogImage = {
      url: props.post.acf.banner_image.url,
      width: props.post.acf.banner_image.width,
      height: props.postprops.post.acf.banner_image.height
    };
  }
  
  if (ogImage) {
    metaProperties = (
      <Helmet>
        <title>{props.post.title.rendered} | {JoltSettings.title}</title>
        <meta property="og:title" content={props.post.title.rendered + ' | ' + JoltSettings.title} />
        <meta name="twitter:title" content={props.post.title.rendered + ' | ' + JoltSettings.title } />
        <meta property="og:description" content={props.post.title.rendered + ' on ' + JoltSettings.title} />
        <meta name="twitter:description" content={props.post.title.rendered + ' on ' + JoltSettings.title} />
        <meta property="og:image" content={ogImage.url} />
        <meta property="og:image:height" content={ogImage.height} />
        <meta property="og:image:width" content={ogImage.width} />
      </Helmet>
    );
  }

  return (
    <section className="single-post">
      {metaProperties}

      <div className="container">
        <PostBanner 
          title={props.post.title.rendered}
          subtitle={props.post.acf.schedule_text}
          image={showImage} 
        />
        <div className="row">
          <div className="col-md-8">
            <PostContent content={props.post.content.rendered} />
          </div>
          <div className="col-md-4">
            <FeaturedImage 
              title={props.post.title.rendered}
              image={featuredImage} />
            { showCats ? <Categories categories={showCats} baseUrl={JoltSettings.path + 'artist-category/'} /> : '' }
          </div>
        </div>
      </div>
    </section>
  );
};

export default singlePost;