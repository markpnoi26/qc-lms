import React from 'react'

export default class MainWindow extends React.Component {
    constructor() {
        super() 
        this.state={

        }
    }

    render() {

        const mainWindowStyle={
            "border":"2px solid"
        }
        
        return (
            <div className="main-window" style={mainWindowStyle}>
                This is the main window
            </div>
        )
    }
}