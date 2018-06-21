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

export const Path = ({path = {}, isMain = false}) => {
    return (
        <div style={styles}>
            <Link style={linkStyle} to={'/forum'}>首页 > </Link>
            {
                isMain ? null :
                    <Link style={linkStyle} to={'/forum/colleges'}>全部学院 > </Link>
            }
            {Object.values(path).map((p) => (
                p ? (
                    <Link style={linkStyle} to={p.link}>{p.name} > </Link>
                ) : null
            ))}
        </div>
    )
}