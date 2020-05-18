import { useContext } from 'react';
import PropTypes from 'prop-types';
import BackendContext from '../../../services/communication/BackendContext';

const MyGoogleName = ( { render } ) => {
   const backend = useContext( BackendContext );
   const { user } = backend.auth;

   return user ? render( { name: user.profileObj.name } ) : null;
};

MyGoogleName.propTypes = {
   render: PropTypes.func.isRequired,
};

export default MyGoogleName;
