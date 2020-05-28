import React from 'react';
import moment from 'moment';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rooms from './pages/Rooms/Rooms';
import Users from './pages/Users/Users';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import PageTemplate from './templates/PageTemplate/PageTemplate';
import Backend from './services/communication/Backend';
import BackendContext from './services/communication/BackendContext';
import QRCode from './pages/QRCode/QRCode';
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
                  <Route path="/users">
                     <Users />
                  </Route>
                  <Route path="/">
                     <Rooms />
                  </Route>
               </Switch>
            </PageTemplate>
         </Router>
      </BackendContext.Provider>
   );
};

export default App;
