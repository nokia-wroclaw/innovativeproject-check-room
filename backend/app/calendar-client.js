const { google } = require( 'googleapis' );
const { authorize } = require( './google-auth' );

class CalendarClient {
   constructor() {
      if ( CalendarClient.connection === null ) {
         CalendarClient.connection = google.calendar( { version: 'v3', auth: authorize() } );
      }

      this.connection = CalendarClient.connection;
   }

   async listCalendars() {
      const res = await this.connection.calendarList.list( {} );

      return res.data.items;
   }

   async getCalendar( calendarId ) {
      const res = await this.connection.calendarList.get( { calendarId } );

      return res.data;
   }

   async getEvents( calendarId ) {
      const res = await this.connection.events.list( {
         calendarId,
         timeMin: ( new Date() ).toISOString(),
         maxResults: 10,
         singleEvents: true,
         orderBy: 'startTime',
      } );

      return res.data.items;
   }
}

CalendarClient.connection = null;

module.exports = { CalendarClient };
