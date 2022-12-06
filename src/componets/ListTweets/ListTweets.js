import React,{useState,useEffect} from 'react';
import { Image } from 'react-bootstrap';
import { map } from 'lodash';
import moment from 'moment';
import AvatarNoFound from '../../assests/png/avatar-no-found.png';
import { API_HOST } from '../../utils/constant';
import { getUserApi } from '../../api/user';
import { replaceURLWithHTMLLinks } from '../../utils/functions';

import "./ListTweets.scss";

export default function ListTweets({tweets}) {
  return (
    <div className='list-tweets'>
        {
            map(tweets,(tweet,index)=>(
                <Tweet key={index} tweet={tweet}/>
                ))
        }
    </div>
  )
}


function Tweet({tweet}){
    const [userInfo, setUserInfo] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null)
    useEffect(() => {
        getUserApi(tweet.userid).then(response=>{
            setUserInfo(response)
            setAvatarUrl(
                response?.avatar ? `${API_HOST}obtenerAvatar/${response._id}`:AvatarNoFound
            );
        })
    
    }, [tweet])
    
    
    return (
        <div className='tweet'>
            <Image className='avatar' src={avatarUrl} roundedCircle/> 

            <div>
                <div className='name'>
                    {userInfo?.nombre } { userInfo?.apellidos}
                    <span>{moment(tweet.fecha).calendar()}</span>
                </div>
                <div>
                    <div 
                        dangerouslySetInnerHTML={{__html:replaceURLWithHTMLLinks(tweet.mensaje)}}
                    />
                </div>
            </div>   
        </div>
    )
}
