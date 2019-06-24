import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStories } from '../actions';
import moment from 'moment'

// import BookItem from '../widgetsUI/book_item';

class HomeContainer extends Component {

    componentWillMount(){
        this.props.dispatch(getStories(3, 0, "desc"))
    }


   renderStories=(stories)=>{
    //    console.log(stories)
       var story=this.props.story
       return story.stories?story.stories.map((item,i)=>{
           return <div className= "card border-dark mb-3 w-80"
           key = {i} style={{
                margin:"10px"
            }}
           >
                <div className="card-body">
                    <p className="card-text">{item.content}</p>
                                <h5 className="card-title">-{item.author}</h5>
                                <p className="card-text"><small className="text-muted"
                                style={{
                                    color:"white"
                                }}>{moment(item.createdAt).format("MMM Do YY")}</small></p>
                </div>
            </div>
       }):null
   }

    loadMore = () => {
        // console.log("clicked")

        let count = this.props.story.stories.length;
        // console.log(count)
        this.props.dispatch(getStories(2, count, 'desc', this.props.story.stories))
    }

    render() {
        // console.log(this.props.story)
        return (
            <div style={{
                paddingTop:window.innerWidth<500?"10%":null,
                margin:"5% 2% 2% 2%"
            }}>
               {this.renderStories(this.props.story)}
               <div style={{
                   textAlign:"center"
               }}>
                    <button type="button" className="btn btn-outline-primary"
                onClick={()=>this.loadMore()}
                >Load more</button>
               </div>
               
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        story: state.story
    }
}

export default connect(mapStateToProps)(HomeContainer);