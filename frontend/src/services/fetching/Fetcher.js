import moment from 'moment';
import { constants } from '../../assets/configs/constants';

class Fetcher {
   constructor() {
      // `cache` entries are in the following format:
      // "url/fragment" -> { "data": {}, "retrievedAt": moment() }
      this.cache = new Map();
      // 5 minutes.
      this.ttl = 5 * 60;
   }

   fetchAPI( urlFragment ) {
      if ( this.cache.has( urlFragment ) ) {
         const entry = this.cache.get( urlFragment );

         if ( moment().diff( entry.retrievedAt, 'seconds' ) < this.ttl ) {
            const promise = new Promise( ( resolve ) => {
               resolve( entry.data );
            } );

            const abort = () => { };

            return [ promise, abort ];
         }
      }

      const controller = new AbortController();
      const { signal } = controller;
      const abort = () => controller.abort();

      const promise = fetch(
         `${constants.url.API_URL}${urlFragment}`,
         { signal }
      )
         .then( ( response ) => response.json() )
         .then( ( data ) => {
            this.cache.set( urlFragment, {
               data,
               retrievedAt: moment(),
            } );

            return data;
         } )
         // eslint-disable-next-line no-console
         .catch( ( error ) => console.log( error ) );

      return [ promise, abort ];
   }

   bindFetchAPI() {
      return this.fetchAPI.bind( this );
   }
}

export default Fetcher;
