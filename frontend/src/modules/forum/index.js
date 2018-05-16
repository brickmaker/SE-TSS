import React, {Component} from 'react';
import {connect} from 'react-redux';
import {testAction} from "./actions";

class Forum extends Component {
    render() {
        const {val, testAction} = this.props;
        return (
            <div>
                <h1>Forum</h1>
                <p>Result: ${val}</p>
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
    val: state.forum.testVal
});

const mapDispatchToProps = (dispatch) => ({
    testAction: (value) => {
        dispatch(testAction(value))
    }
});

export default Forum=connect(
    mapStateToProps,
    mapDispatchToProps
)(Forum);
