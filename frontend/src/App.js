import React from 'react';
import {
   BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Index from './pages/Index/Index';
import Rooms from './pages/Rooms/Rooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import PageTemplate from './templates/PageTemplate/PageTemplate';
import Backend from './services/communication/Backend';
import BackendContext from './services/communication/BackendContext';

const App = () => {
   const backend = new Backend().bindToSelf();

   return (
      <BackendContext.Provider value={ backend }>
         <Router>
            <PageTemplate>
               <Switch>
                  <Route path="/rooms" >
                     <Rooms />
                  </Route>
                  <Route path="/room/:roomId" >
                     <RoomDetails />
                  </Route>
                  <Route path="/">
                     <Index />
                  </Route>
               </Switch>
            </PageTemplate>
         </Router>
      </BackendContext.Provider>
   );
};

export default App;
