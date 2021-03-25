import React from 'react';
import { withNamespaces, Trans } from 'react-i18next';
import ContentWrapper from '../Layout/ContentWrapper';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Button, Form, FormGroup, Label, FormText, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import MaskedInput from 'react-input-mask'
import qs from "qs";
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import ResultCard from "../Comp/ResultCard"
import UploadFiles from "../Comp/UploadFiles";

import db from "../../db/db"

import Swal from '../Comp/Swal';
import SwalDoc from '../Comp/SwalDoc';

class Cadastro extends React.Component {

    constructor(props, state) {
        super(props)
        this.state = {
            dropdownOpen: false,
            form: {
                tipo: "",
                numeracao: "",
                data: "",
                dataFinal: "",
                ocr: "ficha de alguem com um testo lid erado pero ocr\n\nmuto errao ese ocr",
                txt: [],
                validation: {
                    tipo: false,
                    numeracao: false,
                    data: false,
                    dataFinal: false,
                    validation: false
                }
            }
        }

        if (qs.parse(this.props.location.search, { ignoreQueryPrefix: true })["tipo"] != undefined) {
            this.state.form["tipo"] = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })["tipo"]
        }
    }

    changeHandler = async (e) => {
        try {
            e.target.value = e.target.value.format('DD/MM/YYYY')
        } catch (error) {
        }
        console.log("changeHandler")
        console.log(e)
        console.log(this.state)
        console.log(e.target)
        console.log(e.target.name)
        console.log(e.target.value)
        await this.setState({ form: { ...this.state.form, [e.target.name]: e.target.value } });
        console.log(this.state.form.ocr)
        this.validateTeste();
    }

    validateTeste = async () => {

        if (this.state.form.tipo === "") {
            await this.setState({ form: { ...this.state.form, validation: { ...this.state.form.validation, tipo: false } } });
        } else {
            await this.setState({ form: { ...this.state.form, validation: { ...this.state.validation, tipo: true } } });
        }
        if (this.state.form.numeracao === "") {
            await this.setState({ form: { ...this.state.form, validation: { ...this.state.form.validation, numeracao: false } } });
        } else {
            await this.setState({ form: { ...this.state.form, validation: { ...this.state.form.validation, numeracao: true } } });
        }
        if (this.state.form.data === "") {
            await this.setState({ form: { ...this.state.form, validation: { ...this.state.form.validation, data: false } } });
        } else {
            await this.setState({ form: { ...this.state.form, validation: { ...this.state.form.validation, data: true } } });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let tipo = this.state.form.validation.tipo
        let numeracao = this.state.form.validation.numeracao
        let data = this.state.form.validation.data
        let dataFinal = this.state.form.validation.dataFinal

        if (tipo && numeracao && data) {
            let form = Object.assign({}, this.state.form);
            delete form.validation
            let query = qs.stringify(form)
            this.props.history.push('/inicio?' + query);
        }
    }

    componentDidMount() {
        this.validateTeste()
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    componentDidMount() {
        this.validateTeste()
    }

    getOcr = () => {
        db.getOcr().then(resultados => {
            this.setState({ form: { ...this.state.form, txt: resultados.pages } })
        })
    }

    renderInput(props) {
        return (
            <>
                <MaskedInput {...props} className="form-control" mask="99/99/9999" maskChar="" name="expiry" placeholder="dd/mm/aaaa" style={{ minWidth: 182 }}>
                    {(inputProps) => <Input {...inputProps} />}
                </MaskedInput>
                <FormFeedback valid>Tudo Ok</FormFeedback>
                <FormFeedback>Campo Obrigatório</FormFeedback>
            </>
        );
    }

    render() {
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>{this.titulo} {this.state.form.tipo.toUpperCase()}</div>
                </div>
                <Row style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Col xl={3} md={6} className="text-center">
                        <FormGroup>
                            <Label for="exampleSelect">Tipo de Documento*</Label>
                            <Input
                                type="select"
                                name="tipo"
                                id="tipo"
                                value={this.state.form.tipo}
                                valid={this.state.form.validation.tipo}
                                invalid={!this.state.form.validation.tipo}
                                onChange={this.changeHandler}
                            >
                                <option disabled value="">Escolha o tipo</option>
                                <option value="bga">BGA</option>
                                <option value="bgo">BGO</option>
                                <option value="bir">BIR</option>
                                <option value="diario">Diário Oficial</option>
                                <option value="ficha">Ficha</option>
                                <option value="relatorio">Relatório de Processos</option>
                            </Input>
                            <FormFeedback valid>Tudo Ok</FormFeedback>
                            <FormFeedback>Campo Obrigatório</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xl={3} md={6} className="text-center">
                        <FormGroup>
                            <Label for="numeracao">Numeração*</Label>
                            {/* <Input
                                placeholder="digite aqui ..."
                                name="numeracao"
                                id="numeracao"
                                valid={this.state.form.validation.numeracao}
                                invalid={!this.state.form.validation.numeracao}
                                value={this.state.form.numeracao} onChange={this.changeHandler}
                                {renderInput({}, "")}

                            /> */}
                            {/* {this.renderInput({placeholder: "digite aqui..."}, "999/9999")} */}

                            <MaskedInput
                                className="form-control" 
                                mask="999/9999" maskChar="" 
                                name="expiry" 
                                placeholder="digite aqui ..." 
                                style={{ minWidth: 182 }}
                                name="numeracao"
                                id="numeracao"
                                valid={this.state.form.validation.numeracao}
                                invalid={!this.state.form.validation.numeracao}
                                value={this.state.form.numeracao} onChange={this.changeHandler}>
                                {(inputProps) => <Input {...inputProps} />}
                            </MaskedInput>
                            <FormFeedback valid>Tudo Ok</FormFeedback>
                            <FormFeedback>Campo Obrigatório</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col xl={3} md={6} className="text-center" >
                        <FormGroup>
                            <Label for="data">Data*</Label>
                            <Datetime
                                dateFormat="DD-MM-YYYY"
                                timeFormat={false}
                                name="data"
                                id="data"
                                value={this.state.form.data} onChange={moment => this.changeHandler({ target: { name: "data", value: moment } })}
                                inputProps={{ valid: this.state.form.validation.data, invalid: !this.state.form.validation.data, value: this.state.form.data, autocomplete: "off" }}
                                renderInput={this.renderInput}
                            />
                            <FormFeedback valid>Tudo Ok</FormFeedback>
                            <FormFeedback>Campo Obrigatório</FormFeedback>
                        </FormGroup>
                    </Col>
                </Row>
                <Row style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Col xl={5} md={8} className="text-center" >
                        <UploadFiles />
                    </Col>
                </Row>
                <Button onClick={this.getOcr} >Extrair texto</Button>
                <hr />
                {/* <Swal options={{
                    width: "80%",
                    showConfirmButton: true,
                    showCloseButton: true,
                    html: (<SwalDoc value={this.state.form.ocr} img="https://i.pinimg.com/originals/63/0e/e9/630ee90be2c9956a1c10bdb000108841.png" changeHandler={this.changeHandler} />)
                }} className="btn">
                    <img src="https://i.pinimg.com/originals/63/0e/e9/630ee90be2c9956a1c10bdb000108841.png" height="300" />
                </Swal> */}
                {this.state.form.txt.map((document, index) => {

                    return (
                        <Swal options={{
                            width: "80%",
                            showConfirmButton: true,
                            showCloseButton: true,
                            html: (<SwalDoc n={index} value={document.txt} img={document.img} changeHandler={this.changeHandler} />)
                        }} className="btn">
                            <img src={document.thumb} height="300" />
                        </Swal>
                    )
                })}
            </ContentWrapper>
        );
    }
}

export default withNamespaces('translations')(Cadastro);