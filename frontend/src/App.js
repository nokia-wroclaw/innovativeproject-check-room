import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Rooms from './pages/Rooms/Rooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import AddNewEventToRoom from './pages/AddNewEventToRoom/AddNewEventToRoom';
import PageTemplate from './templates/PageTemplate/PageTemplate';
import Backend from './services/communication/Backend';
import BackendContext from './services/communication/BackendContext';
import QRCode from './pages/QRCode/QRCode';

const App = () => {
   const backend = new Backend();

   return (
      <BackendContext.Provider value={ backend }>
         <Router>
            <PageTemplate>
               <Switch>
                  <Route path="/room/:roomId/qrcode">
                     <QRCode />
                  </Route>
                  <Route path="/room/:roomId/add">
                     <AddNewEventToRoom />
                  </Route>
                  <Route path="/room/:roomId">
                     <RoomDetails />
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
