import React from 'react';
import PropTypes from 'prop-types';
import { withStyles,
    Paper,
    Tabs,
    Tab,
    Typography,
} from 'material-ui';
import PL from './PeopleList';
import SL from './Sheetlist'
import TL from './tagList'
import TypeList from './TypeList'

const styles = {
    root: {
        flexGrow: 1,
    },
};

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

class CenteredTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        return (
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="试卷" />
                    <Tab label="个人" />
                    <Tab label="考察点" />
                    <Tab label="题型" />
                </Tabs>
                {value === 0 && <SL/>}
                {value === 1 && <PL/>}
                {value === 2 && <TL/>}
                {value === 3 && <TypeList/>}
            </Paper>
        );
    }
}

CenteredTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);
