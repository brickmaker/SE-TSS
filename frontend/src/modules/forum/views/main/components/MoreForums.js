import React, {Component} from 'react'
import {Button, Card, Grid, IconButton} from "material-ui"
import {SectionText, SectionTitle} from "../../../components/util/SectionTitle"
import {Extension, Add as AddButton} from "@material-ui/icons/es/index"
import {withRouter} from "react-router-dom"

class MoreForums extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {history} = this.props;
        return (
            <Grid item xs={6}
                  style={{
                      padding: '0 20px',
                  }}
            >
                <div
                    onClick={() => {
                        history.push('/forum/colleges')
                    }}
                >
                    <SectionTitle>
                        <SectionText
                            onClick={() => {
                                history.push('forum/colleges')
                            }}
                            text={'全部板块'}
                        >
                            <Extension color={'primary'} style={{fontSize: 40}}/>
                        </SectionText>
                    </SectionTitle>
                </div>
                <Card style={{
                    marginTop: 10,
                    marginBottom: 30,
                    padding: '4px 0',
                    height: 200
                }}>
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: '100%',
                            textAlign: 'center'
                        }}>
                            <IconButton
                                onClick={() => {
                                    history.push('forum/colleges')
                                }}
                                style={{
                                    width: 60,
                                    height: 60,
                                }}>
                                <AddButton style={{
                                    width: 40,
                                    height: 40,
                                }}/>
                            </IconButton>
                        </div>
                    </div>
                </Card>
            </Grid>
        )
    }
}

export default withRouter(MoreForums)