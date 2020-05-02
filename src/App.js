import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Index from "./pages/index";
import Today from "./pages/today/Today"
import Login from "./pages/login/login";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={'/more'} component={Index}/>
                <Route path={'/login'} component={Login}/>
                <Route  component={Today}/>

            </Switch>
        </BrowserRouter>
    );
}

export default App;
