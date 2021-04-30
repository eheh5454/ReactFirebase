import React, { useState } from "react";
import {HashRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => { 
    // Switch는 첫번쨰 매치되는 path를 렌더링함
    // Redirect: "/" 외의 라우트로 가게되면 "/" 라우트로 돌아오라는 뜻
return (
    <Router>       
        {isLoggedIn && <Navigation />}  
        <Switch>
            {isLoggedIn? (        
            <>       
            <Route exact path="/">
                <Home userObj={userObj} />
            </Route>
            <Route exact path="/profile">
                <Profile />
            </Route>        
            <Redirect from="*" to="/" />
            </>
            ) : (
            <>
            <Route exact path="/">
                <Auth />
            </Route>
            <Redirect from="*" to="/" />
            </>
            )}
        </Switch>
    </Router>
  );
};

export default AppRouter;