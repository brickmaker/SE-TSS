import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";

class Forum extends Component {
    render() {
        const {testVal, testAction} = this.props;
        return (
            <div>
                <h1>Forum</h1>
                <p>Result: ${testVal}</p>
                <input
                    type={'number'}
                    onKeyDown={(event) => {
                        console.log(event.target.value);
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            testAction(parseInt(event.target.value))
                        }
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    testVal: state.forum.testVal
});

const mapDispatchToProps = (dispatch) => ({
    testAction: (value) => {
        dispatch(testAction(value))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forum);
