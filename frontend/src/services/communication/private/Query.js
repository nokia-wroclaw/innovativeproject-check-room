class Query {
   constructor( cache ) {
      this.cache = cache;
   }

   roomMetadataAndEvents( calendarOrCalendarUri, startDate ) {
      let calendar = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) !== -1 ) {
         [ calendar, ] = calendarOrCalendarUri.split( '@' );
      }

      const url = `calendar/${calendar}?startDate=${startDate}`;

      return this.cache.get( url, 15 );
   }

   // This function fetches the metadata only.
   // It's main benefit is longer caching.
   roomMetadata( calendarOrCalendarUri ) {
      let calendarUri = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) === -1 ) {
         calendarUri = `${calendarOrCalendarUri}@group.calendar.google.com`;
      }

      const [ promise, abort ] = this.allRoomsMetadata();
      const newPromise = promise.then( ( calendars ) => {
         const candidates = calendars.filter(
            ( calendar ) => calendar.id === calendarUri
         );

         if ( candidates.length === 0 ) {
            throw new Error( 'Calendar not found' );
         }

         if ( candidates.length > 1 ) {
            throw new Error( `Multiple calendars found for ${calendarUri}` );
         }

         return candidates[0];
      } );

      return [ newPromise, abort ];
   }

   allRoomsMetadata() {
      const [ promise, abort ] = this.cache.get( 'calendars' );
      const newPromise = promise.then(
         ( calendars ) => calendars.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_'
         )
      );

      return [ newPromise, abort ];
   }
}

export default Query;
