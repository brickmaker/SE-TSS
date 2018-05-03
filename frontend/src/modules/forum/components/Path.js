import React from 'react'
import {Link} from 'react-router-dom'

export const Path = ({path = {}}) => {
    return (
        <div>
            <Link to={'/forum'}>首页 > </Link>
            {Object.values(path).map((p) => (
                p ? (
                    <Link to={p.link}>{p.name} > </Link>
                ) : null
            ))}
        </div>
    )
}