import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export interface AuthState {
  isLoggedIn : boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined
}

export const AuthProvider: FC<PropsWithChildren<Props>> = ({ children }) => {

  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE );
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async() => {
    
    if ( !Cookies.get('token') ) return;

    try {
      const { data } = await tesloApi.get('/user/validate-jwt');
      const { token, user } = data;

      Cookies.set('token', token);

      dispatch({ type: '[Auth] - Login', payload: user })

    } catch (error) {
      dispatch({ type: '[Auth] - Logout' })
    }
  };

  const loginUser = async( email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;

      Cookies.set('token', token);

      dispatch({ type: '[Auth] - Login', payload: user })

      return true;
      
    } catch (error) {
      return false; 
    }
  }

  const logoutUser = () => {
    Cookies.remove('token');
    Cookies.remove('cart');
    router.reload();
  }

  const registerUser = async( name: string, email: string, password: string): Promise<{hasError: boolean, message?: string}> => {
    try {
      const { data } = await tesloApi.post('/user/register', { name, email, password });
      const { token, user } = data;

      Cookies.set('token', token);

      dispatch({ type: '[Auth] - Login', payload: user })

      return { hasError: false }

    } catch (error) {
      if ( axios.isAxiosError(error) ) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }  

      return {
          hasError: true,
          message: 'No se pudo crear el usuario - intente nuevamente'
        }
    }
  }

 return (
   <AuthContext.Provider value={{
      ...state,

      // Methods
      loginUser,
      logoutUser,
      registerUser
    }}>
     { children }
   </AuthContext.Provider>
  )
}