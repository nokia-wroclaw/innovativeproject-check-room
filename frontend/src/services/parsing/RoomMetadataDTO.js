import JsonParser from './JsonParser';

class RoomMetadataDTO {
   static from( roomData ) {
      const { description, summary } = roomData;
      const id = roomData.id.split( '@' )[0];
      const fallback = {
         nm: summary,
         dc: description,
      };
      const room = JsonParser.parseOrDefault( description, fallback );
      room.id = id;

      return this.fromJSON( room );
   }

   static fromJSON( room ) {
      const ret = new RoomMetadataDTO();

      ret.name = room.nm;
      ret.description = room.dc;
      ret.seatsNo = room.st;
      ret.hasProjector = room.pj === 1;
      ret.hasWhiteboard = room.wb === 1;
      ret.id = room.id;

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
