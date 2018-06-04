import React, {Component} from 'react';
import {BrowserRouter, Route, Link, withRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css';
import store from './stores'

import InformationManagement from "../modules/informationManagement";
import Forum from "../modules/forum";
import ScoreManagement from "../modules/scorem"
import Top from "./components/Top"

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
                            <Route path={'/scorem'} component={ScoreManagement}/>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
