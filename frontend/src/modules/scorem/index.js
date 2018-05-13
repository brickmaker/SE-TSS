import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import LeftMenu from './component/LeftMenu';
import AnalysisTabs from './component/analyse';

const style = {
    leftMenu : {
        float : "left",
        width : "15%",
        height : "100%",
    },

    content : {
        float : "right",
        width : "85%",
        height : "100%",
    },
};

class ScoreManagement extends Component {
    render() {
        return (
            <div>
                <div id="LeftMenu" style={style.leftMenu}>
                    <LeftMenu />
                </div>
                <div id="content" style={style.content}>
                    <AnalysisTabs />
                </div>
            </div>
        );
    }
}


export default ScoreManagement;