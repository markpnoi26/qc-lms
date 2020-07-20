import React from 'react'

export default class QCRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            qcNum: "",
            title: "",
            requester: "",
            tests: {
                hplc: false,
                colorAndAppearance: false,
                lod: false,
                heavyMetals: false,
                osr: false,
                gcms: false,
                pesticides: false,
                hptlc: false,

            },
            lotNums: [],
            analyst: ""
        }
    }

    render() {
        return(
            <div>
                <form>
                    <label>
                    QC Number:
                    </label>
                    <input 
                        placeHolder="QC Number" 
                        value={this.state.qcNum} 
                        onChange={(event) => this.setState({
                            qcNum: event.target.value
                        })}
                    >
                    </input>
                    
                    <label>
                    Title:
                    </label>
                    <input 
                        placeHolder="Title" 
                        value={this.state.title} 
                        onChange={(event) => this.setState({
                            title: event.target.value
                        })}
                    >
                    </input>
                    
                    <label>
                        Requester:
                    </label>
                    <select 
                        value={this.state.requester} 
                        onChange={(event) => this.setState({
                            requester: event.target.value
                        })}
                    >
                        <option value="">(none)</option>
                        <option value="QC">QC</option>
                        <option value="NP">NP</option>
                        <option value="Other">Other</option>
                    </select>

                    <label>
                        Analyst:
                    </label>
                    <select 
                        value={this.state.requester} 
                        onChange={(event) => this.setState({
                            analyst: event.target.value
                        })}
                    >
                        <option value="">(none)</option>
                        <option value="MD">MD</option>
                        <option value="KH">KH</option>
                        <option value="WM">WM</option>
                    </select>

                    <button>Add File</button>
                </form>
            </div>
        )
    }
}