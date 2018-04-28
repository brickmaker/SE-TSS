import React, {Component} from 'react';
import {connect} from 'react-redux';

class Courses extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {match} = this.props;
        console.log(match)
        return (
            <div>
                courses list: {match.params.collegeid}
            </div>
        )
    }
}

export default Courses
