import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import BackendContext from '../communication/BackendContext';

const ProtectedRoute = ( { path, permission, children } ) => {
   const backend = useContext( BackendContext );

   return (
      <Route path={ path }>
         { backend.auth.can( permission )
            ? children
            : <Redirect to={ { pathname: '/' } } /> }
      </Route>
   );
};

ProtectedRoute.propTypes = {
   path: PropTypes.string.isRequired,
   permission: PropTypes.string.isRequired,
   children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
