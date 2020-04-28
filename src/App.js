import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Index from "./pages/index";
import Login from "./pages/login/login";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route  component={Index}/>
                <Route path={'/login'} component={Login}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
