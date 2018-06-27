import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {Link} from 'react-router-dom'

function Transition(props) {
    return <Slide direction="up" {...props} />;
}
class Sorry extends React.Component{
    state = {
        open: true,
    };

    handleClose = () => {
        this.setState({ open: false });

    };

    render(){
        return(
            <div>
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"抱歉该页面您没有权限访问"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            点击返回返回教学服务系统
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" component={Link} to="/main">
                            返回
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
export default Sorry;