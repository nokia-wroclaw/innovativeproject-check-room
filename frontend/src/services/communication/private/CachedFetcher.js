import moment from 'moment';

class CachedFetcher {
   constructor( fetcher ) {
      this.fetcher = fetcher;
      // `cache` entries are in the following format:
      // "url/fragment" -> { "data": {}, "retrievedAt": moment() }
      this.cache = new Map();
   }

   reset() {
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

      const [ promise, abort ] = this.fetcher.get( urlFragment );
      const promiseWithCache = promise.then( ( data ) => {
         this.cache.set( urlFragment, {
            data,
            retrievedAt: moment(),
         } );

         return data;
      } );

      return [ promiseWithCache, abort ];
   }
}

export default CachedFetcher;
