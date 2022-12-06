import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftMenu from '../../componets/LeftMenu/LeftMenu';

import "./BasicLayout.scss"

export default function BasicLayout({className, setRefresCheckLogin,children}) {
  return (
       <Container className={`basic-layout ${className}`}>
           <Row>
               <Col xs={3} className='basic-layout_menu'>
                   <LeftMenu setRefresCheckLogin={setRefresCheckLogin}/>
               </Col>
               <Col xs={9} className='basic-layout_content'>
                   {children}
               </Col>
           </Row>

       </Container>
    );
}
