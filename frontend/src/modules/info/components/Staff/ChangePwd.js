// pwdDialogOpen = () => {
//     this.setState({
//         pwdDialog: true,
//         Old_pwd: '',
//         New_pwd: '',
//         New_pwd_1: '',
//         pwd_txt1: '',
//         pwd_txt: '',
//     });
// };
//
// pwdDialogClose = () => {
//     this.setState({pwdDialog: false});
// };
//
// UploadpwdDialog = () => {
//     if (this.state.New_pwd !== this.state.New_pwd_1){
//         this.setState({
//             dialogState: true,
//             dialogText: "新密码不一致",
//         });
//     }
//     else {
//         this.setState({pwdDialog: false});
//
//         let data = {};
//         data.old_password = this.state.Old_pwd;
//         data.new_password = this.state.New_pwd;
//         fetch('/api/update_password', {
//             method: 'put',
//             headers: {
//                 'Authorization': 'JWT ' + localStorage.getItem('token'),
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//             .then(response => {
//                 let status = response.status;
//                 if (status === 200) {
//                     this.setState({
//                         dialogState: true,
//                         dialogText: "密码修改成功",
//                     });
//                 } else {
//                     this.setState({
//                         dialogState: true,
//                         dialogText: response.statusText,
//                     });
//                 }
//                 return response.json;
//             })
//             .catch(() => {
//                 this.setState({
//                     dialogState: true,
//                     dialogText: "服务器无响应",
//                 });
//                 // browserHistory.push("/login");
//             });
//     }
// };
//
// handleChange = prop => event => {
//     this.setState({[prop]: event.target.value});
// };
//
// handleChange_pwd = prop => event => {
//
//     this.setState({[prop]: event.target.value});
//     let p = /[0-9a-z]/i;
//     let ifTrue = p.test(event.target.value);
//     if(event.target.value.length < 8 || !ifTrue){
//         this.setState({pwd_txt1: "密码至少8位，且包括数字和字母"});
//     }
//     else{
//         this.setState({pwd_txt1: ""});
//     }
//
// };
//
// _handleChange = prop => event => {
//     this.setState({[prop]: event.target.value});
//     if(this.state.New_pwd === event.target.value){
//         this.setState({pwd_error: false, pwd_txt: ""});
//     }
//     else{
//         this.setState({pwd_error: true, pwd_txt: "密码不一致"});
//     }
// };
//
// handleDialogClose = () => {
//     this.setState({dialogState: false});
// };
//
//
// {/*<div>*/}
//     {/*<Dialog*/}
//         {/*open={this.state.pwdDialog}*/}
//         {/*onClose={this.pwdDialogClose}*/}
//         {/*aria-labelledby="form-dialog-title"*/}
//     {/*>*/}
//         {/*<DialogTitle id="form-dialog-title">修改密码</DialogTitle>*/}
//         {/*<DialogContent>*/}
//
//
//             {/*<div>*/}
//                 {/*<TextField*/}
//                     {/*fullWidth*/}
//                     {/*label="旧密码"*/}
//                     {/*type = "password"*/}
//                     {/*value={this.state.Old_pwd}*/}
//                     {/*onChange={this.handleChange('Old_pwd')}*/}
//
//                 {/*/>*/}
//             {/*</div>*/}
//             {/*<div>*/}
//                 {/*<TextField*/}
//                     {/*fullWidth*/}
//                     {/*label="新密码"*/}
//                     {/*type = "password"*/}
//                     {/*value={this.state.New_pwd}*/}
//                     {/*onChange={this.handleChange_pwd('New_pwd')}*/}
//                     {/*helperText= {this.state.pwd_txt1}*/}
//
//                 {/*/>*/}
//             {/*</div>*/}
//             {/*<div>*/}
//                 {/*<TextField*/}
//                     {/*fullWidth*/}
//                     {/*label="再次输入新密码"*/}
//                     {/*type = "password"*/}
//                     {/*value={this.state.New_pwd_1}*/}
//                     {/*onChange={this._handleChange('New_pwd_1')}*/}
//                     {/*error = {this.state.pwd_error}*/}
//                     {/*helperText= {this.state.pwd_txt}*/}
//                 {/*>*/}
//
//                 {/*</TextField>*/}
//             {/*</div>*/}
//
//
//         {/*</DialogContent>*/}
//
//         {/*<DialogActions>*/}
//             {/*<Button onClick={this.UploadpwdDialog} color="primary">*/}
//                 {/*确定*/}
//             {/*</Button>*/}
//             {/*<Button onClick={this.pwdDialogClose} color="primary">*/}
//                 {/*关闭*/}
//             {/*</Button>*/}
//         {/*</DialogActions>*/}
//     {/*</Dialog>*/}
// {/*</div>*/}
// {/*<div>*/}
// {/*<Dialog*/}
// {/*open={this.state.dialogState}*/}
// {/*onClose={this.handleDialogClose}*/}
// {/*>*/}
// {/*<DialogTitle>{"提示"}</DialogTitle>*/}
// {/*<DialogContent>*/}
// {/*<DialogContentText>*/}
// {/*{this.state.dialogText}*/}
// {/*</DialogContentText>*/}
// {/*</DialogContent>*/}
// {/*<DialogActions>*/}
//     {/*<Button onClick={this.handleDialogClose} color="primary">*/}
//         {/*关闭*/}
//     {/*</Button>*/}
// {/*</DialogActions>*/}
// {/*</Dialog>*/}
// {/*</div>*/}