import React, { Component } from 'react';
import { Grid, Input, IconButton, Button, Menu, MenuItem, withStyles, Typography, Icon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card } from 'material-ui';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectSearchType, anchorMenu, search, getContent, fillQuery } from '../../views/search/actions';
import { clearAnncs } from '../../views/announcements/actions';

const styles = {
    item: {
        display: "inline-block",
        verticalAlign: "middle",
        // paddingLeft: 4,
        // paddingRight: 4,
        marginLeft: 4,
        marginRight: 4,
    },
    type: {
        display: "inline-block",
        // display: "inline-flex",
        flexGrow: 1,
        verticalAlign: "middle",
        paddingLeft: 8,
        paddingRight: 8,
        maxWidth: 80,
    },
    input: {
        display: "inline-block",
        // display: "inline-flex",
        flexGrow: 5,
        verticalAlign: "middle",
        paddingLeft: 8,
        paddingRight: 8,
        // width: "85%",
        // minWidth:1000,
    },
    container: {
        // display: "inline-block",
        // backgroundColor: "#f0f0f0",
        // padding: 10,
        display: "flex",
        // verticalAlign: "middle",
        alignItems: "center",
        height: 48,
        // marginLeft: 20,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 30,
    },
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDialogOpen: false,
            dialogContent: "",
        };
    }

    render() {
        const typeMapping = { post: "帖子", section: "版块" };
        const { classes, searchType, selectSearchType, anchorEl, anchorMenu, content, getContent, clearAnncs } = this.props;
        const { isDialogOpen, dialogContent } = this.state;
        return (
            <Card className={classes.container}>
                {/* <div  styles={{backgroundColor: "#3f51b5"}}> */}
                <Typography variant="subheading" className={classes.type} style={{ cursor: "pointer" }}
                    onClick={(event) => { event.preventDefault(); anchorMenu(event.currentTarget); }}>
                    {typeMapping[searchType]}
                    {Boolean(anchorEl) ? <KeyboardArrowUpIcon className={classes.item} /> : <KeyboardArrowDownIcon className={classes.item} />}
                </Typography>
                {/* </div> */}
                <Menu open={Boolean(anchorEl)} getContentAnchorEl={null} anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }} transformOrigin={{ vertical: "top", horizontal: "left", }}
                    onClose={(event) => { anchorMenu(null); }}
                >
                    <MenuItem onClick={(event) => { event.preventDefault(); anchorMenu(null); selectSearchType("post"); }}>帖子</MenuItem>
                    <MenuItem onClick={(event) => { event.preventDefault(); anchorMenu(null); selectSearchType("section"); }}>版块</MenuItem>
                </Menu>
                <Input className={classes.input} disableUnderline={true} placeholder="请输入搜索内容"
                    inputProps={{ style: { width: "100%" } }}
                    onKeyDown={(event) => {
                        // event.preventDefault();
                        // console.log(event.target.value);
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            if (event.target.value.length == 0) {
                                this.setState({ isDialogOpen: true, dialogContent: "搜索内容不得为空" });
                            }
                            else if (event.target.value.length > 20) {
                                this.setState({ isDialogOpen: true, dialogContent: "搜索长度不得超过20" });
                            }
                            else this.props.history.push(`/forum/search/${searchType}/${event.target.value}/1`);
                        }
                        else getContent(event.target.value);
                    }}
                />
                <SearchIcon className={classes.item} style={{ cursor: "pointer" }} onClick={(event) => {
                    event.preventDefault();
                    if (content.length == 0) {
                        this.setState({ isDialogOpen: true, dialogContent: "搜索内容不得为空" });
                    }
                    else if (content.length > 20) {
                        this.setState({ isDialogOpen: true, dialogContent: "搜索长度不得超过20" });
                    }
                    else {
                        clearAnncs();
                        this.props.history.push(`/forum/search/${searchType}/${content}/1`);
                    }
                }} />
                <Dialog open={isDialogOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    onClose={() => {
                        this.setState({ isDialogOpen: false });
                    }}
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title" >搜索</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialogContent}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button color='primary' onClick={() => { this.setState({ isDialogOpen: false }); }}>
                            确定
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        );
    };
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    searchType: state.forum.search.searchType,
    results: state.forum.search.results,
    anchorEl: state.forum.search.anchorEl,
    content: state.forum.search.content,
});

const mapDispatchToProps = (dispatch) => ({
    selectSearchType: (searchType) => { dispatch(selectSearchType(searchType)); },
    anchorMenu: (anchorEl) => { dispatch(anchorMenu(anchorEl)); },
    getContent: (content) => { dispatch(getContent(content)); },
    clearAnncs: ()=>{
        dispatch(clearAnncs());
    },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchBar);