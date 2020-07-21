import React from 'react'


export default class QcRecordEntry extends React.Component {
    constructor() {
        super()
        this.state={}
    }

    render() {
        return(
            <>
                <td>
                    {this.props.file.num}
                </td>
                <td>
                    {this.props.file.projectType}
                </td>
                <td>
                    {this.props.file.title}
                </td>
                <td>
                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    
                                    <td>
                                        <input type="checkbox" value="hplc" checked={this.props.file.tests.hplc} disabled/>
                                    </td>
                                    <td>HPLC</td>

                                    <td>
                                        <input type="checkbox" value="colorAndAppearance" checked={this.props.file.tests.colorAndAppearance} disabled/>
                                    </td>
                                    <td>C&A</td>
                                    <td>
                                        <input type="checkbox" value="lod" checked={this.props.file.tests.lod} disabled/>
                                    </td>
                                    <td>LOD</td>
                                    
                                </tr>
                                <tr>
                                    
                                    <td>
                                        <input type="checkbox" value="osr" checked={this.props.file.tests.osr} disabled/>
                                    </td>
                                    <td>OSR</td>

                                
                                    <td>
                                        <input type="checkbox" value="gcms" checked={this.props.file.tests.gcms} disabled/>
                                    </td>
                                    <td>GC/MS</td>
                                    
                                    
                                    <td>
                                        <input type="checkbox" value="hptlc" checked={this.props.file.tests.hptlc} disabled/>
                                    </td>
                                    <td>HPTLC</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" value="uvVis" checked={this.props.file.tests.uvVis} disabled/>
                                    </td>
                                    <td>UV-Vis</td>
                                    <td>
                                        <input type="checkbox" value="pesticides" checked={this.props.file.tests.pesticides} disabled/>
                                    </td>
                                    <td>Pestic.</td>
                                    <td>
                                        <input type="checkbox" value="heavyMetals" checked={this.props.file.tests.heavyMetals} disabled/>
                                    </td>
                                    <td>H/M</td>
                                    
                                </tr>
                            </tbody>
                        </table>
                        
                    </form>
                </td>
                <td>
                    <ol>
                        {this.props.file.lotNums.map((lot, idx) => (
                            <li 
                                key={idx}> 
                                {lot} 
                            </li> 
                            )
                        )}
                    </ol>
                </td>
                <td >
                    {this.props.file.lotNums.length}
                </td>
                <td>
                    {this.props.file.dateIn}
                </td>
                <td>
                    N/A
                </td>
                <td>
                    {this.props.file.requester}
                </td>

                <td>
                    {this.props.file.analyst}
                </td>
                    
                <td style={{textAlign:"center"}}>
                    <button > Update File</button>
                    <button > Delete File</button>
                </td>
            </>
        )
    }
}


