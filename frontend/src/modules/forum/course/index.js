import React, {Component} from 'react'

class Course extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {match} = this.props
        return (
            <div>course discuss: {match.params.collegeid}-{match.params.courseid}</div>
        )
    }
}

export default Course