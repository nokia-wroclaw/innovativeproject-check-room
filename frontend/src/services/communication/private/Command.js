import CalendarID from '../CalendarID';

class Command {
   constructor( fetcher, auth ) {
      this.fetcher = fetcher;
      this.auth = auth;
   }

   addEvent( calendarOrCalendarUri, event ) {
      const calendar = CalendarID.toId( calendarOrCalendarUri );

      return this.fetcher.post( `events/${calendar}`, { body: event, auth: this.auth } );
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

   freeRooms( startDate, endDate ) {
      const body = { startDate, endDate };
      const [ promise, abort ] = this.fetcher.post( 'calendars/free', { auth: this.auth, body } );
      const newPromise = promise.then(
         ( calendars ) => calendars.filter(
            ( calendar ) => calendar.summary.slice( 0, 5 ) === 'ROOM_' ) );

      return [ newPromise, abort ];
   }

   updateEvent( calendar, eventId, eventData ) {
      const body = {
         id: eventId,
         ...eventData
      };

      return this.fetcher.post( `events/update/${calendar}`, { body, auth: this.auth } );
   }

   deleteEvent( calendar, eventId ) {
      const body = {
         id: eventId,
      };

      return this.fetcher.post( `events/delete/${calendar}`, { body, auth: this.auth } );
   }

   addCalendar( calendarData ) {
      return this.fetcher.post( 'calendars', { body: calendarData, auth: this.auth } );
   }

   updateCalendar( calendarOrCalendarUri, summary, calendarData ) {
      const calendar = CalendarID.toId( calendarOrCalendarUri );
      const body = {
         calendar,
         summary,
         ...calendarData,
      };

      return this.fetcher.post( 'calendars/update', { body, auth: this.auth } );
   }

   deleteCalendar( calendarOrCalendarUri ) {
      const body = {
         id: CalendarID.toId( calendarOrCalendarUri ),
      };

      return this.fetcher.post( 'calendars/delete', { body, auth: this.auth } );
   }
}

export default Command;
