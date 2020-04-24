import JsonParser from './JsonParser';

class RoomMetadataDTO {
   static from( summary, description ) {
      const fallback = {
         a: summary,
         b: description,
      };
      const room = JsonParser.parse( description, fallback );

      return this.fromJSON( room );
   }

   static fromPlainStrings( name, description ) {
      const fallback = {
         a: name,
         b: description,
      };

      return this.fromJSON( fallback );
   }

   static fromJSON( room ) {
      const ret = new RoomMetadataDTO();

      ret.name = room.a;
      ret.description = room.b;
      ret.seatsNo = room.c;
      ret.hasProjector = room.d;
      ret.hasWhiteboard = room.e;

      if ( room.f ) {
         ret.location = {
            building: room.f.a,
            floorNo: room.f.b,
         };
      }

      return ret;
   }
}

export default RoomMetadataDTO;
