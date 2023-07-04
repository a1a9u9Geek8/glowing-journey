import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import {Context} from "../context";
import {useRouter} from "next/router";
import user from "../../server/models/user";


const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);


const {
    state:{user},
} = useContext(Context);
const router = useRouter();

useEffect(() => {
    if(user !== null) router.push("/");

}, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
    //    console.table({name, email, password});
        try {
            setLoading(true);
            const {data} = await axios.post(`api/register`, {
            name,
            email,
            password,
    });
        //console.log("REGISTER RESPONSE", data);
        toast("Registration complete. Please Login.")
        setLoading(false);
        } catch (err) {
            toast.error(err.response.data);  
            setLoading(false);
        }        
    };

    return(
        <>  
            <h1 className="jumbotron text-center bg-primary square">Register</h1>

            <div className="container col-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-4 p-4" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required/>

                    <input type="email" className="form-control mb-4 p-4" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email"
                    required
                    />

                    <input type="password" className="form-control mb-4 p-4" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required/>

                    <button type="submit" className="btn btn-block btn-primary btn-center col-4 offset-md-4  p-2" disabled={!name || !email || !password || loading}>
                        {loading ? <SyncOutlined spin />: "Submit"}
                    </button>
                </form> 

                <p className="text-center p-3">
                    Already Registered?{""}
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </p> 
            </div>
        </>
    );
};
export default Register;