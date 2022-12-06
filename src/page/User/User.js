import React, { useState, useEffect}from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/userAuth';
import BasicLayout from '../../layout/BasicLayout';
import BannerAvatar from "../../componets/User/BannerAvatar";
import InfoUser from '../../componets/User/InfoUser/InfoUser';
import ListTweets from '../../componets/ListTweets';
import {getUserApi} from '../../api/user';
import { getUserTweetApi } from '../../api/tweet';

import "./User.scss";

export default function User({setRefresCheckLogin}) {
  const {id} =  useParams();
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState(null)
  const [page, setPage] = useState(1);
  const [loadingTweet, setLoadingTweet] = useState(false)

  const loggedUser = useAuth();

  useEffect(()=>{
    
    getUserApi(id)
    .then(response=>{
      if(!response){ toast.error('El usuario no existe');}
      setUser(response);
    }).catch((err)=>{
      toast.error('El usuario buscado no existe');
      console.log(err);
    })
   
  },[id])

  useEffect(()=>{
    getUserTweetApi(id,1).then(response =>{
      setTweets(response);
    }).catch(()=>{
      setTweets([])
    })
  },[id])

const moreData = ()=>{
  
  const pageTemp = page+1;
  setLoadingTweet(true);

  getUserTweetApi(id,pageTemp).then(response=>{
    
    if(!response.length){
      setLoadingTweet(0)

    }else{
      setTweets([...tweets, ...response]);
      setPage(pageTemp)
      setLoadingTweet(false);
    }
  })
}

  return (
      <BasicLayout className="user" setRefresCheckLogin={setRefresCheckLogin}>
          <div className='user_title'>
            <h2>
              {
                user.nombre !== undefined? `${user.nombre} ${user.apellidos}`:"Este usuario no existe"
              }
            </h2>
          </div>
           <BannerAvatar user={user}  loggedUser={loggedUser}/>
            <InfoUser user={user}/>
            <div className='user_tweets'>
              <h3> tweets</h3>
              {tweets && <ListTweets tweets={tweets}/>}  
              <Button
              onClick={moreData}
              >
                {!loadingTweet ? (
                  loadingTweet !==0 &&'Obtener mas Tweets'
                ):(
                  <Spinner
                    as="span"
                    animation="grow"
                    size='sm'
                    role="status"
                    arian-hidden ="true"
                  />
                )}
              </Button>
            </div>
      </BasicLayout>
  );
}

