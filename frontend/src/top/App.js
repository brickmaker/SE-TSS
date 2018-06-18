import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import './App.css';

import store from './stores'

import InformationManagement from "../modules/informationManagement";
import Forum from "../modules/forum";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Keep Calm and Just Do It</h1>
                    </header>
                    <BrowserRouter>
                        <div>
                            <Route path={'/info'} component={InformationManagement}/>
                            <Route path={'/forum'} component={Forum}/>
                        </div>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
