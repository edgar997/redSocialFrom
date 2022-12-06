import React from 'react';
import { Media, Image } from 'react-bootstrap';
import {Link} from "react-router-dom";
import { API_HOST } from '../../utils/constant';
import AvatarNoFount from "../../assests/png/avatar-no-found.png"


export default function User({user}) {
  return (
    <Media as={Link} to={`/${user._id}`} className="list-users_user">
        <Image
            width={64}
            height={64}
            roundedCircle
            className='mr-3'
            src={
                user?.avatar
                    ?`${API_HOST}obtenerAvatar/${user._id}`
                    :AvatarNoFount
            }
            alt={`${user.nombre} ${user.apellidos}`}
        />
        <Media.Body>
            <h5>
               { `${user.nombre} ${user.apellidos}`}
            </h5>
            <p>{user?.biografia}</p>
        </Media.Body>
    </Media>
  )
}
