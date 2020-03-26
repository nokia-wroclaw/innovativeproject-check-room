function GoogleCalendarMock() {
   return {
      calendarList: {
         list: ( settings, callback ) => {
            callback( null, {
               data: {
                  items: [
                     {
                        kind: 'calendar#calendarListEntry',
                        id: 'test@group.calendar.google.com',
                        summary: 'ROOM_001',
                     },
                  ],
               },
            } );
         },
      },
      events: {
         list: ( settings, callback ) => {
            callback( null, {
               data: {
                  items: [
                     {
                        kind: 'calendar#event',
                        id: 'event',
                        status: 'confirmed',
                        summary: 'Test event',
                     },
                  ],
               },
            } );
         },
      },
   };
}

module.exports = { GoogleCalendarMock };
