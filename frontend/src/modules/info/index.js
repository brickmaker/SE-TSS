
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Redirect, BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';


import routes from './routes';
import styles from './style.scss';


class Info extends Component {
    render() {
        return (
            <div>
            	{routes}
            	<Redirect from="/info" to="login" />
            </div>

        );
    }
}

export default Info;
