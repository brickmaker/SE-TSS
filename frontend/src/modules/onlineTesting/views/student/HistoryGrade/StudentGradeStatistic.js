import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    Avatar
} from 'material-ui'

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

class CheckboxListSecondary extends React.Component {
    state = {
        checked: [1],
    };

    handleToggle = value => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {[0, 1, 2, 3].map(value => (
                        <ListItem key={value} dense button className={classes.listItem}>
                            <Avatar alt="Remy Sharp" src="/static/images/remy.jpg" />
                            <ListItemText primary={`Test ${value + 1}`} />
                            <ListItemText primary={`Average Grade`}/>
                            <ListItemText primary={`10/${value + 1}`}/>
                            <ListItemSecondaryAction>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
}

CheckboxListSecondary.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxListSecondary);
