import React, {Component} from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css';
import store from './stores'


import Info from "../modules/info";
import Forum from "../modules/forum";
import Xkxt from "../modules/xkxt";
import Login from "../modules/info/components/LoginView"
import Main from "./components/Top";

const topStyles = {};

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div style={topStyles}>
                        <div>
                            <Route exact path={'/'} component={Login}/>
                            <Route path={'/main'} component={Main}/>
                            <Route path={'/info'} component={Info}/>
                            <Route path={'/forum'} component={Forum}/>
                            <Route path={'/xkxt'} component={Xkxt}/>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
