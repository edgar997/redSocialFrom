import React,{useState} from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';
import {values,size} from "lodash";
import { toast } from 'react-toastify';
import {isEmailValid} from '../../utils/validations';
import {singInApi,setTokenApi} from '../../api/auth';







import "./SingInForm.scss";
export default function SingInForm(props) {
    const {setRefresCheckLogin} = props;
    const [formData,setFormData] = useState(initialFormValue() );
    const [singInLoading,setSingInLoading] = useState(false)
    const onSubmit = e =>{
        e.preventDefault();
        let validCount = 0;
        values(formData).some(value=>{
            
            value && validCount++
            return null
        })
        
        if(size(formData) !== validCount){
            toast.warning("completa todos los campos del formulario")
        }else{
            if(!isEmailValid(formData.email)){
                toast.warning("Email es invalido")
            }else{
                setSingInLoading(true);
                
                singInApi(formData)
                .then(response =>{
                    if(response.message){
                        toast.warning(response.message)
                    }else{
                        let token = response.token.split("Bearer")[1]
                        console.log(token);
                        setTokenApi(token);
                        setRefresCheckLogin(true)
                    }
                })
                .catch((e)=>{
                    console.log(e)
                    toast.error("Error del servidor, intentelo mas tarde")
                })
                .finally(()=>{
                    setSingInLoading(false)
                    toast.success("form OK...")
                })
            }
        }
        
        }
    const onChange = e =>{
        
        setFormData({ ...formData, [e.target.name]: e.target.value});
        

    };
  return (
        <div className='sing-in-form'>
            <h2>Entrar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control 
                    type="email" 
                    name='email'
                    placeholder="Correo electronico"
                    defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                    type="password" 
                    name='password'
                    placeholder="Contraseña"
                    defaultValue={formData.password}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {
                        !singInLoading ? "iniciar sesion": <Spinner animation="border" />
                    }
                </Button>
            </Form>
        </div>
    );
}


function initialFormValue(){
    return{
        email:"",
        password:""
    }
}
