import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStoriesOfUser} from '../../actions/index';
import {Link} from 'react-router-dom';
// import moment from 'moment'
class ShowMyPost extends Component {
    componentWillMount(){
        this.props.dispatch(getStoriesOfUser(this.props.user.login.id))
    }
    showPosts(){
        var story=this.props.story;
        return story.userStories ? story.userStories.map((item,i) => (
                   <tr key={i}>
      
      <td><Link to={
                        `/user/edit-stories/${item._id}`
                    }>{item.author}</Link></td>
      <td><Link to={
                        `/user/edit-stories/${item._id}`
                    }>{item.content}</Link></td>
    </tr>
    
            )):null
    }
  render() {
      
    return (
        <div className="container"> 
        <div style={{padding:"25% 5% 5% 2%"}}>
            <h3 >You Have Posted these :</h3>
        </div>
            
           
                <div className="row">
                    <div className="col col-sm-4">
                     <table className="table table-dark">
                     <thead>
                        <tr>
                        
                            <th scope="col">Author</th>
                            <th scope="col">Content</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.showPosts()}
                    </tbody>
                </table></div>
                </div>
                   
      </div>
    );
  }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        story: state.story
    }
}
export default connect(mapStateToProps)(ShowMyPost);
