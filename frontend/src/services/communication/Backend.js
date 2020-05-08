import moment from 'moment';
import { message } from 'antd';
import { constants } from '../../assets/configs/constants';
import JsonParser from '../parsing/JsonParser';

const errorHandler = ( error ) => {
   if ( error.name === 'AbortError' ) return;
   message.error( `${error}` );
};

class Backend {
   constructor() {
      // `cache` entries are in the following format:
      // "url/fragment" -> { "data": {}, "retrievedAt": moment() }
      this.cache = new Map();
   }

   invalidateCache() {
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
                     'X-APP-TOKEN': 'Check Room',
                  }
               }
            );

            const text = await res.text();
            if ( !res.ok ) throw new Error( text );
            const data = JsonParser.parse( text );

            this.cache.set( urlFragment, {
               data,
               retrievedAt: moment(),
            } );

            return data;
         }
         catch ( error ) {
            errorHandler( error );
            throw error;
         }
      } )();

      return [ promise, abort ];
   }

   post( urlFragment, object ) {
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
                  },
                  body: JSON.stringify( object ),
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

   fetchCalendar( calendarOrCalendarUri, startDate ) {
      let calendar = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) !== -1 ) {
         [ calendar, ] = calendarOrCalendarUri.split( '@' );
      }

      const url = `calendar/${calendar}?startDate=${startDate}`;

      return this.get( url, 15 );
   }

   listCalendars() {
      return this.get( 'calendars' );
   }

   listRooms() {
      const [ promise, abort ] = this.listCalendars();
      const newPromise = promise.then(
         ( calendars ) => calendars.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
         )
      );

      return [ newPromise, abort ];
   }

   addEvent( calendar, event ) {
      return this.post( `calendar/${calendar}`, event );
   }
}

export default Backend;
