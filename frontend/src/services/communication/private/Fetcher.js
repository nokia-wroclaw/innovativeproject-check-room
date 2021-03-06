import { message } from 'antd';
import { constants } from '../../../assets/configs/constants';
import JsonParser from '../../parsing/JsonParser';

const errorHandler = ( error ) => {
   if ( error.name === 'AbortError' ) return;
   message.error( `${error}` );
};

class Fetcher {
   get( urlFragment, options = {} ) {
      const authHeader = options.auth && options.auth.user ? { 'X-GOOGLE-AUTH': options.auth.token() } : {};

      const controller = new AbortController();
      const { signal } = controller;
      const abort = () => controller.abort();

      const promise = ( async () => {
         try {
            const res = await fetch(
               `${constants.url.API_URL}${urlFragment}`,
               {
                  signal,
                  headers: {
                     'X-APP-TOKEN': 'Check Room',
                     ...authHeader
                  }
               }
            );

            const text = await res.text();
            if ( !res.ok ) throw new Error( text );
            const data = JsonParser.parse( text );

            return data;
         }
         catch ( error ) {
            errorHandler( error );
            throw error;
         }
      } )();

      return [ promise, abort ];
   }

   post( urlFragment, options = {} ) {
      const authHeader = options.auth && options.auth.user ? { 'X-GOOGLE-AUTH': options.auth.token() } : {};
      const bodySetting = options.body ? { body: JSON.stringify( options.body ) } : {};

      const controller = new AbortController();
      const { signal } = controller;
      const abort = () => controller.abort();

      const promise = ( async () => {
         try {
            const res = await fetch(
               `${constants.url.API_URL}${urlFragment}`,
               {
                  signal,
                  method: 'POST',
                  headers: {
                     'X-APP-TOKEN': 'Check Room',
                     'Content-Type': 'application/json',
                     ...authHeader
                  },
                  ...bodySetting
               }
            );

            const text = await res.text();
            if ( !res.ok ) throw new Error( text );
            const data = JsonParser.parse( text );

            return data;
         }
         catch ( error ) {
            errorHandler( error );
            throw error;
         }
      } )();

      return [ promise, abort ];
   }
}

export default Fetcher;
