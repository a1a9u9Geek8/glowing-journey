import { useState, useContext, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import {Context} from "../context";
import {useRouter} from "next/router";


const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

//access to state
const {
    state:{user},
    dispatch,
} = useContext(Context);
 //dicpatch to allow state
//console.log("State", state);

//router
const router = useRouter();

useEffect(() => {
    if(user !== null) router.push("/");
}, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    //    console.table({name, email, password});
        try {
            setLoading(true);
            const {data} = await axios.post(`api/login`, {
            email,
            password,
    });
       // console.log("LOGIN RESPONSE", data);
       //dispatching the data and the type of dispatch
       dispatch({
         type: "LOGIN",
         payload: data, 
       });
       //save in local storage
       window.localStorage.setItem('user', JSON.stringify(data));
       //redirect user
       router.push("/user");

        //toast("login completed")
       // setLoading(false);
        } catch (err) {
            toast.error(err.response.data);  
            setLoading(false);
        }        
    };

    return(
        <>  
            <h1 className="jumbotron text-center bg-primary square">Login</h1>
            <br></br>

            <div className="container col-4 offset-md-4 pb-5">
                 <form onSubmit={handleSubmit}>
                    <input type="email" className="form-control mb-4 p-4" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email"
                    required
                    />

                    <input type="password" className="form-control mb-4 p-4" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required/>

                    <button type="submit" className="btn btn-block btn-primary btn-center col-4 offset-md-4  p-2" disabled={!email || !password || loading}>
                        {loading ? <SyncOutlined spin />: "Submit"}
                    </button>
                </form> 

                <p className="text-center pt-3">
                    Not yet Registered?{" "}
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </p> 

                <p className="text-center p-3">
                    <Link href="/reset-password">
                        <a className="text-danger">Reset Password</a>
                    </Link>
                </p> 


            </div>
        </>
    );
};
export default Login;

