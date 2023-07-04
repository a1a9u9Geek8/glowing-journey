import {useContext, useState} from 'react';
import {Context} from "../../context";
import {Button} from 'antd';
import axios from "axios";
import {SettingOutlined, UserSwitchOutlined, LoadingOutlined} from '@ant-design/icons';
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";
import Link from "next/link";


const Instructor = () => {
    //state
    const [loading, setLoading] = useState(false);
    const {
        state: {user},
    } = useContext(Context);

    return(
        <>
            <h1 className="jumbotron text-center square">
                Instructor
                <Link href="/instructor">
                        <a>Instructor</a>
                    </Link>
            </h1>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="py-4">
                            <UserSwitchOutlined className="display-1 pb-3"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Instructor;