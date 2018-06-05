import React from 'react'

const styles = {
    maxWidth: 1200,
    margin: 'auto'
}

export const MainBody = ({children}) => (
    <div style={styles}>
        {children}
    </div>
)