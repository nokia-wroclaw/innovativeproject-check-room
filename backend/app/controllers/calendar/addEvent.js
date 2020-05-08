const moment = require( 'moment' );
const yup = require( 'yup' );
const CalendarClient = require( '../../calendar/CalendarClient' );

const paramsSchema = yup.object().shape( {
   calendar: yup.string().required().matches( /[a-zA-Z0-9]{10,64}/ ),
} );

const bodySchema = yup.object().shape( {
   startDate: yup.string().required(),
   endDate: yup.string().required(),
   summary: yup.string().required().max( 200 ),
   description: yup.string().default( '' ),
} );

module.exports = async ( req, res ) => {
   try {
      const params = await paramsSchema.validate( req.params );
      const body = await bodySchema.validate( req.body );

      const event = {
         calendar: params.calendar,
         start: moment( body.startDate ),
         end: moment( body.endDate ),
         summary: body.summary,
         description: body.description,
      };

      console.log( event );

      const client = new CalendarClient();
      const resp = await client.addEvent( event );
      res.send( resp );
   }
   catch ( e ) {
      res.status( 400 ).send( e.message );
   }
};
