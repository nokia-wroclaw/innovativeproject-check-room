import React, { useEffect, useState, useContext } from 'react';
import QRCodeLib from 'qrcode.react';
import { Link, useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import BackendContext from '../../services/communication/BackendContext';
import { StyledQRCode } from './QRCode_styles';
import RoomHeader from '../../components/RoomHeader/RoomHeader';

const QRCode = () => {
   // `roomLink` is a full URL (with domain), `roomPath` is not.
   const currentLink = window.location.href;
   const roomLink = currentLink.substring( 0, currentLink.lastIndexOf( '/' ) );
   const currentPath = useLocation().pathname;
   const roomPath = currentPath.substring( 0, currentPath.lastIndexOf( '/' ) );

   const [ room, setRoom ] = useState( [] );
   const [ isLoading, setIsLoading ] = useState( true );
   const { roomId } = useParams();
   const backend = useContext( BackendContext );

   useEffect( () => {
      const startDateTmp = moment()
         .startOf( 'day' )
         .toISOString();
      const [ promise, abort ] = backend.fetchCalendar( roomId, startDateTmp );
      promise.then( ( data ) => {
         setRoom( data );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ roomId, backend ] );

   return (
      <StyledQRCode>
         { isLoading ? (
            <h1 style={ { textAlign: 'center', padding: '45px 20px' } }>
               Loading
            </h1>
         ) : (
            <RoomHeader roomData={ room.calendar } />
         ) }
         <Link to={ roomPath }>Go Back</Link>
         <QRCodeLib value={ roomLink } size={ 200 } />
      </StyledQRCode>
   );
};

export default QRCode;
