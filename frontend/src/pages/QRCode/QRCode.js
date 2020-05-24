import React, { useEffect, useState, useContext } from 'react';
import QRCodeLib from 'qrcode.react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BackendContext from '../../services/communication/BackendContext';
import { StyledQRCode } from './QRCode_styles';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import LoadingPage from '../../components/LoadingPage/LoadingPage';

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
      const [ promise, abort ] = backend.query.roomMetadata( roomId );
      promise.then( ( data ) => {
         setRoom( data );
         setIsLoading( false );
      } ).catch( () => { } );

      return abort;
   }, [ roomId, backend ] );

   return (
      <StyledQRCode>
         { isLoading ? <LoadingPage /> :
            <RoomHeader roomData={ room } />
         }
         <Link to={ roomPath }>Go Back</Link>
         <QRCodeLib value={ roomLink } size={ 400 } />
      </StyledQRCode>
   );
};

export default QRCode;
