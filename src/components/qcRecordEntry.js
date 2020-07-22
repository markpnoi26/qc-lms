import React from 'react'
import {Button, ListGroup} from 'react-bootstrap'
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
                    <ListGroup horizontal>
                        {Object.keys(this.props.file.tests).map((test, idx) => {
                            if (this.props.file.tests[test]) {
                                switch(test) {
                                    case "colorAndAppearance":
                                        return <ListGroup.Item key={test}> C&A </ListGroup.Item>
                                    case 'lod':
                                        return <ListGroup.Item key={test}> LOD </ListGroup.Item>
                                    case 'ash':
                                        return <ListGroup.Item key={test}> Ash </ListGroup.Item>
                                    case 'particleSize':
                                        return <ListGroup.Item key={test}> Particle Size </ListGroup.Item>
                                    case 'solids':
                                        return <ListGroup.Item key={test}> Solids </ListGroup.Item>
                                    case 'odor':
                                        return <ListGroup.Item key={test}> Odor </ListGroup.Item>
                                    case 'meltingPoint':
                                        return <ListGroup.Item key={test}> Melting Point </ListGroup.Item>
                                    case 'ftir':
                                        return <ListGroup.Item key={test}> FTIR </ListGroup.Item>
                                    case 'nmr':
                                        return <ListGroup.Item key={test}> NMR </ListGroup.Item>
                                    case 'uvVis':
                                        return <ListGroup.Item key={test}> UV-Vis/ </ListGroup.Item>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </ListGroup>
                    <ListGroup horizontal>
                        {Object.keys(this.props.file.tests).map((test, idx) => {
                            if (this.props.file.tests[test]) {
                                switch(test) {
                                    case "hplc":
                                        return <ListGroup.Item key={test}> HPLC </ListGroup.Item>
                                    case "gcms":
                                        return <ListGroup.Item key={test}> GC/MS </ListGroup.Item>
                                    case "hptlc":
                                        return <ListGroup.Item key={test}> HPTLC </ListGroup.Item>
                                    case "sec":
                                        return <ListGroup.Item key={test}> SEC </ListGroup.Item>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </ListGroup>
                    <ListGroup horizontal>
                        {Object.keys(this.props.file.tests).map((test, idx) => {
                            if (this.props.file.tests[test]) {
                                switch(test) {
                                    case "totalPlateCount":
                                        return <ListGroup.Item key={test}> TPC </ListGroup.Item>
                                    case "coliform":
                                        return <ListGroup.Item key={test}> Coliform </ListGroup.Item>
                                    case "yeastAndMold":
                                        return <ListGroup.Item key={test}> Y&M </ListGroup.Item>
                                    case "eColi":
                                        return <ListGroup.Item key={test}> E.Coli </ListGroup.Item>
                                    case "salmonella":
                                        return <ListGroup.Item key={test}> Salmonella </ListGroup.Item>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </ListGroup>
                    <ListGroup horizontal>
                        {Object.keys(this.props.file.tests).map((test, idx) => {
                            if (this.props.file.tests[test]) {
                                switch(test) {
                                    case "arsenic":
                                        return <ListGroup.Item key={test}> As (HM) </ListGroup.Item>
                                    case "lead":
                                        return <ListGroup.Item key={test}> Pb (HM)</ListGroup.Item>
                                    case "mercury":
                                        return <ListGroup.Item key={test}> Hg (HM) </ListGroup.Item>
                                    case "cadmium":
                                        return <ListGroup.Item key={test}> Cd (HM) </ListGroup.Item>
                                    default :
                                        return null
                                }

                            }
                            return <React.Fragment key={idx}></React.Fragment>
                        })}
                        
                    </ListGroup>
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
                    <Button 
                        variant="secondary" 
                        onClick={() => this.setModalShow()}> 
                        Info Card 
                    </Button>
                </td>

                <QCEntryModal 
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow()}
                />

            </>
        )
    }
}


