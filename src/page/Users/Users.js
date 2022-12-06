import React,{useEffect,useState} from "react";
import { useLocation, useNavigate} from "react-router-dom";
import queryString from "query-string";
import {isEmpty} from "lodash"
import {useDebouncedCallback} from "use-debounce";
import { Spinner,ButtonGroup,Button } from "react-bootstrap"
import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../componets/ListUsers/ListUsers";
import { getFollowsApi } from "../../api/follow";

import "./Users.scss";

export default function Users({setRefresCheckLogin}) {
    const [users, setUsers] = useState(null);
    const navigate = useNavigate()
 const query  = (useLocation()).search
    const params = useUsersQuery(useLocation());
    const [typeUser, setTypeUser] = useState(params.type|| "follow");
    const [btnLoading, setBtnLoading] = useState(false)
    const onSearch =useDebouncedCallback(value=>{
        setUsers(null)
        navigate({search : queryString.stringify({...params, search:value,page:1})})
    },200)

    useEffect(() => {
        getFollowsApi(queryString.stringify(params))
        .then(response=>{
            // eslint-disable-next-line eqeqeq
            if(params.page == 1){
                if(isEmpty(response)){
                    setUsers([])
                }else{

                    setUsers(response)
                }
            }else{
                if(!response){
                    setBtnLoading(0)
                }else{
                    setUsers([...users,...response]);
                    setBtnLoading(false)
                }
            }
        })
        .catch(()=>{
            setUsers([])
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])
    
    const onChangetype = type =>{
        setUsers(null);
        if(type==="new"){
            setTypeUser("new")
        }else{
            setTypeUser("follow")
        }

        navigate({search : queryString.stringify({typeUser:type,page:1,search:""})})
    }

    const moreData = ()=>{
        setBtnLoading(true);
        const newPage = parseInt(params.page)+1;
        navigate({search: queryString.stringify({...params, page: newPage})});
    }
  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefresCheckLogin={setRefresCheckLogin}
    >
      <div className="users_title">
        <h2>Usuarios</h2>
        <input type="text" placeholder="Busca un usuario" onChange={(e)=>{
            onSearch(e.target.value)
        }} />
      </div>
      <ButtonGroup className="users_options">
        <Button
          className={typeUser === "follow" && "active"}
          onClick={() => {
            onChangetype("follow");
          }}
        >
          Siguiendo
        </Button>
        <Button
          className={typeUser === "new" && "active"}
          onClick={() => {
            onChangetype("new");
          }}
        >
          Nuevos
        </Button>
      </ButtonGroup>

      {!users ? (
        <div className="users_loading">
          <Spinner animation="border" variant="info" />
          Buscando usuarios
        </div>
      ) : (
          <>
          
          <ListUsers users={users} />
          <Button onClick={moreData} className="load-more" >
              { !btnLoading ? (
                  btnLoading !== 0 && "Cargar mas usuarios" 
                ) : ( 
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                )
            }
            </Button>
          </>
      )}
    </BasicLayout>
  );
}


function useUsersQuery(location){
    const {page=1,typeUser="follow",search} = queryString.parse(location.search);

    return{page,typeUser,search}
}