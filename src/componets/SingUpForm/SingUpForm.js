
import {Row,Col,Form, Button,Spinner} from "react-bootstrap";
import{useState} from "react";
import {values,size} from 'lodash';
import {toast} from "react-toastify"

import {isEmailValid} from "../../utils/validations"
import { singUpApi } from "../../api/auth";

import "./SingUpForm.scss";
export default function SingUpForm(props){

    const {setShowModal} = props;
    const [formData, setFormData]= useState(initialFormValue())
    const [singUpLoading, setSingUpLoading] = useState(false)
    const onSubmit = e=>{
        e.preventDefault()
        
        let validCount = 0
        
        values(formData).some(value=>{
            value && validCount++
            return null
        })
        if (validCount !== size(formData) ){
            setShowModal(true);
            toast.warning("Completa todos los campos del formulario")
        }else{
            if(!isEmailValid(formData.email)){
                toast.warning("Email invalido")
            setShowModal(true);

            }else if(formData.password !== formData.repeatPassword){
                setShowModal(true);
                toast.warning("Las contraseñas tienen que ser  iguales")
            }else if(size(formData.password) < 5 ){
                setShowModal(true);
                toast.warning("la contraseña tiene que ser mayor a 6")

            }else{
                setSingUpLoading(true)
                singUpApi(formData)
                .then(response =>{
                    if(response.code){
                        toast.warning(response.message);
                    }else{
                        toast.success("El registo ha sido correcto");
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                })
                .catch(()=>{
                    toast.error("Error del servidor, intentelo mas tarde")
                })
                .finally(()=>{
                    setSingUpLoading(false)
                });
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
                                name ="apellidos"
                                type="text"
                                placeholder="Apellidos"
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
                    {!singUpLoading ? "Registrate": <Spinner animation="border"/>}
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue(){
    return{
        nombre: "",
        apellidos:"",
        email:"",
        password:"",
        repeatPassword:""
    }
}