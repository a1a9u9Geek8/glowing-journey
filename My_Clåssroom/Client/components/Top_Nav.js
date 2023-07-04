import {useState, useEffect, useContext} from "react";
import { Menu } from 'antd';
import Link from "next/link";
import {
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
  CoffeeOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {Context} from "../context";
import axios from "axios";
import { toast } from "react-toastify";
import {useRouter} from "next/router";


const {Item, SubMenu, ItemGroup } = Menu;

const Top_Nav = () => {
    const [current, setCurrent] =useState("");

    const {state, dispatch} = useContext(Context);
    const {user} = state;

    const router = useRouter();

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname);
       // console.log(window.location.pathname);
    }, [process.browser && window.location.pathname]);

    const logout = async () => {
        dispatch({type: "LOGOUT"});
        window.localStorage.removeItem("user");
        const {data} = await axios.get("/api/logout"); // make request to axios
        toast(data.message);
        router.push("/login");
    }

    return(
        <Menu mode="horizontal" selectedKeys={[current]}>
            <Item key="/" 
            onClick={(e) => setCurrent(e.key)}
            icon={<HomeOutlined/>}>

                <Link href="/">
                    <a>My_Classroom</a>
                </Link>
            </Item>

        {user && user.role && user.role.includes("Instructor") ? (
            <Item
            key="/instructor/course/create"
            onClick={(e) => setCurrent(e.key)}
            icon={<CarryOutOutlined />}
        >
        <Link href="/instructor/course/create">
            <a>Create Course</a>
        </Link>
        </Item>
 ) : (
            <Item 
            key="/user/instructor"
            onClick={(e) => setCurrent(e.key)}
            icon={<TeamOutlined/>}
            >
            <Link href="/login">
                <a>Instructor</a>
            </Link>
            </Item>     
        )}

             
        {user ===null && (
            <>
             <Item key="/login" 
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined/>}>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Item>

            <Item key="/register" 
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined/>}>

                <Link href="/register">
                    <a>Register</a>
                </Link>
            </Item>
            </>
        )}
        {user !== null && (
          <SubMenu 
            icon={<CoffeeOutlined/>} 
            title={user && user.name} className="float-right">

            <ItemGroup>
            <Item key="/user">
                <Link href="/user">
                    <a>Dashboard</a>
                </Link>
            </Item> 
            <Item onClick={logout} 
                icon={<LogoutOutlined/>} className="float-right">
                Logout    
            </Item> 
            </ItemGroup>
           </SubMenu>
             
        )}
        </Menu>
    ); 
};

export default Top_Nav;
