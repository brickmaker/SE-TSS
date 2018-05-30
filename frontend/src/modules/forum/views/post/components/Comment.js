import React, {Component} from 'react'
import {connect} from "react-redux"
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "material-ui"
import {CLOSE_COMMENT, OPEN_COMMENT} from "../actions"

class Comment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {open, to, closeComment} = this.props
        return (
            <Dialog
                open={open}
                onClose={() => closeComment()}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    style={{
                        width: 400
                    }}
                    id="form-dialog-title"
                >评论</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="评论"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeComment()} color="secondary">
                        取消
                    </Button>
                    <Button onClick={() => closeComment()} color="primary">
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => ({
    open: state.forum.post.comment.open,
    to: state.forum.post.comment.to
})

const mapDispatchToProps = (dispatch) => ({
    closeComment: () => {
        dispatch({
            type: CLOSE_COMMENT
        })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
