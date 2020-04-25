import moment from 'moment';
import { constants } from '../../assets/configs/constants';

class Backend {
   constructor() {
      // `cache` entries are in the following format:
      // "url/fragment" -> { "data": {}, "retrievedAt": moment() }
      this.cache = new Map();
   }

   get( urlFragment, freshness = 5 * 60 ) {
      if ( this.cache.has( urlFragment ) ) {
         const entry = this.cache.get( urlFragment );

         if ( moment().diff( entry.retrievedAt, 'seconds' ) < freshness ) {
            const promise = ( async () => entry.data )();

            const abort = () => { };

            return [ promise, abort ];
         }
      }

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
                     'X-APP-TOKEN': 'Check Room'
                  },
               }
            );

            const data = await res.json();

            this.cache.set( urlFragment, {
               data,
               retrievedAt: moment(),
            } );

            return data;
         }
         catch ( error ) {
            // eslint-disable-next-line no-alert
            alert( `Could not communicate with server: ${error}` );
            throw error;
         }
      } )();

      return [ promise, abort ];
   }

   static post( urlFragment ) {
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
                     'X-APP-TOKEN': 'Check Room'
                  },
               }
            );

            const data = await res.json();

            return data;
         }
         catch ( error ) {
            // eslint-disable-next-line no-alert
            alert( `Could not communicate with server: ${error}` );
            throw error;
         }
      } )();

      return [ promise, abort ];
   }
}

export default Backend;
