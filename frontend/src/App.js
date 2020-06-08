import React from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Rooms from './pages/Rooms/Rooms';
import AdminUsers from './pages/AdminUsers/AdminUsers';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import PageTemplate from './templates/PageTemplate/PageTemplate';
import Backend from './services/communication/Backend';
import BackendContext from './services/communication/BackendContext';
import QRCode from './pages/QRCode/QRCode';
import ProtectedRoute from './services/logic/ProtectedRoute';
import { constants } from './assets/configs/constants';

const App = () => {
   const backend = new Backend();

   if ( constants.exposeDebugTools ) {
      window.backend = backend;
      window.moment = moment;
   }

   return (
      <BackendContext.Provider value={ backend }>
         <Router>
            <PageTemplate>
               <Switch>
                  <Route path="/room/:roomId/qrcode">
                     <QRCode />
                  </Route>
                  <Route path="/room/:roomId">
                     <RoomDetails />
                  </Route>
                  <ProtectedRoute path="/admin/users" permission="manage users">
                     <AdminUsers />
                  </ProtectedRoute>
                  <Route path="/" exact>
                     <Rooms />
                  </Route>
                  <Route path="/">
                     <Redirect to="/" />
                  </Route>
               </Switch>
            </PageTemplate>
         </Router>
      </BackendContext.Provider>
   );
};

export default App;
