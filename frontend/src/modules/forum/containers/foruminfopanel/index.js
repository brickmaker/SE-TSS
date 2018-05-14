import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Typography } from 'material-ui';
import { Flag } from '@material-ui/icons';
import { SectionText, SectionTitle } from "../../components/util/SectionTitle"

const styles = {
    container: {
        marginTop: 20,
        // marginBottom: 20,
    },
    box:{
padding: 20,
    },
    item: {
        verticalAlign: "middle",
        marginLeft: 10,
        marginRight: 10,
    },
    line: {
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
        paddingTop: 3,
        paddingBottom: 3,
    },
};

class ForumInfoPanel extends Component {
    render() {
        const { classes, info } = this.props;
        return (
            <div className={classes.container}>
                <Paper className={classes.box}>
                    {Object.keys(info).map((key, index) => {
                        return (
                        <div className={classes.line}>
                        <Typography variant="body1" className={classes.item}>
                        {key}
                        </Typography>
                        <Typography variant="body1" className={classes.item}>
                        {info[key]}
                        </Typography>
                            {/* {key}:{info[key]} */}
                        </div>
                        )
                    })
                    }
                </Paper>
            </div>

        );
    };
}


ForumInfoPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    info: state.forum.management.info,
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(ForumInfoPanel);

