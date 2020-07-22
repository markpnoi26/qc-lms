import React from 'react'
import {Button, Badge} from 'react-bootstrap'
import QCEntryModal from '../modalComponent/qcEntryModal'


export default class QcRecordEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            modalShow: false
        }
    }

    setModalShow = () => {
        this.setState({
            modalShow: !this.state.modalShow
        })
    }

    render() {
        let {num, projectType, title, tests, lotNums, dateIn, dateOut, requester, analyst} = this.props.file
        return(
            <>
                <td>
                    {num}
                </td>
                <td>
                    {projectType}
                </td>
                <td>
                    {title}
                </td>
                <td>
                    <div>
                        {Object.keys(tests).map((test, idx) => {
                            if (tests[test]) {
                                switch(test) {
                                    case "colorAndAppearance":
                                        return <Badge variant="primary" key={test}> C&A </Badge>
                                    case 'lod':
                                        return <Badge variant="primary" key={test}> LOD </Badge>
                                    case 'ash':
                                        return <Badge variant="primary" key={test}> Ash </Badge>
                                    case 'particleSize':
                                        return <Badge variant="primary" key={test}> Particle Size </Badge>
                                    case 'solids':
                                        return <Badge variant="primary" key={test}> Solids </Badge>
                                    case 'odor':
                                        return <Badge variant="primary" key={test}> Odor </Badge>
                                    case 'meltingPoint':
                                        return <Badge variant="primary" key={test}> Melting Point </Badge>
                                    case 'ftir':
                                        return <Badge variant="primary" key={test}> FTIR </Badge>
                                    case 'nmr':
                                        return <Badge variant="primary" key={test}> NMR </Badge>
                                    case 'uvVis':
                                        return <Badge variant="primary" key={test}> UV-Vis </Badge>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </div>
                    <div>
                        {Object.keys(tests).map((test, idx) => {
                            if (tests[test]) {
                                switch(test) {
                                    case "hplc":
                                        return <Badge variant="primary" key={test}> HPLC </Badge>
                                    case "gcms":
                                        return <Badge variant="primary" key={test}> GC/MS </Badge>
                                    case "hptlc":
                                        return <Badge variant="primary" key={test}> HPTLC </Badge>
                                    case "sec":
                                        return <Badge variant="primary" key={test}> SEC </Badge>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </div>
                    <div >
                        {Object.keys(tests).map((test, idx) => {
                            if (tests[test]) {
                                switch(test) {
                                    case "totalPlateCount":
                                        return <Badge variant="primary" key={test}> TPC </Badge>
                                    case "coliform":
                                        return <Badge variant="primary" key={test}> Coliform </Badge>
                                    case "yeastAndMold":
                                        return <Badge variant="primary" key={test}> Y&M </Badge>
                                    case "eColi":
                                        return <Badge variant="primary" key={test}> E.Coli </Badge>
                                    case "salmonella":
                                        return <Badge variant="primary" key={test}> Salmonella </Badge>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </div>
                    <div>
                        {Object.keys(tests).map((test, idx) => {
                            if (tests[test]) {
                                switch(test) {
                                    case "arsenic":
                                        return <Badge variant="primary" key={test}> As (HM) </Badge>
                                    case "lead":
                                        return <Badge variant="primary" key={test}> Pb (HM)</Badge>
                                    case "mercury":
                                        return <Badge variant="primary" key={test}> Hg (HM) </Badge>
                                    case "cadmium":
                                        return <Badge variant="primary" key={test}> Cd (HM) </Badge>
                                    case 'retain':
                                        return <Badge variant="primary" key={test}> Retain </Badge>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </div>
                </td>
                <td>
                    <ol>
                        {lotNums.map((lot, idx) => (
                            <li 
                                key={idx}> 
                                {lot} 
                            </li> 
                            )
                        )}
                    </ol>
                </td>
                <td >
                    {lotNums.length}
                </td>
                <td>
                    {dateIn}
                </td>
                <td>
                    {dateOut === undefined? "N/A":dateOut}
                </td>
                <td>
                    {requester}
                </td>

                <td>
                    {analyst}
                </td>
                    
                <td style={{textAlign:"center"}}>
                    <Button 
                        variant="info" 
                        onClick={() => this.setModalShow()}> 
                        Info 
                    </Button>
                </td>

                <QCEntryModal
                    file={this.props.file}
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}
                />

            </>
        )
    }
}


