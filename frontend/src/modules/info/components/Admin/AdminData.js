import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

import {Link} from 'react-router-dom'
import {AccountBox, Home, Star,} from '@material-ui/icons';


export const listItems = (
    <div>

        <ListItem component={Link} to={"/info/admin"} button>
             <ListItemIcon>
                <Star/>
            </ListItemIcon>
            <ListItemText primary="欢迎页"/>
        </ListItem>
        <ListItem component={Link} to={"/info/admin/basicInfo"} button>
            <ListItemIcon>
                <AccountBox/>
            </ListItemIcon>
            <ListItemText primary="个人信息"/>
        </ListItem>
        <ListItem component={Link} to={"/info/admin/logInfo"} button>
            <ListItemIcon>
                <Star/>
            </ListItemIcon>
            <ListItemText primary="日志信息"/>
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
export const ColumnData = [
    {value: 'time', label: '时间'},
    {value: 'content', label: '日志内容'},

];
