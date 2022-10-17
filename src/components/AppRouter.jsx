import {Routes, Route} from 'react-router-dom'
import {publicRoutes, privateRoutes} from '../router/routes';
import Posts from '../pages/Posts';
import Login from '../pages/Login';
import { useContext } from 'react';
import { AuthContext } from '../context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ?
        <Routes>
              {privateRoutes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path}
                    element={<route.element/>}
                />
            )}
            <Route path="/*" element={<Posts/>}/>  
        </Routes>

        :

        <Routes>
            {publicRoutes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path}
                    element={<route.element/>}
                />
            )}
            <Route path="/*" element={<Login/>}/>  
        </Routes>
    )
}

export default AppRouter;