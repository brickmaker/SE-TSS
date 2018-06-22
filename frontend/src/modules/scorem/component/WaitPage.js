import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  div: {
    testAlign: 'center'
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  typo: {
    margin: 'auto',
  }
});

function WaitPage(props) {
  const { classes } = props;
  return (
    <div style={{textAlign:'center'}}>
      {/*<CircularProgress className={classes.progress} />*/}
      <CircularProgress className={classes.progress} size={100} />
      {/*<CircularProgress className={classes.progress} color="secondary" />*/}
      {/*<CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />*/}
    </div>
  );
}

WaitPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WaitPage);