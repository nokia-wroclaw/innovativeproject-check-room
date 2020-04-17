import { constants } from '../../assets/configs/constants';

class Fetcher {
   constructor() {
      this.cache = new Map();
   }

   fetchAPI( urlFragment ) {
      if ( this.cache.has( urlFragment ) ) {
         const promise = new Promise( ( resolve ) => {
            resolve( this.cache.get( urlFragment ) );
         } );

         const abort = () => { };

         return [ promise, abort ];
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
            this.cache.set( urlFragment, data );

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
