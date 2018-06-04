import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails } from 'material-ui';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
    root: {
        width: '100%',
    },
    item: {
        verticalAlign: "middle",
        marginLeft: 10,
        marginRight: 10,
        display:"inline-block",
    },
    line: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
    },
    line2: {
        display: "flex",
        justifyContent: "flex-start",
        verticalAlign: "middle",
    },
    detail: {
        width: "100%",
        overflow: "auto",
        wordWrap: "break-word",
        // backgroundColor:"#ff00ff",
        textAlign: "left",
    },
}

class Annc extends Component {
    render() {
        const { classes } = this.props;
        const { title, path, author, time, content } = this.props.annc;
        // TODO: have been read
        return (
            <ExpansionPanel className={classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.root}>
                        <div className={classes.line}>
                            <Typography variant="title" className={classes.item}>
                                {title}
                            </Typography>
                            <Typography variant="subheading" className={classes.item}>
                                {path}
                            </Typography>
                        </div>
                        <div className={classes.line2}>
                            <Typography variant="caption" className={classes.item}>
                                {author}
                            </Typography>
                            <Typography variant="caption" className={classes.item}>
                                {time}
                            </Typography>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.detail}>
                        {content}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };
}

Annc.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(Annc);

