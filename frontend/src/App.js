import React from 'react';
import {
   BrowserRouter as Router, Switch, Route
} from 'react-router-dom';
import Index from './pages/index/Index';
import Calendars from './pages/Calendars/Calendars';
import Room from './pages/Room/Room';


const App = () => {
   return (
      <Router>
         <>
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
         </>
      </Router>
   );
};

export default App;
