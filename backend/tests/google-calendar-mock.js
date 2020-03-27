const FAKE_CALENDAR_ID = 'test@group.calendar.google.com';

function GoogleCalendarMock() {
   return {
      calendarList: {
         list: ( settings, callback ) => {
            callback( null, {
               data: {
                  items: [
                     {
                        kind: 'calendar#calendarListEntry',
                        id: FAKE_CALENDAR_ID,
                        summary: 'ROOM_001',
                     },
                  ],
               },
            } );
         },
         get: ( settings, callback ) => {
            if ( settings.calendarId !== FAKE_CALENDAR_ID ) {
               throw new Error( 'Not found' );
            }

            callback( null, {
               data: {
                  kind: 'calendar#calendarListEntry',
                  id: FAKE_CALENDAR_ID,
                  summary: 'ROOM_001',
               },
            } );
         },
      },
      events: {
         list: ( settings, callback ) => {
            if ( settings.calendarId !== FAKE_CALENDAR_ID ) {
               throw new Error( 'Not found' );
            }

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
