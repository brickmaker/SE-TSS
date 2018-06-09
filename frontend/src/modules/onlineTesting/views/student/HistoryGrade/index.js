import React, {Component} from "react"
import {connect} from "react-redux"
import TGS from "./StudentGradeStatistic"
class GradeStatistics extends Component{
    render(){
        const {match} = this.props;
        return (
            <div><TGS/></div>
        )
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(GradeStatistics);