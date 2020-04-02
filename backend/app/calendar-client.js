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

   async getEvents( calendarId, startDate ) {
      const res = await this.connection.events.list( {
         calendarId,
         timeMin: startDate.format(),
         timeMax: startDate.add( 1, 'week' ).format(),
         maxResults: 100,
         singleEvents: true,
         orderBy: 'startTime',
      } );

      return res.data.items;
   }
}

CalendarClient.connection = null;

module.exports = { CalendarClient };
