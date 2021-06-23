import {useState} from "react"
import SingInSingUp from "./page/SingInSingUp"
import { ToastContainer } from "react-toastify"

export default function App() {

const [user, setUser] = useState({
  name : "edgar"
});

return(
  <div>
    {
      user ?(
        <div>
          <SingInSingUp/>

        </div>
      ):(
        <h1>no estas logueado</h1>
    )}
    <ToastContainer 
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
  </div>

)
 
}


