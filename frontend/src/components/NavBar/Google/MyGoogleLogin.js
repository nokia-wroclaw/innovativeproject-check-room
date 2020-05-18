import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { message } from 'antd';
import { constants } from '../../../assets/configs/constants';
import BackendContext from '../../../services/communication/BackendContext';

const MyGoogleLogin = ( { render } ) => {
   const backend = useContext( BackendContext );
   const loginSucceeded = ( obj ) => backend.logIn( obj );
   const loginFailed = ( error ) => message.error( error );

   return backend.isLoggedIn() ? null : (
      <GoogleLogin
         render={ render }
         clientId={ constants.google.CLIENT_ID }
         onSuccess={ loginSucceeded }
         onFailure={ loginFailed }
         cookiePolicy="single_host_origin"
         isSignedIn />
   );
};

MyGoogleLogin.propTypes = {
   render: PropTypes.func.isRequired,
};

export default MyGoogleLogin;
