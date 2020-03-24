import React from 'react';
import {
   BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Index from './pages/index/Index';
import Calendars from './pages/Calendars/Calendars';


const App = () => {
   return (
      <Router>
         <>
            <Switch>
               <Route path="/calendars" >
                  <Calendars />
               </Route>
               <Route path="/room/:rooId" />
               <Route path="/">
                  <Index />
               </Route>
            </Switch>
         </>
      </Router>
   );
};

export default App;
