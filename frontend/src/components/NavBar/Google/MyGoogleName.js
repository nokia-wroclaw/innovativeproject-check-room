import { useContext } from 'react';
import PropTypes from 'prop-types';
import BackendContext from '../../../services/communication/BackendContext';

const MyGoogleName = ( { render } ) => {
   const backend = useContext( BackendContext );
   const { user, type } = backend.auth;

   if ( !user ) return null;

   return render( { name: user.profileObj.name, type: type || 'loading...' } );
};

MyGoogleName.propTypes = {
   render: PropTypes.func.isRequired,
};

export default MyGoogleName;
