import React from 'react'


export default class SideBar extends React.Component {
    constructor() {
        super()
        this.state={

        }
    }

    render() {
        return (
            <div>
                Side Bar Holder
                <ul>
                    <li> QC Record </li>
                    <li> Retain </li>
                    <li> Stability </li>
                </ul>
            </div>
        )
    }
}