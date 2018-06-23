import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from "react-router-dom"
import StudentMain from './views/student/StudentMain'
import TeacherMain from './views/teacher/TeacherMain'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogActions,
    DialogContent
} from 'material-ui'

const styles = {
    backgroundColor: '#f0f0ee',
    minHeight: '100vh',
    paddingRight: 20
};


class NoteWindow extends Component {
    state = {
        open: true,
    };


    handleClose = () => {
        this.setState({ open: false });
        this.props.history.goBack();
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle >{"身份错误"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {"请点击确定跳转回主页面"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            {"确定"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}



class OnlineTesting extends Component {

    state={
    };


    render() {
        const {match} = this.props;
        let Note = withRouter(NoteWindow);
        console.log(localStorage.getItem('type'));
        const routePath= (localStorage.getItem('type') === "2") ? (
            <Route path={`${match.url}`} component={TeacherMain}/>
        ): (localStorage.getItem("type") === "1" ?
                (
                    <Route path={`${match.url}`} component={StudentMain}/>
                ):
                (<Note/>)
        );

        return (
            <div style={styles}>
                {routePath}
           </div>
        );
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
    null,
    null
)(OnlineTesting);
