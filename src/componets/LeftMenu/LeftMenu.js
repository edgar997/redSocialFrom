import React, { useState} from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faUser,
    faUsers,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import TweetModal from '../Modal/TweetModal/TweetModal';
import { logoutApi } from "../../api/auth";
import userAuth from '../../hooks/userAuth';
import Logowhite from '../../assests/png/logo-white.png';

import "./LeftMenu.scss";

export default function LeftMenu({setRefresCheckLogin}) {

    const [showModal, setShowModal] = useState(false);

    const user = userAuth();

    const logout =()=>{
        logoutApi();
        setRefresCheckLogin(true);
    }
  return (
      <div className='left-menu'>
          <img className='logo' src={Logowhite} alt="algo"/>

          <Link to="/">
              <FontAwesomeIcon icon={faHome}/>
              Inicio
          </Link>
          <Link to="/users">
              <FontAwesomeIcon icon={faUsers}/>
              Usuarios
          </Link><Link to={`/${user?._id}`}>
              <FontAwesomeIcon icon={faUser}/>
              Perfil
          </Link><Link to="" onClick={logout}>
              <FontAwesomeIcon icon={faPowerOff}/>
              Cerra sesion
          </Link>

          <Button onClick={()=>{setShowModal(true)}} > Twittoar</Button>
          <TweetModal show={showModal} setShow={setShowModal} />
      </div>
  );
}
