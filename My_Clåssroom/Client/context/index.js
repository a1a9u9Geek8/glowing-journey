import {useReducer, createContext, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/router";

//import fs from "fs";

//app.use(fs());


//initial state; //the user is empty
const initialState = {
    user: null,
};

//create context
const Context = createContext()

//root reducer
const rootReducer = (state, action) => {
    switch(action.type) { //use swicth to get a current state of a user 
        case "LOGIN":
            return {...state, user: action.payload}; //return the action type in the current state
        case "LOGOUT":
            return{...state, user: null}; //where user is empty based of the previos action return state
        default: //else user unchanged
            return state; 
    }
};

//context provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    //router
    const router = useRouter();

    useEffect(() => {
        dispatch({
            type: "LOGIN",
            payload: JSON.parse(window.localStorage.getItem("user")),
        });

    }, []);

    axios.interceptors.response.use(
        function(response) {
            //any status code that lie wuthin the range of 200 cause this function
            //to trigger
            return response;

        },
        function (error) {
            //any status code that falls outside of the 200 range then this function activate
            let res = error.response;
            if(res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.get('/api/logout')
                    .then((data) => {
                        console.log("/401 error > logout")
                        dispatch({type: 'LOGOUT'})
                        window.localStorage.removeItem("user");
                        Router.push("/login");
                    
                    })
                    .catch((err) => {
                        console.log("AXIOS INTERCEPTOR ERR", err);
                        reject(error);
                    });
                });
                //
            }
            return Promise.reject(error);
        }
    );

    useEffect(() => {
        const getCsrfToken = async () => {
            const {data} = await axios.get('api/csrf-token')
            console.log('CSRF', data);
            axios.defaults.headers['X-CSRF-Token'] = data.getCsrfToken;
        };
        getCsrfToken();
    }, []);

    return(
    <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
    );
};

export { Context, Provider };