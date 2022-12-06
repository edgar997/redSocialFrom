
import { API_HOST,TOKEN } from "../utils/constant";
import jwtDecode from "jwt-decode";

export const methos = (body="",method,token="")=>{
    if(method === "post" || method === "POST"){
        return {
            method: "POST",
            redirect:'follow',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(body)
        };
    }else if(method === "get" || method === "GET"){
        return{
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer${token}`
            },
        }
    }
}
export function singUpApi(user){
    const url = `${API_HOST}registro`;
    const userTemp = {
        ...user,
        email:user.email.toLowerCase(),
        fechaNacimiento: new Date()
    };

    delete userTemp.repeatPassword;
    const params = {
        method: "POST",
        redirect:'follow',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(userTemp)
    };
    return fetch(url,params)
    .then(response=>{
        
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }

        return { code : 404, message: "Email invalido."}
    })
    .catch(err=>{
        return err;
    })
     
}

export function singInApi(user){
    const url = `${API_HOST}login`;
    const data = {
        ...user,
        email: user.email.toLowerCase()
    }
    const params = methos(data,"post");
    
    return fetch(url,params)
    .then(response=>{
        if(response.status >= 200 && response.status < 300){
            return response.json();
        }

        return { message: "Usuario o contraseña incorrecta."}
    })
    .catch(err=>{
        return err;
    });
    
}

export function setTokenApi(token){
    localStorage.setItem(TOKEN,token);
}


export function getTokenApi(){
    return localStorage.getItem(TOKEN);
}
export function logoutApi(){
    localStorage.removeItem(TOKEN)
}

export function isUserLoguerApi(){
    const token = getTokenApi();

    if(!token){
        logoutApi()
        return null
    }
    if(isExpired(token)){
        logoutApi( )
    }
    return(jwtDecode(token));
}



function isExpired(token){
    const { exp } = jwtDecode(token);
    const expire = exp *1000;
    const timeout = expire - Date.now(); 
    if(timeout < 0){
        return true;
    }
    return false;

}