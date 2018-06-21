import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    GridList,
    GridListTileBar,
    ListSubheader,
    IconButton,
    GridListTile
} from 'material-ui'
import InfoIcon from '@material-ui/icons/Info';
import tileData from './headdata';

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
function TitlebarGridList(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <GridList cellHeight={150} className={  classes.gridList}>
                <GridListTile key="Subheader"  cols={2} style={{ height: 'auto' }} >
                    <ListSubheader component="div"></ListSubheader>
                </GridListTile >
                {tileData.map(tile => (
                    <GridListTile key={tile.img} cols={0.3} calssName={classes.gridListTile}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                            title={tile.title}
                            subtitle={<span>学号: {tile.author}</span>}
                            actionIcon={
                                <IconButton className={classes.icon}>
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

TitlebarGridList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);

