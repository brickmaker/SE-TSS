import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionCreators from '../../../actions/auth';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import {browserHistory} from "react-router";

import {Helmet} from "react-helmet";
//import { Upload, message, Icon } from 'antd';
import image from '../image/2.jpg'

import {Link} from "react-router";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    MenuItem,
    TextField,
    Input,
    Button,
    FormControl,
    NativeSelect,
    Paper,
} from '@material-ui/core';

import {
    Home,
    AccountBox,
    SupervisorAccount,
    Class,
    Star,
} from '@material-ui/icons';

import Bar from "../Bar";
import {listItems, otherItems} from "./TeacherData";

function mapStateToProps(state) {
    return {
        userName: state.auth.userName,
        data: state.auth.data,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '90%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },

    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflow:'auto',
    },
    'content-left': {
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'contentShift-left': {
        marginLeft: 0,
    },

    container: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  TextField: {
    marginLeft:100,
    // marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  menu: {
    width: 200,
  },

  formControl: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },

  img: {
    position: 'absolute',
    marginLeft:300,
    top:100,
    right:300,
    overflow:'auto',

  }
});



class Tea_basicInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchor: 'left',
            username: '',
            id_number:'',
            email:'',
            name:'',
            gender:'',
            department:'',
            title:'',
            img:'',
            open: true,
        };

        let status;
        let url = '/api/faculty/' + localStorage.getItem('userName') + '/';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'JWT ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    status = response.status;
                    return response.json();
                })
                .then((data) => {
                     
                    const username = data.username;
                    const id_number =  data.id_number;
                    const email = data.email;
                    const name = data.name;
                    const gender = data.gender;
                    const department = data.department;
                    const title = data.title;
                    const img = data.img;

                    this.setState({
                        username: username,
                        id_number: id_number,
                        email: email,
                        name: name,
                        gender: gender,
                        department: department,
                        title: title,
                        img: img,
                        });

                    console.log(data.img);
                })
                .catch(() => {
                });


}

    handleClick() {
        this.setState({open: !this.state.open});
    }

    componentDidMount() {

    }

    changeValue(e, type) {
        const value = e.target.value;
        const next_state = {};
        next_state[type] = value;
        this.setState(next_state, () => {
            // this.isDisabled();
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            if (!this.state.disabled) {
                 this.edit(e);
            }
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleUpload(e) {
    if (e.file.status === 'done') {
      this.setState({ img: e.file.response.data.url })
    }
  }

   onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      //message.success(`${info.file.name} file uploaded successfully`);
      this.setState(
      {
        img: info.file.response.data.url
      })
    } else if (info.file.status === 'error') {
      //message.error(`${info.file.name} file upload failed.`);
    }
  }


    edit(e){
       alert('123');
        let url = '/api/faculty/' + this.state.username + '/';
        let data={};
        data.username = this.state.username;
        data.id_number = this.state.id_number;
        data.email = this.state.email;
        data.name = this.state.name;
        data.gender = this.state.gender;
        data.department =  this.state.department;
        data.title = this.state.title;
        data.img = this.state.img;

       
        fetch(url,{
            method: 'PUT',
            headers:{
                'Authorization': 'JWT ' + localStorage.getItem('token'),
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
                        return response.json();
                    })
        .catch(() => {
                    });
    }




    render() {
        const {classes, theme} = this.props;
        const {anchor, open} = this.state;
        return (
            <Bar
                listItems={listItems}
                otherItems={otherItems}
                children={
                <div className={classes.root}>
                <div className={classes.appFrame} onKeyPress={(e) => this._handleKeyPress(e)}>

                <div className={classes.drawerHeader} />
                <Card
                        className={classNames(classes.content, classes[`content-${anchor}`], {
                            [classes.contentShift]: open,
                            [classes[`contentShift-${anchor}`]]: open,
                        })}
                    >
                        <CardContent style={{overflow: 'auto'}}>
                         <h3>个人信息查看与修改</h3>
                         <div>
                         <img className ={classes.img}
                         src={image} height='300' width ='300' alt=""/>
                         </div>
                            <div>
                              <TextField
                                    className={classes.TextField}
                                    label="用户"
                                    value = {this.state.username}
                                    floatingLabelText="用户"
                                    margin="normal"
                                />
                            </div> 
                        

                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="ID号"
                                    value = {this.state.id_number}
                                    floatingLabelText="ID号"
                                    margin="normal"
                                />
                            </div> 
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="邮箱"
                                    value = {this.state.email}
                                    floatingLabelText="邮箱"
                                    onChange={(e) => this.changeValue(e, 'email')}
                                    margin="normal"
                                />
                            </div>                           
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="姓名"
                                    value = {this.state.name}
                                    floatingLabelText="姓名"
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="性别"
                                    value = {this.state.gender}
                                    floatingLabelText="性别"
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="学院"
                                    value = {this.state.department}
                                    floatingLabelText="学院"
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextField
                                    className={classes.TextField}
                                    label="职称"
                                    value = {this.state.title}
                                    floatingLabelText="职称"
                                    margin="normal"
                                />
                            </div>

                            
                            <div className={classes.TextField}>
                            <Button
                            
                                variant="raised"
                                color="primary"
                                className={classes.Button}
                                onClick={(e) => this.edit(e)}
                            
                            >
                                修改
                            </Button>

                            </div>

                            
                        </CardContent>
                        </Card>
 </div>
  </div>


                }
            />


        );
    }
}

Tea_basicInfo.propType = {
    userName: PropTypes.string,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Tea_basicInfo)

export  withStyles(styles, {withTheme: true})(Tea_basicInfo);


