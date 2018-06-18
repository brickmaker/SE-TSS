import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio
} from 'material-ui'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class RadioButtonsGroup extends React.Component {
    state = {
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" required className={classes.formControl}>
                    <FormLabel component="legend">题型选择</FormLabel>
                    <RadioGroup
                        aria-label="题型选择"
                        name="题型选择"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="female" control={<Radio />} label="判断题" />
                        <FormControlLabel value="male" control={<Radio />} label="选择题" />
                    </RadioGroup>
                </FormControl>
            </div>
        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
