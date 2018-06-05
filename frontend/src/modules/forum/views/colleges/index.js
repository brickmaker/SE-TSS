import React, {Component} from 'react';
import {Link} from "react-router-dom"
import {getColleges} from "./actions"
import {connect} from "react-redux"
import {MainBody} from "../../components/util/MainBody"
import {Path} from "../../components/util/Path"
import {SectionText, SectionTitle} from "../../components/util/SectionTitle"
import {School} from "@material-ui/icons/es/index"
import Department from "./components/Department"
import {Grid} from "material-ui"

class CollegesPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getColleges()
    }

    render() {
        const {colleges} = this.props
        return (
            <div>
                <MainBody>
                    <Path/>
                    <Grid container>
                        <Grid item xs={4}
                              style={{
                                  padding: '0 20px'
                              }}
                        >
                            <Department
                                name={'人文学部'}
                                colleges={colleges['人文']}
                            />
                            <Department
                                name={'理学部'}
                                colleges={colleges['理']}
                            />
                            <Department
                                name={'医学部'}
                                colleges={colleges['医']}
                            />
                        </Grid>
                        <Grid item xs={4}
                              style={{
                                  padding: '0 20px'
                              }}
                        >
                            <Department
                                name={'工学部'}
                                colleges={colleges['工']}
                            />
                            <Department
                                name={'农业生命环境学部'}
                                colleges={colleges['农业生命环境']}
                            />
                        </Grid>
                        <Grid item xs={4}
                              style={{
                                  padding: '0 20px'
                              }}
                        >
                            <Department
                                name={'社会科学学部'}
                                colleges={colleges['社会科学']}
                            />
                            <Department
                                name={'信息学部'}
                                colleges={colleges['信息']}
                            />
                        </Grid>
                    </Grid>
                </MainBody>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        colleges: state.forum.colleges.colleges
    }),
    (dispatch) => ({
        getColleges: () => {
            dispatch(getColleges())
        }
    })
)(CollegesPage)