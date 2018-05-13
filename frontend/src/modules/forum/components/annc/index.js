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
        // marginLeft: 10,
        marginRight: 10,
        display: "inline-block",
    },
    line: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
        marginTop: 5,
    marginBottom: 5,
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
        const { classes, type } = this.props;
        const { title, path, author, time, content } = this.props.annc;
        // TODO: have been read
        return (
            <ExpansionPanel className={classes.root}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <div className={classes.root}>
                        <div className={classes.line}>
                            <Typography variant={type==='main'?"subheading":"title"} className={classes.item}>
                                {title}
                            </Typography>
                            {(type != 'main') &&
                                <Typography variant="subheading" className={classes.item}>
                                    {`${path["course"]["name"]} > ${path["teacher"]["name"]}`}
                                </Typography>
                            }
                        </div>
                        <div className={classes.line2}>
                            {(type === 'main') &&
                                <Typography variant="caption" className={classes.item}>
                                    {`${path["course"]["name"]} > ${path["teacher"]["name"]}`}
                                </Typography>
                            }
                        </div>
                        <div className={classes.line2}>
                            <Typography variant="caption" className={classes.item}>
                                {author["username"]}
                            </Typography>
                            <Typography variant="caption" className={classes.item}>
                                {time}
                            </Typography>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography variant="body1"
                    className={classes.detail}>
                        {content}
                    </Typography>
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

