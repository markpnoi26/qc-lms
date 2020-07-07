import React from 'react'


export default class SideBar extends React.Component {
    constructor() {
        super()
        this.state={

        }
    }

    render() {
        const sideBarStyle={
            "border":"2px solid"
        }
        return (
            <div style={sideBarStyle}>
                Side Bar Holder
            </div>
        )
    }
}