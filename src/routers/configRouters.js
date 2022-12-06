import Home from "../page/Home";
import User from "../page/User";
import Error404 from "../page/Error404"
import Users from "../page/Users";
const router = [
    {
        path:"*",
        page:Error404
    },
    {
        path:"/users",
        exact: true,
        page: Users
    },
    {
        path:"/:id",
        exact: true,
        page: User
    },
    {
        path:"/",
        exact: true,
        page: Home
    },
    

];

export default router;