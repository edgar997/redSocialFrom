import React,{useState,useEffect} from 'react';
import { Button,Spinner } from 'react-bootstrap';
import BasicLayout from "../../layout/BasicLayout";

import ListTweets from '../../componets/ListTweets/ListTweets';
import { getTweetsFollowsApi } from '../../api/tweet';

import "./Home.scss"

export default function Home({setRefresCheckLogin}) {

    const [tweets, setTweets] = useState(null);
    const [page, setPage] = useState(1)
    const [loadingTweets, setLoadingTweets] = useState(false);

    useEffect(() => {
        getTweetsFollowsApi(page).then(response=>{
           if(!tweets && response){
               setTweets( formatModel(response))

           }else{
               if(!response){
                   setLoadingTweets(0)
               }else{
                   setTweets([...tweets,...formatModel(response)]);
                   setLoadingTweets(false);
               }
           }
        }).catch(()=>{});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    const moreData = ()=>{
        setLoadingTweets(true);
        setPage(page+1);
    }
    
  return (
      <div>
          <BasicLayout className="home" setRefresCheckLogin={setRefresCheckLogin}>
            <div className='home_title'>
                <h2>Inicio</h2>
            </div>
            < ListTweets tweets={tweets}/>
            <Button onClick={moreData} className="load-more" >
                {!loadingTweets? (
                    loadingTweets !==0 && "Obtener mas Tweets"
                ):(
                    <Spinner
                        as="span"
                        animation='grow'
                        size="sm"
                        role='status'
                        aria-hidden="true"
                    />
                )}

            </Button>
          </BasicLayout>


      </div>
  )
}

function formatModel(tweets){
    const tweetsTemp = [];

    tweets.forEach(tweet=>{
        tweetsTemp.push({
            _id:tweet._id,
            userid:tweet.usuariorelacionid,
            mensaje:tweet.tweet.mensaje,
            fecha:tweet.tweet.fecha
        })
    })

    return tweetsTemp
}