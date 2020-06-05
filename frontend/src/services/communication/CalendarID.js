class CalendarID {
   static toId( mailOrId ) {
      if ( mailOrId.indexOf( '@' ) !== -1 ) {
         return mailOrId.split( '@' )[0];
      }

      return mailOrId;
   }

   static toMail( mailOrId ) {
      if ( mailOrId.indexOf( '@' ) === -1 ) {
         return `${mailOrId}@group.calendar.google.com`;
      }

      return mailOrId;
   }
}

export default CalendarID;