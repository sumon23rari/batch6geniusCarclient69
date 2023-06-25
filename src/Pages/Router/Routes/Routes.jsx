import { createBrowserRouter } from "react-router-dom";
import Layout from "../../../LayOut/Layout";
import Home from "../../Home/Home/Home";
import LogIn from "../../logIn/LogIn";
import Register from "../../logIn/Register";
import CheckOut from "../../CheckOut/CheckOut";
import Orders from "../../Orders/Orders";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout></Layout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:"/logIn",
                element:<LogIn></LogIn>
            },
            {
                path:"/register",
                element:<Register></Register>
            },
            {
                path:"/checkout/:id",
                element:<PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
                loader:({params})=>fetch(`https://batch6genius-car-server-69.vercel.app/services/${params.id}`)
            },
            {
                path:'/orders',
                element:<PrivateRoute><Orders></Orders></PrivateRoute>
            }
        ]
    },
])
export default router;