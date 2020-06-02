const mongoose = require( 'mongoose' );

const { Schema } = mongoose;

const eventOwnerSchema = new Schema( {
   userId: { type: String, required: true },
   googleEventId: { type: String, required: true },
} );

module.exports = mongoose.model( 'EventOwner', eventOwnerSchema );
