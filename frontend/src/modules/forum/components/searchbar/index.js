import React, { Component } from 'react';
import { Grid, Input, IconButton, Button, Menu, MenuItem, withStyles, Typography, Icon } from 'material-ui';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectSearchType, anchorMenu, search, getContent } from '../../views/search/actions';

const styles = {
    item: {
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: 8,
        marginRight: 8,
    },
    container: {
        display: "inline-block",
        backgroundColor: "#f0f0f0",
    }
}

class SearchBar extends Component {
    render() {
        const typeMapping = { post: "帖子", section: "版块" };
        const { classes, searchType, selectSearchType, anchorEl, anchorMenu, content, getContent, search } = this.props;
        return (
            <div className={classes.container}>
                <Typography className={classes.item} style={{ cursor: "pointer",}}
                    onClick={(event) => { event.preventDefault(); anchorMenu(event.currentTarget); }}>
                    <SearchIcon className={classes.item} />
                    {typeMapping[searchType]}
                </Typography>
                <Menu open={Boolean(anchorEl)} getContentAnchorEl={null} anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }} transformOrigin={{ vertical: "top", horizontal: "right", }}
                    onClose={(event) => { anchorMenu(null); }}
                >
                    <MenuItem onClick={(event) => { event.preventDefault(); anchorMenu(null); selectSearchType("section"); }}>版块</MenuItem>
                    <MenuItem onClick={(event) => { event.preventDefault(); anchorMenu(null); selectSearchType("post"); }}>帖子</MenuItem>
                </Menu>
                <Input className={classes.item} disableUnderline={true} placeholder="请输入搜索内容"
                    onKeyDown={(event) => {
                        // event.preventDefault();
                        console.log(event.target.value);
                        if (event.keyCode === 'Enter') {
                            event.preventDefault();
                            search(searchType, event.target.value);
                        }
                        getContent(event.target.value);
                    }}
                />
                {/* <IconButton className={classes.item} disableFocusRipple={false} onClick={
                    (event)=>{event.preventDefault(); search(searchType, content);}
                }>
                    <SearchIcon />
                </IconButton> */}
            </div>
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
    anchorMenu: (anchorEl) => { console.log("anchorMenu"); dispatch(anchorMenu(anchorEl)); },
    getContent: (content) => { dispatch(getContent(content)); },
    search: (type, content) => { dispatch(search(type, content)); },
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchBar);