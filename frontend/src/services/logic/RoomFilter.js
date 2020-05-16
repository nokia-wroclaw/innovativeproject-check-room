import RoomMetadataDTO from '../parsing/RoomMetadataDTO';

class RoomFilter {
   constructor( filters ) {
      this.filters = filters;
   }

   accepts( roomData ) {
      const room = RoomMetadataDTO.from( roomData );

      return this.matchesProjector( room )
         && this.matchesWhiteboard( room )
         && this.matchesSeatsNo( room )
         && this.matchesName( room )
         && this.matchesBuilding( room );
   }

   asFunction() {
      return this.accepts.bind( this );
   }

   matchesProjector( room ) {
      if ( !this.filters.hasProjector ) return true;

      return room.hasProjector;
   }

   matchesWhiteboard( room ) {
      if ( !this.filters.hasWhiteboard ) return true;

      return room.hasWhiteboard;
   }

   matchesSeatsNo( room ) {
      if ( !this.filters.seatsNo ) return true;

      return room.seatsNo >= this.filters.seatsNo;
   }

   matchesName( room ) {
      if ( !this.filters.name ) return true;

      const roomName = room.name.toLowerCase();
      const filterName = this.filters.name.toLowerCase();

      return roomName.includes( filterName );
   }

   matchesBuilding( room ) {
      if ( !this.filters.building ) return true;
      if ( this.filters.building.length === 0 ) return true;
      // Unknown location -> reject this room.
      if ( !room.location ) return false;

      const location = `${room.location.building}_${room.location.floorNo}`;
      // User selected the right floor in the building.
      const selectedThisFloor = this.filters.building.includes( location );
      // User selected all floors in the building.
      const selectedThisBuilding = this.filters.building.includes( room.location.building );

      return selectedThisFloor || selectedThisBuilding;
   }
}

export default RoomFilter;
