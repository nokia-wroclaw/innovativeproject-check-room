const { Mutex } = require( 'async-mutex' );
const moment = require( 'moment' );
const CalendarConnection = require( './CalendarConnection' );

class CalendarClient {
   constructor() {
      if ( CalendarClient.connection === null ) {
         CalendarClient.connection = new CalendarConnection();
      }

      if ( CalendarClient.mutex === null ) {
         CalendarClient.mutex = new Mutex();
      }

      this.calendar = CalendarClient.connection.getConnection();
      this.mutex = CalendarClient.mutex;
   }

   calendarId( calendar ) {
      return `${calendar}@group.calendar.google.com`;
   }

   async listCalendars() {
      const res = await this.calendar.calendarList.list( {} );

      return res.data.items;
   }

   async getCalendar( calendar ) {
      const res = await this.calendar.calendarList.get( {
         calendarId: this.calendarId( calendar ),
      } );

      return res.data;
   }

   async filterFreeCalendars( calendars, startDate, endDate ) {
      const res = await this.calendar.freebusy.query( {
         requestBody: {
            timeMin: startDate.format(),
            timeMax: endDate.format(),
            items: calendars.map( ( calendar ) => ( {
               id: calendar.id,
            } ) ),
         },
      } );

      const potentiallyBusy = Object.entries( res.data.calendars );
      const busy = potentiallyBusy.filter( ( [ id, data ] ) => data.busy.length > 0 );
      const busyIds = busy.map( ( [ id, data ] ) => id );
      const freeCalendars = calendars.filter( ( { id } ) => !busyIds.includes( id ) );

      return freeCalendars;
   }

   async getEvents( calendar, startDate ) {
      const res = await this.calendar.events.list( {
         calendarId: this.calendarId( calendar ),
         timeMin: startDate.format(),
         timeMax: moment( startDate ).add( 1, 'week' ).format(),
         maxResults: 100,
         singleEvents: true,
         orderBy: 'startTime',
      } );

      return res.data.items;
   }

   async addEvent( event ) {
      const calendarId = this.calendarId( event.calendar );

      if ( event.end.diff( event.start, 'minutes' ) < 5 ) {
         throw new Error( 'Invalid event length' );
      }

      const release = await this.mutex.acquire();

      try {
         const overlapping = await this.calendar.events.list( {
            calendarId,
            timeMin: event.start.format(),
            timeMax: event.end.format(),
            maxResults: 1,
            singleEvents: true,
         } );

         if ( overlapping.data.items.length > 0 ) {
            throw new Error( 'Overlapping events!' );
         }

         const res = await this.calendar.events.insert( {
            calendarId,
            resource: {
               start: {
                  dateTime: event.start.format(),
               },
               end: {
                  dateTime: event.end.format(),
               },
               summary: event.summary,
               description: event.description,
               attendees: event.participants.map( ( participant ) => ( {
                  email: participant,
               } ) ),
            },
         } );

         return res.data;
      }
      finally {
         release();
      }
   }

   async deleteEvent( calendar, eventId ) {
      await this.calendar.events.delete( {
         calendarId: this.calendarId( calendar ),
         eventId,
      } );
   }

   async updateCalendar( calendar, calendarData ) {
      const res = await this.calendar.calendars.update( {
         calendarId: this.calendarId( calendar ),
         resource: calendarData,
      } );

      return res.data;
   }
}

CalendarClient.connection = null;
CalendarClient.mutex = null;

module.exports = CalendarClient;
