class Command {
   constructor( fetcher, auth ) {
      this.fetcher = fetcher;
      this.auth = auth;
   }

   // Create an event.
   addEvent( calendarOrCalendarUri, event ) {
      let calendar = calendarOrCalendarUri;

      if ( calendarOrCalendarUri.indexOf( '@' ) !== -1 ) {
         [ calendar, ] = calendarOrCalendarUri.split( '@' );
      }

      return this.fetcher.post( `calendar/${calendar}`, { body: event, auth: this.auth } );
   }

   editUser( userId, newType ) {
      const body = {
         id: userId,
         newType,
      };

      return this.fetcher.post( 'user', { body, auth: this.auth } );
   }

   deleteUser( userId ) {
      const body = {
         id: userId,
      };

      return this.fetcher.post( 'user/delete', { body, auth: this.auth } );
   }
}

export default Command;
