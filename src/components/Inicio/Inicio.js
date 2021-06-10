import React from 'react';
import { withTranslation, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Card, CardBody, ButtonGroup, CardHeader } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Form, FormGroup, Label, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';


import qs from "qs";

import ResultCard from "../Comp/ResultCard"

import db from "../../db/db"

class SearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: props.height};
      }
     
    state = {
        dropdownOpen: false,
        resultados: []
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    getSearch() {
        this.n = 0
        console.log(this.props)
        console.log(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }))
        db.getSearch().then(resultados => {
            this.setState({ resultados: resultados.documents })
        })
    }

    componentDidMount() {
        this.getSearch()
    }
    UNSAFE_componentWillMount(){
        this.setState({height: window.outerHeight*0.575 + 'px'});
      }

    render() {
        return (
        <ContentWrapper>
            <div className="d-flex align-items-center justify-content-center container container-table" style={{"height": this.state.height}}>
                <Row style={{ justifyContent: 'center', alignItems: 'center',display:'flex'}} class="col-xs-4 col-xs-offset-4">
                    <Card style={ {width: "400px" }} class="shadow-lg p-3 mb-5 bg-white rounded">
                        <CardHeader><center><h1>Home</h1></center></CardHeader>
                            <CardBody>
                                <Col style={{ justifyContent: 'center', alignItems: 'center'}}>
                                    <div className="text-center">
                                        <Row style={{ justifyContent: 'center', 
                                                    alignItems: 'center'}}>
                                            <Link to={"/busca"} style={{ color: '#fff',textDecoration: 'none'}}> 
                                                <div style={{ "width": "250px","height": "100px"}} className="card flex-row align-items-center align-items-stretch border-0 rounded-3">
                                                    <div style = {{ backgroundColor: '#fff'}} className="btn-outline-light"></div>
                                                    <div style={{ backgroundColor: '#d7130f' }} className="col-3 d-flex align-items-center justify-content-center rounded-left">
                                                        <em className="fa icon-magnifier fa-3x" />
                                                    </div>
                                                    <div style={{ backgroundColor: '#f13430' }} className="col-9 py-3 d-flex align-items-center justify-content-center rounded-right btn-outline-light" >
                                                        <div className="h2  mt-0">Buscar documentos</div>
                                                        <div className="text-uppercase">{this.data}</div>
                                                    </div>                   
                                                </div>                                  
                                            </Link>                                                                
                                        </Row>                                         
                                    </div>

                                    <div className="text-center "> 
                                        <Row style={{ justifyContent: 'center', alignItems: 'center'}}>
                                            <Link to={"/cadastro"} style={{ color: '#fff',textDecoration: 'none' }}>
                                                <div style={{ "width": "250px" }} className="card flex-row align-items-center align-items-stretch border-0">
                                                    <div style={{ backgroundColor: '#d7130f' }} className="col-3 d-flex align-items-center justify-content-center rounded-left" >
                                                        <em className="fa fa-file fa-3x" />
                                                    </div>
                                                    <div style={{ backgroundColor: '#f13430' }} className="col-9 py-3 d-flex align-items-center justify-content-center rounded-right btn-outline-light" >
                                                        <div className="h2  mt-0">Cadastrar documentos</div>
                                                        <div className="text-uppercase">{this.data}</div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Row>        
                                    </div>
                                </Col>  
                        </CardBody>      
                    </Card>
                </Row>
            </div>
        </ContentWrapper>
        );
    }
}

export default withTranslation()(SearchResult);