import React, {Component} from 'react';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "material-ui"
import FileUploader from "../../../../components/fileuploader"

const editorStyle = {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ffffff',
    height: 300
}


export default class ReplyEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: {
                open: false,
                title: "",
                content: ""
            },
            file: null,
            editorState: EditorState.createEmpty(),
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.doPost = this.doPost.bind(this)
        this.onDialogClose = this.onDialogClose.bind(this)
        this.alertDialog = this.alertDialog.bind(this)
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    doPost() {
        const text = this.state.editorState.getCurrentContent().getPlainText()
        if (text.length === 0) {
            this.alertDialog("提交失败", "内容不能为空！")
        } else if (text.length > 800) {
            this.alertDialog("提交失败", "内容不能超过800个字符！")
        } else {
            const html = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
            if (this.props.post) {
                this.props.post(html, this.state.file)
            }
            this.setState({
                editorState: EditorState.createEmpty(),
            })
        }
    }

    alertDialog(title, content) {
        this.setState({
            dialog: {
                open: true,
                title: title,
                content: content
            }
        })
    }

    onDialogClose() {
        this.setState({
            dialog: {
                open: false,
                title: "",
                content: ""
            }
        })
    }

    render() {
        const {editorState} = this.state;
        return (
            <div style={{
                paddingBottom: 80,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Editor
                    editorState={editorState}
                    // wrapperClassName={editorStyle}
                    editorStyle={editorStyle}
                    onEditorStateChange={this.onEditorStateChange}
                />
                <FileUploader changeFile={(fileId) => {
                    this.setState({file: fileId})
                }}/>
                <Button
                    style={{margin: 20}}
                    color={'primary'}
                    variant={'raised'}
                    size={'large'}
                    onClick={this.doPost}
                >回帖</Button>
                <Dialog
                    open={this.state.dialog.open}
                    onClose={this.onDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{this.state.dialog.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.dialog.content}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.onDialogClose} color="primary" autoFocus>
                            确认
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

