import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import {Tabs, Tab} from 'material-ui/Tabs';
import MyForm from "./InfoForm";

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
};

@connect(mapStateToProps, mapDispatchToProps)
export default class StudentBasicInfo extends React.Component {

    constructor(props){
        super(props);
        const redirectRoute = '/Info/student/basicInfo';
        this.state={
            username:'',
            redirectTo: redirectRoute,
        };
    }

    render() {
        return (
            <div >
                <Tabs>
                    <Tab label="This is my info" >
                        <div>
                            <h2 style={styles.headline}>Tab One</h2>
                            <p>
                                This is an example tab.
                            </p>


                        </div>
                    </Tab>
                    <Tab label="Edit my info" >
                        <div>

                        </div>
                    </Tab>

                </Tabs>

            </div>
        );
    }
}


StudentBasicInfo.propType={


};


