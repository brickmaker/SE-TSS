import React from 'react'
import {Link} from 'react-router-dom'

const styles = {
    paddingTop: 25,
    paddingBottom: 45,
    fontSize: 18,
    fontWeight: 400
}

const linkStyle = {
    textDecoration: 'none',
    color: '#757575'
}

export const Path = ({path = {}}) => {
    return (
        <div style={styles}>
            <Link style={linkStyle} to={'/forum'}>首页 > </Link>
            {Object.values(path).map((p) => (
                p ? (
                    <Link style={linkStyle} to={p.link}>{p.name} > </Link>
                ) : null
            ))}
        </div>
    )
}