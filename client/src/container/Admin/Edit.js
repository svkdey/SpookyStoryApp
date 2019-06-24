import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {getStory,postUpdatedStory,clearState,deleteStoryAction} from '../../actions/index'
class CreatePost extends Component {
    state = {
        "_id":this.props.match.params.id,
        "content": "",
        "author": "",
        "ownderId": "",
    }
    componentWillMount(){
        this.props.dispatch(getStory(this.props.match.params.id))
    }
      changeInput(e) {
        this.setState({
            [e.target.name]:e.target.value,
            
        })
    }
    componentWillReceiveProps(nextProps){
        let story = nextProps.story.updatedStory ? nextProps.story.updatedStory : nextProps.story.editStory;
        this.setState({
        "content": story.content,
         "author": story.author,
         "ownderId": this.props.user.login.id
        }) 
        // console.log(story)
    }
    submitForm(e){
    e.preventDefault();
        // console.log(this.props.user)
            // var data={
            //     "content":this.state.content,
            //     "author":this.state.author,
            //     "ownderId":this.props.user.login.id
           
            //     // this.props.user.loginUser.id,
            // }
            this.props.dispatch(postUpdatedStory(this.state))
       
    }
    deleteStory(){
        // console.log("click")
        this.props.dispatch(deleteStoryAction(this.props.match.params.id))
    }
    redirectUser = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-stories')
        }, 2000)
    }
    componentWillUnmount(){
        this.props.dispatch(clearState())
    }
    render() {
        var story=this.props.story;
        return (
            <div className="container"
      style={{padding:"18% 4% 4% 2%"}}>


         {
                story.updatedStory ? < div className = "edit_confirm"
                 style={{color:"green"}} >
                    post updated
                    <Link to="/">
                        click to see!!
                    </Link>
                </div>:null
            }
            {
                story.deleteStory ? < div className = "red_tag" 
                style={{color:"red"}}>
                    Post Deleted
                    {this.redirectUser()}
                </div>:null
            }


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
  >Post Story</button><span></span>
   <button type="button" className="btn btn-danger" onClick={()=>{this.deleteStory()}}
    style={{textAlign:"center"}}
  >delete Story</button>
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
