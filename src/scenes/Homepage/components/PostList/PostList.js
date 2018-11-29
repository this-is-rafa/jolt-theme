import React, { Component } from 'react';
import Card from '../../../../components/Card/Card';

class PostList extends Component {

  renderPosts() {
    return this.props.posts.map( (post, i) => {
      return(
        <div className="col-md-4" key={i}>
          <Card 
            title={post.title.rendered}
            link={this.props.baseUrl + post.slug}
            imgUrl="https://via.placeholder.com/350x197.png?text=Jolt"
            subtitle="Time goes here"
          />
        </div>
      );
    });
  }

  render() {
    return(
      <div className='row'>
        { this.renderPosts() }
      </div>
    );
  }
}

export default PostList;