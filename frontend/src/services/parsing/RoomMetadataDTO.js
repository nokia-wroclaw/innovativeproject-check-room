import JsonParser from './JsonParser';
import CalendarID from '../communication/CalendarID';

class RoomMetadataDTO {
   static from( roomData ) {
      if ( roomData instanceof RoomMetadataDTO ) {
         return roomData;
      }

      const { description, summary } = roomData;
      const fallback = {
         nm: summary,
         dc: description,
      };
      const room = JsonParser.parseOrDefault( description, fallback );
      room.id = CalendarID.toId( roomData.id );

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
