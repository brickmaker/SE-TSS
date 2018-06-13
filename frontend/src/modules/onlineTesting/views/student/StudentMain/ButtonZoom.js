import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { withStyles,
    Switch,
    Paper,
    Zoom,
    Button
} from 'material-ui'
const styles = theme => ({
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
});

class SimpleZoom extends React.Component {
    state = {
        checked: false,
    };

    handleChange = () => {
        this.setState({ checked: !this.state.checked });
    };

    render() {
        const { classes } = this.props;
        const { checked } = this.state;

        return (
            <div className={classes.root}>
                <Button checked={checked} variant="fab" onClick={this.handleChange} mini color="secondary" aria-label="add" className={classes.button} >
                    <AddIcon />
                </Button>
                <div className={classes.container}>
                    <Zoom in={checked}>
                        <Button className={classes.button}>试题列表</Button>
                    </Zoom>
                    <Zoom in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
                        <Button className={classes.button}>历史成绩</Button>
                    </Zoom>
                </div>
            </div>
        );
    }
}

SimpleZoom.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleZoom);