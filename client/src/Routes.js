import React from 'react';


import Layout from './HOC/Layout';
import {Switch,Route,BrowserRouter} from 'react-router-dom';
import Home from './component/home/home';
import Login from './container/Login';
import Register from './container/Register'
import CreatePost from './container/Admin/CreatePost';
import Logout from './component/Logout';
import Auth from './HOC/Auth';
import ShowMyPost from './container/Admin/ShowMyPost';
import Edit from './container/Admin/Edit'
function Routes() {
    return (
         <BrowserRouter>
            <Layout>
                <Switch>
                    <Route path="/" exact component={Auth(Home,null)}/>
                    <Route path="/login" exact component={Auth(Login,false)}/>
                    <Route path="/register" exact component={Auth(Register,false)}/>
                    <Route path="/user/add" exact component={Auth(CreatePost,true)}/>
                    <Route path="/user/user-stories" exact component={Auth(ShowMyPost,true)}/>
                    <Route path="/user/edit-stories/:id" exact component={Auth(Edit,true)}/>
                    <Route path="/user/logout" exact component={Auth(Logout,true)}/>
                </Switch>
            </Layout>
             </BrowserRouter>
    )
}

export default Routes
