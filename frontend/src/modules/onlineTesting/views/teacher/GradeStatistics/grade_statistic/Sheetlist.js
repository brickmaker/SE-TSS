import React from 'react';
import {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles,
   GridList,
    GridListTile,
    GridListTileBar,
    ListSubheader,
    IconButton,
    TableCell,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableFooter,
    Avatar,
    Paper
} from 'material-ui'
import InfoIcon from '@material-ui/icons/Info';
import image1 from './img/test2.jpg';
import AssignmentIcon from '@material-ui/icons/Assignment'


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
 *     titleData: 'Image',
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
        const { classes } = this.props;
        const props = this.props;
        let tileList = [];
        console.log("render", this.props, this.state)
        props.testList.forEach((item => {
            let tmp = {img:image1,
                title:item.testName,
                author:item.testAuthor,
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
                                subtitle={<span>by: {tile.author}</span>}
                                actionIcon={
                                    <IconButton
                                        title={tile.title}
                                        className={classes.icon}
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
                                    {tileList[this.state.select_index].title +  ` ${tileList[this.state.select_index].author}`}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Avatar >
                                        <InfoIcon />
                                    </Avatar>
                                </TableCell>
                                <TableCell>学号</TableCell>
                                <TableCell>姓名</TableCell>
                                <TableCell>成绩</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.testList[this.state.select_index].whoTakeThisTest.map((item,index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Avatar>
                                            <AssignmentIcon/>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>
                                        {`${item.studentID}`}
                                    </TableCell>
                                    <TableCell>
                                        {`${item.studentName}`}
                                    </TableCell>
                                    <TableCell>
                                        {`${item.studentScore}`}
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