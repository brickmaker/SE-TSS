import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SearchResult from '../../components/searchresult';
import { withStyles , Grid, Typography, Divider} from 'material-ui';

const styles = {
    item:{
        margin:10,
    },
    container:{
        display:"flex",
        justifyContent:"space-between",
    },
}

class SearchResultPanel extends Component {
    
    render(){
        const {classes} = this.props;
        const {results, resultType} = this.props.results;
        return (
            <Grid container justify="center" className={classes.container}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="caption" className={classes.item}>
                    共{results.length}个结果
                </Typography>
                <Divider/>
                <Grid container justify="flex-start">
                {
                Object.values(results).map((result)=>{
                    return (
                    <Grid item xs={12} sm={resultType==='post'?12:6}>
                    <SearchResult key={resultType === 'post'?result["title"]:result["path"]} result={result} resultType={resultType}/>
                    </Grid>
                    )
                })}
                </Grid>
                </Grid>
            </Grid>
        );
    }
}
SearchResultPanel.propTypes = {
    classes: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    results: state.forum.search.results,
});

const mapDispatchToProps = (dispatch) => ({

});

export default compose(connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(SearchResultPanel);

