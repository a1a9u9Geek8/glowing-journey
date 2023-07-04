import {userEffect, useState} from "react";
//import {Context} from "../../context";
import axios from "axios";
import {useRouter} from "next/router";
import {SyncOutlined} from "@ant-design/icons";
import UserNav from '../nav/UserNav';


const UserRoute = ({children}) => {
    //state
    const [ok, setOk] =useState(false); 

    //router
    const router = useRouter();
   /*  const {
        state: {user},
    } = useContext(Context); */

    userEffect(() => { 
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const {data} = await axios.get("/api/current-user");
            //console.log(data);
            if(data.ok) setOk(true);
        } catch (err) {
            console.log(err);
            setOk(false);
            router.push("/login");  
        }
    };
    
return (
<>
    {!ok ? (
        <SyncOutlined spin classname="d-flex justify-content-center display-1 text-primary p-5"/>
    ) : ( 
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav/>
                </div>
                <div className="col-md-10">{children}</div>
            </div>
        </div>
    )}
    </>
    );

};

export default UserRoute;