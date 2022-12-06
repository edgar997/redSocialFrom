import { API_HOST } from "../utils/constant";
import { getTokenApi , methos} from "./auth";



export function getUserApi(id){
    
    const url = `${API_HOST}verperfil/${id}`;
   
    const params = methos('','get',getTokenApi());

    return fetch(url,params)
    .then(response =>{
        if(response.status >= 200 && response.status < 300){
           
            return response.json();
        }
        if(response.status >= 400) throw null;
       
    })
    .catch(err=>{
        return err;
    })
}


export function uploadBannerApi(file){
    const url = `${API_HOST}subirBanner`;
    const formData = new FormData();
    formData.append('banner',file);
    const params ={
        method: "POST",
        headers:{
            Authorization: `Bearer${getTokenApi()}`
        },
        body:formData
    }

    return fetch(url,params)
        .then(response =>{
            return response.json();
        })
        .then(result =>{
            return result;
        })
        .catch(err=>{
            return err;
        })
}

export function uploadAvatarApi(file){
    const url = `${API_HOST}subirAvatar`;
    const formData = new FormData();
    formData.append('avatar',file);
    const params ={
        method: "POST",
        headers:{
            Authorization: `Bearer${getTokenApi()}`
        },
        body:formData
    }

    return fetch(url,params)
        .then(response =>{
            if(response.status >= 200 && response.status < 300){
           
                return response.json();
            }
            if(response.status >= 400) throw null;
        })
        .then(result =>{
            return result;
        })
        .catch(err=>{
            return err;
        })
}

export function updateInfoApi(data){
    const url = `${API_HOST}modificarPerfil`;
    console.log(data)
    const params= {
        method:'PUT',
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenApi()}`
        },
        body:JSON.stringify(data)
    }

    return fetch(url,params)
        .then(response=>{
            return response;
        })
        .catch(err=>{
            return err;
        })
}

