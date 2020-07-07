import React from 'react'
import { AmplifySignOut } from '@aws-amplify/ui-react';

export default class NavBar extends React.Component {
    constructor() {
        super()
        this.state={

        }
    }

    render() {
        const navBarStyle={
            "border":"2px solid"
        }
        
        return (
            <div style={navBarStyle}>
                This is the Navigation bar which contains the logout button
                <AmplifySignOut />
            </div>
        )
    }
}