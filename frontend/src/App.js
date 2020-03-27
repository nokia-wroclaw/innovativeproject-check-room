import React from 'react';
import {
   BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Index from './pages/index/Index';
import Calendars from './pages/Calendars/Calendars';
import Room from './pages/Room/Room';
import PageTemplate from './templates/PageTemplate/PageTemplate';


const App = () => {
   return (
      <Router>
         <>
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
         </>
      </Router>
   );
};

export default App;
