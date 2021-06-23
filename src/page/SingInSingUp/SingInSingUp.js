import { useState } from 'react'
import { Container, Row, Col, Button} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch, faUser,faComment} from "@fortawesome/free-solid-svg-icons"
import BasicModal from "../../componets/Modal/BasicModal/";
import SingUpForm from "../../componets/SingUpForm";
import LogoW from "../../assests/png/logo-white.png";
import LogoTwi from "../../assests/png/logo.png";
import "./SingInSingUp.scss";

export default function SingInSingUp() {

  const [showModal,setShowModal]=useState(false);
  const [contentModal,setContentModal] = useState(null)

    const openModal = content =>{
      setShowModal(true);
      setContentModal(content)
    }  
    return (
      <>
        <Container className ="signin-sigup" fluid>
            <Row>
            <LeftComponent/>
            <RigthComponent
              openModal={openModal}
              setShowModal={setShowModal}
            />
            </Row>
        </Container>
        <BasicModal show={showModal} setShow={setShowModal}>
          {contentModal}

        </BasicModal>
      
      </>
    )
}


function LeftComponent() {
    return (
      <Col className="signin-signup__left" xs={6}>
        <img src={LogoTwi} alt="Twittor" />
        <div>
          <h2>
          <FontAwesomeIcon icon={ faSearch}></FontAwesomeIcon>
            Sigue lo que te interesa.
          </h2>
          <h2>
          <FontAwesomeIcon icon={ faUser}></FontAwesomeIcon>
            Entérate de qué está hablando la gente.
          </h2>
          <h2>
          <FontAwesomeIcon icon={ faComment}></FontAwesomeIcon>

            Únete a la conversación.
          </h2>
        </div>
      </Col>
    );
  }

function RigthComponent(props){
  const {openModal,setShowModal}= props
    return(
        <Col className="signin-signup_right" xs={6}>
          <div>
            <img src={LogoW} />
            <h2>
              Mira lo que está pasando en el mundo en este momento
            </h2>

            <h3>
              Únete a twichtor ahora mismo
            </h3>

            <Button 
            variant="primary"
            onClick={()=>openModal(<SingUpForm setShowModal={setShowModal}/>)}
            
            >
              Registrate
            </Button>
            <Button 
            variant="outline-primary"
            onClick={()=>openModal(<h2>Formulario de Login</h2>)}> 
              Iniciar sesión
            </Button>

          </div>
        </Col>
    )
}