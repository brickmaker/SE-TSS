import React, {Component} from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "material-ui"
import {ROOT_URL, DEBUG, MAX_FILE_SIZE} from "../../configs/config"

class FileUploader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: 'done',
            file: null,
            dialog: {
                open: false,
                title: "",
                content: ""
            }
        }
        this.handleUploadFile = this.handleUploadFile.bind(this)
        this.removeFile = this.removeFile.bind(this)
        this.alertDialog = this.alertDialog.bind(this)
        this.onDialogClose = this.onDialogClose.bind(this)
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

    handleUploadFile() {
        const files = document.getElementById('upload_files').files
        if (files[0].size > MAX_FILE_SIZE) {
            this.alertDialog("上传失败", "文件大小超限，请勿超过100M！")
            return
        }
        this.setState({
            status: 'uploading',
            file: files[0]
        })
        console.log(files[0])
        fetch(
            `${ROOT_URL}/api/forum/upload_file`,
            {
                method: 'POST',
                body: files[0]
            }
        )
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                // todo: error check
                if (DEBUG) {
                    data = {
                        error: null,
                        fileId: "fileidfileidfileid"
                    }
                }
                this.setState({
                    status: 'done'
                })
                this.props.changeFile(data.fileId)
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    status: 'fail',
                    file: null
                })
            })
    }

    removeFile() {
        this.setState({file: null})
        this.props.changeFile(null)
    }

    render() {
        return (
            <div style={{
                margin: '10px 0'
            }}>
                <input
                    style={{
                        display: 'none',
                        margin: '10px 0',
                        boxSizing: 'border-box',
                        border: 0,
                        width: '100%',
                        padding: 10,
                        backgroundColor: '#ffffff',
                        fontSize: 18,
                        height: 40
                    }}
                    id={'upload_files'}
                    type={'file'}
                    onChange={this.handleUploadFile}
                />
                <label htmlFor="upload_files">
                    <Button component="span" color={"primary"}>
                        上传附件
                    </Button>
                </label>
                <span>
                    {
                        this.state.file ? (
                            <Button
                                component="span"
                                color={"secondary"}
                                onClick={this.removeFile}
                            >
                                删除
                            </Button>
                        ) : null
                    }
                    - 附件：{
                    this.state.status === 'uploading' ?
                        "上传中..." :
                        this.state.file ?
                            this.state.file.name :
                            "无附件"
                }
                </span>
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

export default FileUploader