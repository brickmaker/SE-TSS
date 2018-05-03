import React, {Component} from 'react';
import {Link} from "react-router-dom"

const CollegesPage = ({match}) => (
    <div>
        <div>
            人文学部
            <ul>
                <li>XX学院</li>
                <li>
                    <Link to={`/forum/42`}>
                        计算机科学与技术学院
                    </Link>
                </li>
            </ul>
        </div>
    </div>
)

export default CollegesPage;