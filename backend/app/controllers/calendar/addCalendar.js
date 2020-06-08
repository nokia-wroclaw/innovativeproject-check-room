const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );
const FindOrCreateUserService = require( '../../services/FindOrCreateUserService' );
const UserPolicy = require( '../../policies/UserPolicy' );

const bodySchema = yup.object().shape( {
   summary: yup
      .string().matches( /(ROOM_.*)/ )
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

const createDescriptionMetadata = ( body ) => {
   const room = { lc: {} };

   room.nm = body.name;
   room.dc = body.description;
   room.lc.b = body.building;
   room.lc.f = body.floor;
   room.st = body.seatsNo;
   room.pj = body.hasProjector;
   room.wb = body.hasWhiteboard;

   if ( !room.lc.b || !room.lc.f ) room.lc = undefined;

   return JSON.stringify( room );
};

module.exports = async ( req, res ) => {
   try {
      const body = await bodySchema.validate( req.body );

      const user = await new FindOrCreateUserService().fromRequest( req );
      new UserPolicy( user ).wantsTo( 'manage rooms' );

      const calendarData = {
         summary: body.summary,
         description: createDescriptionMetadata( body ),
      };

      const client = new CalendarClient();
      const calendar = await client.addCalendar( calendarData );

      res.send( calendar );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
