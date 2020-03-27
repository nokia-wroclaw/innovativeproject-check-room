const FAKE_CALENDAR_ID = 'test@group.calendar.google.com';

function GoogleCalendarMock() {
   return {
      calendarList: {
         list: async ( settings ) => ( {
            data: {
               items: [
                  {
                     kind: 'calendar#calendarListEntry',
                     id: FAKE_CALENDAR_ID,
                     summary: 'ROOM_001',
                  },
               ],
            },
         } ),
         get: async ( settings ) => {
            if ( settings.calendarId !== FAKE_CALENDAR_ID ) {
               throw new Error( 'Not found' );
            }

            return {
               data: {
                  kind: 'calendar#calendarListEntry',
                  id: FAKE_CALENDAR_ID,
                  summary: 'ROOM_001',
               },
            };
         },
      },
      events: {
         list: async ( settings ) => {
            if ( settings.calendarId !== FAKE_CALENDAR_ID ) {
               throw new Error( 'Not found' );
            }

            return {
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
            };
         },
      },
   };
}

module.exports = { GoogleCalendarMock };
