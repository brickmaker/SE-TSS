import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {List,
    ListItem,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction
}from 'material-ui';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

function PinnedSubheaderList(props) {
    const { classes,questionTypeList } = props;

    return (
        <List className={classes.root} subheader={<li />}>
            {questionTypeList.multiChoices.map(section => (
                <li key={`section-${section.testName}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        <ListSubheader>{`${section.testName}`}</ListSubheader>
                        {section.content.map(sectionContent =>(
                            <ListItem key={`item-${sectionContent.questionID}-${sectionContent}`}>
                                <ListItemText primary={`${sectionContent.questionID}`} />
                                <ListItemSecondaryAction>
                                    <ListItemText primary={`${sectionContent.answerRate}`} />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
}

PinnedSubheaderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PinnedSubheaderList);

