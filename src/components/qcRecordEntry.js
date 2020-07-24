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
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "colorAndAppearance":
                                            return <span><Badge pill variant="info" key={test}> C&A </Badge> </span>
                                        case 'lod':
                                            return <span><Badge pill variant="info" key={test}> LOD </Badge> </span>
                                        case 'ash':
                                            return <span><Badge pill variant="info" key={test}> Ash </Badge> </span>
                                        case 'particleSize':
                                            return <span><Badge pill variant="info" key={test}> Particle Size </Badge> </span>
                                        case 'solids':
                                            return <span><Badge pill variant="info" key={test}> Solids </Badge> </span>
                                        case 'odor':
                                            return <span><Badge pill variant="info" key={test}> Odor </Badge> </span>
                                        case 'meltingPoint':
                                            return <span><Badge pill variant="info" key={test}> Melting Point </Badge> </span>
                                        case 'ftir':
                                            return <span><Badge pill variant="info" key={test}> FTIR </Badge> </span>
                                        case 'nmr':
                                            return <span><Badge pill variant="info" key={test}> NMR </Badge> </span>
                                        case 'uvVis':
                                            return <span><Badge pill variant="info" key={test}> UV-Vis </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={idx}></React.Fragment>
                            })}
                        </h6>
                    </div>
                    <div>
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "hplc":
                                            return <span><Badge pill variant="info" key={test}> HPLC </Badge> </span>
                                        case "gcms":
                                            return <span><Badge pill variant="info" key={test}> GC/MS </Badge> </span>
                                        case "hptlc":
                                            return <span><Badge pill variant="info" key={test}> HPTLC </Badge> </span>
                                        case "sec":
                                            return <span><Badge pill variant="info" key={test}> SEC </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={idx}></React.Fragment>
                            })}
                        </h6>
                    </div>
                    <div >
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "totalPlateCount":
                                            return <span><Badge pill variant="info" key={test}> TPC </Badge> </span>
                                        case "coliform":
                                            return <span><Badge pill variant="info" key={test}> Coliform </Badge> </span>
                                        case "yeastAndMold":
                                            return <span><Badge pill variant="info" key={test}> Y&M </Badge> </span>
                                        case "eColi":
                                            return <span><Badge pill variant="info" key={test}> E.Coli </Badge> </span>
                                        case "salmonella":
                                            return <span><Badge pill variant="info" key={test}> Salmonella </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={idx}></React.Fragment>
                            })}
                        </h6>
                    </div>
                    <div>
                        <h6>
                            {Object.keys(tests).map((test, idx) => {
                                if (tests[test]) {
                                    switch(test) {
                                        case "arsenic":
                                            return <span><Badge pill variant="info" key={test}> As (HM) </Badge> </span>
                                        case "lead":
                                            return <span><Badge pill variant="info" key={test}> Pb (HM)</Badge> </span>
                                        case "mercury":
                                            return <span><Badge pill variant="info" key={test}> Hg (HM) </Badge> </span>
                                        case "cadmium":
                                            return <span><Badge pill variant="info" key={test}> Cd (HM) </Badge> </span>
                                        case 'retain':
                                            return <span><Badge pill variant="info" key={test}> Retain </Badge> </span>
                                        default :
                                            return null
                                    }

                                }
                                return <React.Fragment key={idx}></React.Fragment>
                            })}
                        </h6>
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


