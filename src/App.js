import {useState, useEffect} from "react"
import SingInSingUp from "./page/SingInSingUp"
import { ToastContainer } from "react-toastify"
import {AuthContext} from './utils/context';
import { isUserLoguerApi } from "./api/auth";
import Routing from "./routers/Routing";

export default function App() {

const [user, setUser] = useState(null);
const [loadUsers,setLoadUsers] = useState(false);
const [refresCheckLogin,setRefresCheckLogin] = useState(false)

useEffect(()=>{
  setUser(isUserLoguerApi())
  setRefresCheckLogin(false)
  setLoadUsers(true)
},[refresCheckLogin])
if(!loadUsers) return null;
return(
  <AuthContext.Provider value={user}>
    {
      !user ?(
        <div>
          <SingInSingUp setRefresCheckLogin={setRefresCheckLogin}/>

        </div>
      ):(
        <Routing setRefresCheckLogin={setRefresCheckLogin} />
    )}
    <ToastContainer s
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </AuthContext.Provider>

)
 
}


