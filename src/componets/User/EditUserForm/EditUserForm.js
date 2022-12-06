import React, { useState,useCallback } from 'react';
import { Form,Button,Row,Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import {useDropzone} from 'react-dropzone';
import { toast } from 'react-toastify';
import { API_HOST } from '../../../utils/constant';
import { Camara } from '../../../utils/Icons';
import { uploadBannerApi,uploadAvatarApi,updateInfoApi } from '../../../api/user';


import "./EditUserForm.scss";


export default function EditUserForm({user,setShowModal}) {

    const [formData, setFormData] = useState(initialValue(user));
    const [bannerUrl, setBannerUrl] = useState(
        user?.banner ? `${API_HOST}obtenerBanner/${user._id}`:null
    );
    const [bannerFile, setBannerFile] = useState(null);
    
    const [avatarUrl, setAvatarUrl] = useState(
        user?.avatar ? `${API_HOST}obtenerAvatar/${user._id}`:null
    );
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropBanner= useCallback(acceptedFile=>{
        const file = acceptedFile[0];
        setBannerUrl(URL.createObjectURL(file));
        setBannerFile(file);
    })

    const {getRootProps:getRootBannerProps ,getInputProps: getInputBannerProps} = useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard:true,
        multiple:false,
        onDrop:onDropBanner
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onDropAvatar =useCallback(acceptedFile=>{
        const file = acceptedFile[0];
        setAvatarUrl(URL.createObjectURL(file));
        setAvatarFile(file);
    })

    const {getRootProps:getRootAvatarProps,getInputProps: getInputAvatarProps} = useDropzone({
        accept:"image/jpeg, image/png",
        noKeyboard:true,
        multiple:false,
        onDrop:onDropAvatar
    })

    const onChange = e=>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        if(bannerFile){
            await uploadBannerApi(bannerFile)
            .catch(()=>{
                toast.error("Error al subir el nuevo banner");
            })
        }

        if(avatarFile){
            await uploadAvatarApi(avatarFile)
            .catch(()=>{
                toast.error("Error al subir el nuevo avatar");
            })
        }
       await  updateInfoApi(formData).then(()=>{
            toast.success("DATOS CAMBIADOS BINE")
            setShowModal(false);
        })
        .catch(()=>{
            toast.error("Error al cambiar los datos de usuario")
        })
        setLoading(false);
        window.location.reload();
    }

  return (
    <div className='edit-user-form'>
        <div 
            className='banner' 
            style={{backgroundImage:`url('${bannerUrl}')`}}
            {...getRootBannerProps()}
            >
                <input { ...getInputBannerProps()}/>
                <Camara/>
        </div>
        <div
            className='avatar'
            style={{backgroundImage:`url('${avatarUrl}')`}}
            {...getRootAvatarProps()}
        >
            <input { ...getInputAvatarProps()}/>
            <Camara/>
        </div>
        <Form onSubmit={onSubmit} >
            <Form.Group>
                <Row>
                    <Col>
                        <Form.Control 
                            type='text' 
                            placeholder='Nombre' 
                            name='nombre' 
                            defaultValue={formData.nombre}
                            onChange={onChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control 
                            type='text' 
                            placeholder='Apellidos' 
                            name='apellidos' 
                            defaultValue={formData.apellidos}
                            onChange={onChange}    
                        />
                    </Col>
                </Row>
            </Form.Group>
            <Form.Group>
                <Form.Control
                 as='textarea' 
                 row='3'
                 placeholder='Agregar tu biografia' 
                 type='text' 
                 name='biografia'
                 defaultValue={formData.biografia} 
                 onChange={onChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    type='text' 
                    placeholder='Sitio web' 
                    name='sitioWeb' 
                    defaultValue={formData.sitioWeb}
                    onChange={onChange}
                />
            </Form.Group>
            <Form.Group>
                <DatePicker
                    placeholder='Fecha de nacimiendo'
                    locale={es}
                    selected={new Date(formData.fechaNacimiento )}
                    onChange={value=>setFormData({...formData,fechaNacimiento:value})}
                />
            </Form.Group>
            <Button className='btn-submit' variant='primary' type='submit' disabled={loading}>
                {loading && <Spinner animation='border'size='sm'/> } Actualizar
            </Button>
        </Form>

    </div>
  )
}

function initialValue(user){
 
    return{
        nombre:user.nombre || "",
        apellidos: user.apellidos || "",
        biografia : user.biografia || "",
        ubicacion: user.ubicacion || "",
        sitioWeb: user.sitioWeb || "",
        fechaNacimiento: user.fechaNacimiento  || "",

    }
}
