import React, { Component } from 'react'
import {connect} from 'react-redux';
import {postStory} from '../../actions/index'
class CreatePost extends Component {
    state = {
        "content": "",
        "author": "",
        "ownderId": "",
    }
      changeInput(e) {
        this.setState({
            [e.target.name]:e.target.value,
            
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.story.newPost){
             this.props.history.push('/')
        }
    }
    submitForm(e){
    e.preventDefault();
        // console.log(this.props.user)
            var data={
                "content":this.state.content,
                "author":this.state.author,
                "ownderId":this.props.user.login.id
           
                // this.props.user.loginUser.id,
            }
           
            this.props.dispatch(postStory(data))
       
    }


    render() {
        // console.log(this.state)
        return (
            <div className="container"
      style={{padding:"18% 4% 4% 2%"}}>
<form onSubmit={(e)=>{this.submitForm(e)}}>
  <div className="form-group">
    <label>Author</label>
    <input type="text" name="author" value={this.state.author}
    onChange={(e)=>{this.changeInput(e)}}
     className="form-control" placeholder="for example hakunamatata"/>
  </div>
  
  <div className="form-group">
    <label >content</label>
    <textarea className="form-control" name="content" value={this.state.content}
    onChange={(e)=>{this.changeInput(e)}} rows="3"></textarea>
  </div>
  <button type="submit" className="btn btn-primary"
    style={{textAlign:"center"}}
  >Post Story</button>
</form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        story: state.story,
    }
}
export default connect(mapStateToProps)(CreatePost);
