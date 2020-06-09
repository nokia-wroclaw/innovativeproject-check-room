class RoomToCalendarService {
   descriptionFrom( roomMetadata ) {
      const room = { lc: {} };

      room.nm = roomMetadata.name;
      room.dc = roomMetadata.description;
      room.lc.b = roomMetadata.building;
      room.lc.f = roomMetadata.floorNo;
      room.st = roomMetadata.seatsNo;
      room.pj = roomMetadata.hasProjector;
      room.wb = roomMetadata.hasWhiteboard;

      if ( !room.lc.b || !room.lc.f ) room.lc = undefined;

      return JSON.stringify( room );
   }
}

module.exports = RoomToCalendarService;
