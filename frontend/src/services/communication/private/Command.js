class Command {
   constructor( fetcher ) {
      this.fetcher = fetcher;
   }

   // Create an event.
   addEvent( calendarOrCalendarUri, event ) {
      let calendar = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) !== -1 ) {
         [ calendar, ] = calendarOrCalendarUri.split( '@' );
      }

      return this.fetcher.post( `calendar/${calendar}`, event );
   }
}

export default Command;
