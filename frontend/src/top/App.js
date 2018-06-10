import React, {Component} from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css';

import store from './stores'

import InformationManagement from "../modules/info";
import Forum from "../modules/forum";
import Top from "./components/Top"
import Xkxt from "../modules/xkxt";

const topStyles = {}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div style={topStyles}>
                        <header className="App-header">
                            <Link to={'/'}>
                                <span
                                    style={{
                                        textAlign: 'left',
                                        color: 'white'
                                    }}
                                    className="App-title">TSS
                                </span>
                            </Link>

                            <span className="App-title"> | Here is Navbar placeholder</span>
                        </header>
                        <div>
                            <Route exact path={'/'} component={Top}/>
                            <Route path={'/info'} component={InformationManagement}/>
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
