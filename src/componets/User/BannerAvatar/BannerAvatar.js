import React,{useState,useEffect} from 'react';
import { Button } from 'react-bootstrap';
import ConfigModal from '../../Modal/ConfigModal/ConfigModal';
import EditUserForm from '../../User/EditUserForm';
import AvatarNoFound from "../../../assests/png/avatar-no-found.png";
import { API_HOST } from '../../../utils/constant';
import { checkFollowApi,followUserApi,unfollowUserApi} from '../../../api/follow';

import "./BannerAvatar.scss";

export default function BannerAvatar({user,loggedUser}) {
   const [showModal,setShowModal] = useState(false);
    const [following, setFollowing] = useState(null);
    const [reloadFollow, setReloadFollow] = useState(false);


   const bannerUrl = user.banner ? `${API_HOST}obtenerBanner/${user._id}`:null;
   const avatarUrl = user.avatar ? `${API_HOST}obtenerAvatar/${user._id}`: AvatarNoFound;
   useEffect(() => {
       if(user){
           checkFollowApi(user?._id).then(response=>{
              console.log(response?.status)
              if(response?.status){
                   setFollowing(true);
               }else{
                   setFollowing(false);
               }
               setReloadFollow(false);
            })


    }
   }, [user,reloadFollow])

   const onFollow = ()=>{
       console.log(user._id)
        followUserApi(user._id).then((res)=>{
            console.log(res)
          setFollowing(true)
        })
   }
   const onUnFollow = ()=>{
       unfollowUserApi(user._id).then(()=>{
           setReloadFollow(true);
       })
   }
   
  return (
    <div 
        className='banner-avatar' 
        style={{backgroundImage:`url('${bannerUrl}')`}}
    >
        <div 
            className='avatar' 
            style={{backgroundImage:`url('${avatarUrl}')`}}
        >
        </div>        
            {
                user &&(
                    <div className='options'>
                        {loggedUser._id === user._id && (<Button onClick={()=>setShowModal(true)}>Editar perfil</Button>)}
                        {loggedUser._id !== user._id &&(
                            following !== null &&(
                                
                                following ?(
                                    <Button onClick={onUnFollow} className="unfollow">
                                        <span>
                                            Siguiendo
                                        </span>
                                    </Button>
                                ):(
                                    <Button onClick={onFollow}>Seguir</Button>
                                )
                            )
                        )}
                    </div>
                )
            }
        <ConfigModal show={showModal} setShow={setShowModal} title="Editar perfil">
           <EditUserForm user={user} setShowModal={setShowModal}/>
        </ConfigModal>
    </div>
  )
}
