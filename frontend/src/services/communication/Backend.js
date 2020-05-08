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

   // Fetches calendar metadata and events.
   fetchCalendar( calendarOrCalendarUri, startDate ) {
      let calendar = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) !== -1 ) {
         [ calendar, ] = calendarOrCalendarUri.split( '@' );
      }

      const url = `calendar/${calendar}?startDate=${startDate}`;

      return this.get( url, 15 );
   }

   // This function fetches the metadata only.
   // It's main benefit is longer caching.
   fetchRoomMetadata( calendarOrCalendarUri ) {
      let calendarUri = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) === -1 ) {
         calendarUri = `${calendarOrCalendarUri}@group.calendar.google.com`;
      }

      const [ promise, abort ] = this.listRooms();
      const newPromise = promise.then(
         ( calendars ) => calendars.filter(
            ( calendar ) => calendar.id === calendarUri
         )
      );

      return [ newPromise, abort ];
   }

   // Fetches metadata for all rooms.
   listRooms() {
      const [ promise, abort ] = this.get( 'calendars' );
      const newPromise = promise.then(
         ( calendars ) => calendars.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
         )
      );

      return [ newPromise, abort ];
   }

   // Sends a request to create an event.
   addEvent( calendarOrCalendarUri, event ) {
      let calendar = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) !== -1 ) {
         [ calendar, ] = calendarOrCalendarUri.split( '@' );
      }

      return this.post( `calendar/${calendar}`, event );
   }
}

export default Backend;
