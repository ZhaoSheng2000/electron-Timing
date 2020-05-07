import React from 'react';
import {HashRouter, Route, Switch} from "react-router-dom";

import Index from "./pages/index";
import Today from "./pages/today/Today"
import Login from "./pages/login/login";
import Register from "./pages/login/register"
import './App.css'

function App() {
    return (
        <HashRouter>
            <Switch>
                <Route path={'/more'} component={Index}/>
                <Route path={'/login'} component={Login}/>
                <Route path={'/register'} component={Register}/>
                <Route  component={Today}/>
            </Switch>
        </HashRouter>
    );
}

export default App;
