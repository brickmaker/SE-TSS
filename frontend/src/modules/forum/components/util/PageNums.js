import React from 'react'
import {Button} from "material-ui"

export const PageNums = ({pageNum, currPage, clickPage}) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row-reverse',
        marginBottom: 20
    }}>
        <div>
            {Array.from({length: pageNum}, (v, k) => (k + 1)).map((page) => {
                return (
                    <Button
                        key={page}
                        size={'small'}
                        onClick={clickPage}
                        style={{
                            minWidth: 30,
                            width: 30,
                            margin: 2,
                            backgroundColor: page == currPage ? '#7986CB' : '#ffffff'
                        }}>
                        {page}
                    </Button>
                )
            })}
        </div>
    </div>
)
