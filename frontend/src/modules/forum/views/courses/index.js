import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCourses, getCoursesInfo} from "./actions"
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {Extension} from "@material-ui/icons/es/index"
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    withStyles
} from "material-ui"
import {dateFormat} from "../../utils/time"
import {Link} from "react-router-dom"

const styles = {
    root: {},
    row: {
        hover: {
            backgroundColor: '#ff0000',
            cursor: 'hand'
        }
    }
}

class Courses extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleChangePage = this.handleChangePage.bind(this)
    }

    componentDidMount() {
        console.log('get courses')
        const cid = this.props.match.params.collegeid
        this.props.getCoursesInfo(cid)
    }

    handleChangePage = (event, page) => {
        // this.setState({page});
        const cid = this.props.match.params.collegeid
        this.props.getCourses(cid, page + 1) // material table count start with 0!!
    };

    render() {
        const {collegeid} = this.props.match.params
        const {college, courses, pageNum, currPage, classes} = this.props
        const path = {
            college: {
                name: college,
                link: `/forum/${collegeid}`
            }
        }
        return (
            <div>
                <MainBody>
                    <div>
                        <Path path={path}/>
                        <SectionTitle>
                            <SectionText text={'全部课程'}>
                                <Extension color={'primary'} style={{fontSize: 40}}/>
                            </SectionText>
                            <div>
                            </div>
                        </SectionTitle>
                        <Paper style={{
                            marginTop: 20,
                            marginBottom: 80
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>课程代号</TableCell>
                                        <TableCell>课程名称</TableCell>
                                        <TableCell>任课老师</TableCell>
                                        <TableCell numeric>帖子总数</TableCell>
                                        <TableCell numeric>最近更新</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        courses.map((c) => (
                                            <TableRow
                                                key={c.id}
                                                className={classes.row}
                                                hover
                                                onClick={() => {
                                                    console.log(c.id)
                                                    this.props.history.push(`${this.props.match.url}/${c.id}`)
                                                }}
                                            >
                                                <TableCell>{c.code}</TableCell>
                                                <TableCell>{c.name}</TableCell>
                                                <TableCell>{c.teachers.join('、')}</TableCell>
                                                <TableCell numeric>{c.postsNum}</TableCell>
                                                <TableCell numeric>{dateFormat(new Date(c.lastUpdate))}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            count={pageNum}
                                            rowsPerPage={15}
                                            rowsPerPageOptions={[15,]}
                                            page={currPage - 1}
                                            backIconButtonProps={{
                                                'aria-label': 'Previous Page',
                                            }}
                                            nextIconButtonProps={{
                                                'aria-label': 'Next Page',
                                            }}
                                            onChangePage={this.handleChangePage}
                                            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                            // ActionsComponent={TablePaginationActionsWrapped}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </Paper>
                    </div>
                </MainBody>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    college: state.forum.courses.college,
    pageNum: state.forum.courses.pageNum,
    currPage: state.forum.courses.currPage,
    courses: state.forum.courses.courses
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCoursesInfo: (collegeId) => {
            dispatch(getCoursesInfo(collegeId));
        },
        getCourses: (collegeId, pageId) => {
            dispatch(getCourses(collegeId, pageId))
        }
    }
};

Courses.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
    mapStateToProps,
    mapDispatchToProps
)(Courses))
