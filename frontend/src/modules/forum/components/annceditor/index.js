import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Button, Grid } from 'material-ui';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { MainBody } from '../util/MainBody';
import { Path } from '../util/Path';

const styles = {

    editorStyle: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        height: 300
    },
};


class AnncEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };
    render() {
        const { editorState } = this.state;
        const { collegeid, courseid, teacherid } = this.props.match.params;
        console.log("match", this.props.match);
        //TODO: get corresponding names by ids
        const path = {};
        path["college"] = { "name": collegeid, "link": `/forum/${collegeid}` };
        path["course"] = { "name": courseid, "link": `/forum/${collegeid}/${courseid}` };
        path["teacher"] = { "name": teacherid, "link": `/forum/${collegeid}/${courseid}/${teacherid}` };
        path["annceditor"] = { "name": "发布公告", "link": `/forum/annceditor/${collegeid}/${courseid}/${teacherid}` };
        return (
            <MainBody>
                <Path path={path}/>
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <div style={{
                            paddingBottom: 80,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <input
                                style={{
                                    margin: '10px 0',
                                    boxSizing: 'border-box',
                                    border: 0,
                                    width: '100%',
                                    padding: 10,
                                    backgroundColor: '#ffffff',
                                    fontSize: 18,
                                    height: 40
                                }}
                                placeholder={'公告标题'} />
                            <Editor
                                editorState={editorState}
                                editorStyle={styles.editorStyle}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                            <Button
                                style={{ margin: 20 }}
                                color={'primary'}
                                variant={'raised'}
                                size={'large'}
                            >发布</Button>
                        </div>
                    </Grid>
                </Grid>
            </MainBody>
        );
    };
}

AnncEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(AnncEditor);

