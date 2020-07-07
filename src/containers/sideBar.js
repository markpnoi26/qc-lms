import React from 'react'
import {Link} from 'react-router-dom'

export default class SideBar extends React.Component {
    constructor() {
        super()
        this.state={

        }
    }

    render() {
        return (
            <div>
                <h1>Side Bar</h1>
                <ul>
                    <li> 
                        <Link to="/"> Home </Link>
                    </li>
                    <li> 
                        <Link to="/records"> QC Files </Link>
                    </li>
                    <li> 
                        <Link to="/retain"> Retain </Link>
                    </li>
                    <li> 
                        <Link to="/stability"> Stability </Link>
                    </li>
                </ul>
            </div>
        )
    }
}