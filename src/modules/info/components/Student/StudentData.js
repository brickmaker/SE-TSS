import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {Link} from 'react-router-dom'
import {Home, Star,} from '@material-ui/icons';


export const listItems = (
    <div>
        <ListItem component={Link} to={"/info/student"} button>
            <ListItemIcon>
                <Star/>
            </ListItemIcon>
            <ListItemText primary="欢迎页"/>
        </ListItem>
        <ListItem component={Link} to={"/info/student/basicInfo"} button>
            <ListItemIcon>
                <Home/>
            </ListItemIcon>
            <ListItemText primary="个人信息"/>
        </ListItem>
    </div>
);

export const otherItems = (
    <div>
        <ListItem component={Link} to={"/main"} button>
            <ListItemIcon>
                <Home/>
            </ListItemIcon>
            <ListItemText primary="返回系统主页"/>
        </ListItem>
    </div>
);

export const ranges = [
    {
        value: 0,
        label: '公共通识课',
    },
    {
        value: 1,
        label: '专业选修课',
    },
    {
        value: 2,
        label: '专业必修课',
    },
];
export const gender = [
    {
        value: 'M',
        label: '男',
    },
    {
        value: 'F',
        label: '女',
    },
];

export const grade = [
    {
        value: 2000,
        label: 2000,
    },
    {
        value: 2001,
        label: 2001,
    },
    {
        value: 2002,
        label: 2002,
    },
    {
        value: 2003,
        label: 2003,
    },
    {
        value: 2004,
        label: 2004,
    },
    {
        value: 2005,
        label: 2005,
    },
    {
        value: 2006,
        label: 2006,
    },
    {
        value: 2007,
        label: 2007,
    },
    {
        value: 2008,
        label: 2008,
    },
    {
        value: 2009,
        label: 2009,
    },
    {
        value: 2010,
        label: 2010,
    },
    {
        value: 2011,
        label: 2011,
    },
    {
        value: 2012,
        label: 2012,
    },
    {
        value: 2013,
        label: 2013,
    },
    {
        value: 2014,
        label: 2014,
    },
    {
        value: 2015,
        label: 2015,
    },
    {
        value: 2016,
        label: 2016,
    },
    {
        value: 2017,
        label: 2017,
    },
    {
        value: 2018,
        label: 2018,
    },

];


export const credit = [
    {value: 0.5, label: '0.5'},
    {value: 1, label: '1'},
    {value: 1.5, label: '1.5'},
    {value: 2, label: '2'},
    {value: 2.5, label: '2.5'},
    {value: 3, label: '3'},
    {value: 3.5, label: '3.5'},
    {value: 4, label: '4'},
    {value: 4.5, label: '4.5'},
    {value: 5, label: '5'},
    {value: 5.5, label: '5.5'},
    {value: 6, label: '6'},
    {value: 6.5, label: '6.5'},
];