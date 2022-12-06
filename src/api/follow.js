import { API_HOST } from '../utils/constant';
import { getTokenApi } from './auth';


export function checkFollowApi(idUser){
    const url = `${API_HOST}consultaRelacion/${idUser}`;
    const params  ={
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenApi()}`
        }
    }

    return fetch(url,params)
        .then(response=>{
            return response.json()
        })
        .then(result =>{
            return result;
        })
        .catch(err=>{
            return err
        })
}

export function followUserApi(idUser){
    const url = `${API_HOST}altaRelacion/${idUser}`;
    const params  ={
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenApi()}`
        }
    }

    return fetch(url,params)
        .then(response=>{
            return response.json()
        })
        .then(result =>{
            return result;
        })
        .catch(err=>{
            return err
        })
}

export function unfollowUserApi(idUser){
    const url = `${API_HOST}bajaRelacion/${idUser}`;
    const params  ={
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenApi()}`
        }
    }

    return fetch(url,params)
        .then(response=>{
            return response.json()
        })
        .then(result =>{
            return result;
        })
        .catch(err=>{
            return err
        })
}

export function getFollowsApi(paramasUrl){
    const url = `${API_HOST}listaUsuario?${paramasUrl}`;
    
    const params  ={
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer${getTokenApi()}`
        }
    }

    return fetch(url,params).then(response=>{
        return response.json()
    }).then(result=>{
        return result
    }).catch(err=>{
        return err
    })
}