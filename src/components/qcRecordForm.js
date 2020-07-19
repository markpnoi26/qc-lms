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
            analyst: []
        }
    }

    render() {
        return(
            <div>
                <form>
                    QC Number:
                    <input 
                        placeHolder="QC Number" 
                        value={this.state.qcNum} 
                        onChange={(event) => this.setState({
                            qcNum: event.target.value
                        })}
                    >
                    </input>

                    Title:
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
                        <option value="Wenwen">Wenwen</option>
                    </select>

                    <label>
                        Analyst:
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
                        <option value="Wenwen">Wenwen</option>
                    </select>

                    <button>Submit Button</button>
                </form>
            </div>
        )
    }
}