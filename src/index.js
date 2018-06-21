import React from 'react';
import ReactDOM from 'react-dom';
import './top/index.css';
import App from './top/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
