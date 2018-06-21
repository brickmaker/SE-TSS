import React from 'react';
import {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles,
    GridList,
    GridListTileBar,
    ListSubheader,
    IconButton,
    GridListTile,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableFooter,
    TableCell,
    Avatar,
    Paper
} from 'material-ui'
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIcon from '@material-ui/icons/Assignment'

import image1 from './img/person.png';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        space:100

    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    gridListTile:{
    }
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
class TitlebarGridList extends Component{
    state = Object.assign({}, this.state, {
        select_index: -1
    });

   render(){
       const props = this.props;
       const { classes } = props;
       let tileList = [];
       props.studentList.forEach((item => {
           let tmp = {img:image1,
               title:item.studentName,
               author:item.studentID,
           };
           tileList.push(tmp);
       }));
       return (
           <div className={classes.root}>
               <GridList cellHeight={150} className={  classes.gridList}>
                   <GridListTile key="Subheader"  cols={2} style={{ height: 'auto' }} >
                       <ListSubheader component="div"></ListSubheader>
                   </GridListTile >
                   {tileList.map((tile, index) => (
                       <GridListTile key={index} cols={0.3} calssName={classes.gridListTile}>
                           <img src={tile.img} alt={tile.title} />
                           <GridListTileBar
                               title={tile.title}
                               subtitle={<span>学号: {tile.author}</span>}
                               actionIcon={
                                   <IconButton
                                        className={classes.icon}
                                        title={tile.title + ` 学号: ${tile.author}`}
                                        onClick={(e)=>this.setState(Object.assign({}, this.state, {select_index: index}))}
                                   >
                                       <InfoIcon />
                                   </IconButton>
                               }
                           />
                       </GridListTile>
                   ))}
               </GridList>
               {this.state.select_index > -1 &&
               <Paper style={{width:"97%"}}>
                   <Table>
                       <TableHead>
                           <TableRow>
                                <TableCell>
                                    {tileList[this.state.select_index].title + ` 学号: ${tileList[this.state.select_index].author}`}
                                </TableCell>
                           </TableRow>
                           <TableRow>
                               <TableCell>
                                   <Avatar >
                                       <InfoIcon />
                                   </Avatar>
                               </TableCell>
                               <TableCell>考试名称</TableCell>
                               <TableCell>成绩</TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                           {props.studentList[this.state.select_index].takenTest.map((item,index) => (
                               <TableRow key={index}>
                                   <TableCell>
                                       <Avatar>
                                           <AssignmentIcon/>
                                       </Avatar>
                                   </TableCell>
                                   <TableCell>
                                       {`${item.exam}`}
                                   </TableCell>
                                   <TableCell>
                                       {`${item.testScore}`}
                                   </TableCell>

                               </TableRow>
                           ))}
                       </TableBody>
                   </Table>
               </Paper>
               }

           </div>
       );
   }
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);

