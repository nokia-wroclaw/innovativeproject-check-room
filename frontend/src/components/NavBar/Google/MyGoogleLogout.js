import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';
import { constants } from '../../../assets/configs/constants';
import BackendContext from '../../../services/communication/BackendContext';

const MyGoogleLogout = ( { render } ) => {
   const backend = useContext( BackendContext );
   const logoutSucceeded = () => backend.logOut();

   return backend.isLoggedIn() ? (
      <GoogleLogout
         render={ render }
         clientId={ constants.google.CLIENT_ID }
         onLogoutSuccess={ logoutSucceeded } />
   ) : null;
};

MyGoogleLogout.propTypes = {
   render: PropTypes.func.isRequired,
};

export default MyGoogleLogout;
