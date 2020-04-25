import React, { useState, useContext, useEffect } from 'react';
import BackendContext from '../../services/communication/BackendContext';
import Greeter from '../../components/Greeter/Greeter';

const Index = () => {
   const [ amountOfRooms, setAmountOfRooms ] = useState( '(loading...)' );
   const backend = useContext( BackendContext );

   useEffect( () => {
      const [ promise, abort ] = backend.listRooms();
      promise.then( ( roomList ) => setAmountOfRooms( roomList.length ) );

      return abort;
   }, [ backend ] );

   return (
      <Greeter amountOfRooms={ amountOfRooms } />
   );
};

export default Index;
