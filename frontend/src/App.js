import React from 'react';
import {
   BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Index from './pages/index/Index';
import Calendars from './pages/Calendars/Calendars';
import Room from './pages/Room/Room';
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
                  <Route path="/calendars" >
                     <Calendars />
                  </Route>
                  <Route path="/room/:roomId" >
                     <Room />
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
