import React from 'react'
import {Button, Badge} from 'react-bootstrap'
import QCEntryModal from '../modal-components/qcEntryModal'
import {v4 as uuidv4} from 'uuid'


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
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "colorAndAppearance":
                                            return <span key={uuidv4()}><Badge pill variant="info"> C&A </Badge> </span>
                                        case 'lod':
                                            return <span key={uuidv4()}><Badge pill variant="info"> LOD </Badge> </span>
                                        case 'ash':
                                            return <span key={uuidv4()}><Badge pill variant="info"> Ash </Badge> </span>
                                        case 'particleSize':
                                            return <span key={uuidv4()}><Badge pill variant="info"> Particle Size </Badge> </span>
                                        case 'solids':
                                            return <span key={uuidv4()}><Badge pill variant="info"> Solids </Badge> </span>
                                        case 'odor':
                                            return <span key={uuidv4()}><Badge pill variant="info"> Odor </Badge> </span>
                                        case 'meltingPoint':
                                            return <span key={uuidv4()}><Badge pill variant="info"> Melting Point </Badge> </span>
                                        case 'ftir':
                                            return <span key={uuidv4()}><Badge pill variant="info"> FTIR </Badge> </span>
                                        case 'nmr':
                                            return <span key={uuidv4()}><Badge pill variant="info"> NMR </Badge> </span>
                                        case 'uvVis':
                                            return <span key={uuidv4()}><Badge pill variant="info"> UV-Vis </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={uuidv4()}></React.Fragment>
                            })}
                        </h6>
                    </div>
                    <div>
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "hplc":
                                            return <span key={uuidv4()}><Badge pill variant="info"> HPLC </Badge> </span>
                                        case "gcms":
                                            return <span key={uuidv4()}><Badge pill variant="info"> GC/MS </Badge> </span>
                                        case "hptlc":
                                            return <span key={uuidv4()}><Badge pill variant="info"> HPTLC </Badge> </span>
                                        case "sec":
                                            return <span key={uuidv4()}><Badge pill variant="info"> SEC </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={uuidv4()}></React.Fragment>
                            })}
                        </h6>
                    </div>
                    <div >
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "totalPlateCount":
                                            return <span key={uuidv4()}><Badge pill variant="info"> TPC </Badge> </span>
                                        case "coliform":
                                            return <span key={uuidv4()}><Badge pill variant="info"> Coliform </Badge> </span>
                                        case "yeastAndMold":
                                            return <span key={uuidv4()}><Badge pill variant="info"> Y&M </Badge> </span>
                                        case "eColi":
                                            return <span key={uuidv4()}><Badge pill variant="info"> E.Coli </Badge> </span>
                                        case "salmonella":
                                            return <span key={uuidv4()}><Badge pill variant="info"> Salmonella </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={uuidv4()}></React.Fragment>
                            })}
                        </h6>
                    </div>
                    <div>
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "arsenic":
                                            return <span key={uuidv4()}><Badge pill variant="info"> As (HM) </Badge> </span>
                                        case "lead":
                                            return <span key={uuidv4()}><Badge pill variant="info"> Pb (HM)</Badge> </span>
                                        case "mercury":
                                            return <span key={uuidv4()}><Badge pill variant="info"> Hg (HM) </Badge> </span>
                                        case "cadmium":
                                            return <span key={uuidv4()}><Badge pill variant="info"> Cd (HM) </Badge> </span>
                                        case 'retain':
                                            return <span key={uuidv4()}><Badge pill variant="info"> Retain </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={uuidv4()}></React.Fragment>
                            })}
                        </h6>
                    </div>
                </td>
                <td>
                    <ol>
                        {lotNums.map((lot, idx) => (
                            <li 
                                key={uuidv4()}> 
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
                        size="sm"
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


