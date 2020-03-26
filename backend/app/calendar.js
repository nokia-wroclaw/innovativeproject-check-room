const { google } = require( 'googleapis' );
const { auth } = require( './google-auth' );

const calendar = google.calendar( { version: 'v3', auth } );

async function listCalendars( ) {
   return new Promise( ( resolve, reject ) => {
      calendar.calendarList.list( {}, ( err, res ) => {
         if ( err ) reject( err );
         else resolve( res.data.items );
      } );
   } );
}

async function listEvents( calendarId = 'primary' ) {
   return new Promise( ( resolve, reject ) => {
      calendar.events.list( {
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

module.exports = { listEvents, listCalendars };
