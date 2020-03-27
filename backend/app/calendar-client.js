const { google } = require( 'googleapis' );
const { authorize } = require( './google-auth' );

class CalendarClient {
   constructor() {
      if ( CalendarClient.connection === null ) {
         CalendarClient.connection = google.calendar( { version: 'v3', auth: authorize() } );
      }

      this.connection = CalendarClient.connection;
   }

   async listCalendars( ) {
      return new Promise( ( resolve, reject ) => {
         this.connection.calendarList.list( {}, ( err, res ) => {
            if ( err ) reject( err );
            else resolve( res.data.items );
         } );
      } );
   }

   async getCalendar( calendarId ) {
      return new Promise( ( resolve, reject ) => {
         this.connection.calendarList.get( { calendarId }, ( err, res ) => {
            if ( err ) reject( err );
            else resolve( res.data );
         } );
      } );
   }

   async getEvents( calendarId ) {
      return new Promise( ( resolve, reject ) => {
         this.connection.events.list( {
            calendarId,
            timeMin: ( new Date() ).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
         }, ( err, res ) => {
            if ( err ) reject( err );
            else resolve( res.data.items );
         } );
      } );
   }
}

CalendarClient.connection = null;

module.exports = { CalendarClient };
