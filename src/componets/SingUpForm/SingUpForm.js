
import {Row,Col,Form, Button,Spinner} from "react-bootstrap";
import{useState} from "react";
import {values,size} from 'lodash';
import {toast} from "react-toastify"

import {isEmailValid} from "../../utils/validations"

import "./SingUpForm.scss";
export default function SingUpForm(props){

    const {setShowModal} = props;
    const [formData, setFormData]= useState(initialFormValue())
    const onSubmit = e=>{
        console.log(formData)
        e.preventDefault()
        setShowModal(false);
        
        let validCount = 0

        values(formData).some(value=>{
            value && validCount++
            return null
        })
        if (validCount !== size(formData) ){
            toast.warning("Completa todos los campos del formulario")
        }else{
            if(!isEmailValid(formData.email)){
                toast.warning("Email invalido")
            }else{
                toast.success("Form OK.")
            }

        }

    }

    const onChange = e =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    return(
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2> 
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                name ="nombre"
                                type="text"
                                placeholder="Nombre"
                                defaultValue={formData.nombre}
                                
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name ="apellido"
                                type="text"
                                placeholder="Apellido"
                                defaultValue={formData.apellido}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group>
                    <Form.Control name ="email" type="email" placeholder="Correo electronico" defaultValue={formData.email} />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                name ="password"
                                type="password"
                                placeholder="Contraseña"
                                defaultValue={formData.password}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                name ="repeatPassword"
                                type="password"
                                placeholder="Repetir contraseña"
                                defaultValue={formData.repeatPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Registrate
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue(){
    return{
        nombre: "",
        apellido:"",
        email:"",
        password:"",
        repeatPassword:""
    }
}