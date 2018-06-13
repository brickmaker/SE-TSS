import React from 'react'
import {Typography} from "material-ui"

export const SectionTitle = ({children}) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }}>
        {children}
    </div>
)

export const SectionText = ({children, text}) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }}>
        {children}
        <Typography
            color={'primary'}
            variant={'title'}
            style={{
                marginLeft: '0.4em'
            }}
        >
            {text}
        </Typography>
    </div>
)