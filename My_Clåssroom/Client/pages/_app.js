import Top_Nav from '../components/Top_Nav';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../public/css/style.css';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {Provider} from '../context';

function My_App({Component, pageProps}){
    return(
        <Provider>
            <ToastContainer position="top-center" />
            <Top_Nav />
            <Component {...pageProps} />
        </Provider>
    );
     
}
export default My_App;