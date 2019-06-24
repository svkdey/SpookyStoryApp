import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
class Header extends Component {
  items=[
      {
            type:'navItem',
            icon:'sign-in',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My post Stories',
            link: '/user/user-stories',
            restricted:true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add Stories',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Logout',
            link:'/user/logout',
            restricted:true
        }
  ]
  getElement(item,i){
    
        return  <li className="nav-item my-2 my-lg-0" key={i}>
            <Link className="nav-link mr-sm-2" to={item.link}>{item.text}</Link>
            </li>
   
  }
  showElement(){
    var user=this.props.user;
    // console.log(user)
    return user.login?this.items.map((item,i)=>{
      if(user.login.isAuth){
          return item.restricted ?
            this.getElement(item, i) :
            null
      }else{
          return !item.restricted ?
            this.getElement(item, i) :
            null
      }
         
    }):null
  }
  render() {
    return (
      <div> 
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark " style={{fontFamily:"Mali"}}>
  <Link className="navbar-brand" to="/">The Spooky tales</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
     
      {this.showElement()}
    </ul>
  
  </div>
</nav>


      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Header);
