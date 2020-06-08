const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const RoomToCalendarService = require( '../../services/RoomToCalendarService' );
const UserPolicy = require( '../../policies/UserPolicy' );

const paramsSchema = yup.object().shape( {
   calendar: yup
      .string()
      .required()
      .matches( /[a-zA-Z0-9]{10,64}/ ),
} );

const bodySchema = yup.object().shape( {
   summary: yup
      .string()
      .matches( /(ROOM_.*)/ )
      .required()
      .max( 200 ),
   name: yup
      .string()
      .required()
      .max( 30 ),
   description: yup.string().max( 50 ),
   building: yup.string().max( 30 ),
   floor: yup.number(),
   seatsNo: yup.number(),
   hasProjector: yup.bool(),
   hasWhiteboard: yup.bool(),
} );

module.exports = async ( req, res ) => {
   try {
      const params = await paramsSchema.validate( req.params );
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'manage rooms' );

      const description = new RoomToCalendarService().descriptionFrom( body );
      const calendarData = {
         summary: body.summary,
         description,
      };

      const client = new CalendarClient();
      const calendar = await client.updateCalendar( params.calendar, calendarData );

      res.send( calendar );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
