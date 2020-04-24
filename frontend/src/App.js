import React from 'react';
import {
   BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Index from './pages/Index/Index';
import Rooms from './pages/Rooms/Rooms';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import PageTemplate from './templates/PageTemplate/PageTemplate';
import Fetcher from './services/fetching/Fetcher';
import FetchContext from './services/fetching/FetchContext';

const App = () => {
   const fetcher = new Fetcher();
   const fetchAPI = fetcher.bindFetchAPI();

   return (
      <FetchContext.Provider value={ fetchAPI }>
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
      </FetchContext.Provider>
   );
};

export default App;
