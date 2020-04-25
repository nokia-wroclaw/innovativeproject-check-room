import JsonParser from './JsonParser';

class RoomMetadataDTO {
   static from( summary, description ) {
      const fallback = {
         nm: summary,
         dc: description,
      };
      const room = JsonParser.parseOrDefault( description, fallback );

      return this.fromJSON( room );
   }

   static fromPlainStrings( name, description ) {
      const fallback = {
         nm: name,
         dc: description,
      };

      return this.fromJSON( fallback );
   }

   static fromJSON( room ) {
      const ret = new RoomMetadataDTO();

      ret.name = room.nm;
      ret.description = room.dc;
      ret.seatsNo = room.st;
      ret.hasProjector = room.pj === 1;
      ret.hasWhiteboard = room.wb === 1;

      if ( room.lc ) {
         ret.location = {
            building: room.lc.b,
            floorNo: room.lc.f,
         };
      }

      return ret;
   }
}

export default RoomMetadataDTO;
