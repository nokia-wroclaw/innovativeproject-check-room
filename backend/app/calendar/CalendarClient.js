const Connection = require( './Connection' );

class CalendarClient {
   constructor() {
      if ( CalendarClient.connection === null ) {
         CalendarClient.connection = new Connection();
      }

      this.calendar = CalendarClient.connection.getConnection();
   }

   async listCalendars() {
      const res = await this.calendar.calendarList.list( {} );

      return res.data.items;
   }

   async getCalendar( calendarId ) {
      const res = await this.calendar.calendarList.get( { calendarId } );

      return res.data;
   }

   async getEvents( calendarId, startDate ) {
      const res = await this.calendar.events.list( {
         calendarId,
         timeMin: startDate.format(),
         timeMax: startDate.add( 1, 'week' ).format(),
         maxResults: 100,
         singleEvents: true,
         orderBy: 'startTime',
      } );

      return res.data.items;
   }

   async addEvent( event ) {
      const overlapping = await this.calendar.events.list( {
         calendarId: event.calendar,
         timeMin: event.start.format(),
         timeMax: event.end.format(),
         maxResults: 1,
         singleEvents: true,
      } );

      if ( overlapping.data.items.length > 0 ) {
         throw new Error( 'Overlapping events!' );
      }

      const res = await this.calendar.events.insert( {
         calendarId: event.calendar,
         resource: {
            start: {
               dateTime: event.start.format(),
            },
            end: {
               dateTime: event.end.format(),
            },
            summary: event.summary,
            description: event.description,
         },
      } );

      return res.data;
   }
}

CalendarClient.connection = null;

module.exports = CalendarClient;
