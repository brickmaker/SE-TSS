import React, {Component} from "react"
import PropTypes from 'prop-types'
import {
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
    withStyles
} from "material-ui"

import ShowJudge from './shoJudge';
import ShowChoose from './shoChoose';

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
        value:'a',
    };

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    render() {
        const { classes ,questionTypeList} = this.props;

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
                        <FormControlLabel value="judge" control={<Radio />} label="判断题" />
                        <FormControlLabel value="choose" control={<Radio />} label="选择题" />
                    </RadioGroup>
                </FormControl>
                {this.state.value === "judge"  &&
                    <ShowJudge questionTypeList={questionTypeList}/>
                }


                {this.state.value === "choose" &&
                    <ShowChoose questionTypeList={questionTypeList}/>
                }

            </div>

        );
    }
}

RadioButtonsGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
