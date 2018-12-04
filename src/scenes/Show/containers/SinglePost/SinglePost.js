import React from 'react';
import PostBanner from '../../components/PostBanner/PostBanner';
import PostContent from '../../components/PostContent/PostContent';
import FeaturedImage from '../../components/FeaturedImage/FeaturedImage';
import Categories from '../../components/Categories/Categories';

const JoltSettings = window.JoltSettings;

const singlePost = (props) => (
  <section className="single-post">
    <div className="container">
      <PostBanner 
        title={props.post.title.rendered}
        subtitle={props.post.title.rendered}
        image={props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['show-banner']['source_url']} 
      />
      <div className="row">
        <div className="col-md-8">
          <PostContent content={props.post.content.rendered} />
        </div>
        <div className="col-md-4">
          <FeaturedImage 
            title={props.post.title.rendered}
            image={props.post['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['medium']['source_url']} />
          <Categories categories={props.post['_embedded']['wp:term'][0]} baseUrl={JoltSettings.path + 'artist-category/'} />
        </div>
      </div>
    </div>
  </section>
);

export default singlePost;