import RoomMetadataDTO from '../parsing/RoomMetadataDTO';

class RoomFilter {
   constructor( filters ) {
      this.filters = filters;
   }

   accepts( roomData ) {
      const room = RoomMetadataDTO.from( roomData );
      const { filters } = this;

      if ( filters.hasProjector ) {
         if ( !room.hasProjector ) return false;
      }

      if ( filters.hasWhiteboard ) {
         if ( !room.hasWhiteboard ) return false;
      }

      if ( filters.seatsNo ) {
         if ( !( room.seatsNo >= filters.seatsNo ) ) return false;
      }

      if ( filters.name ) {
         const roomName = room.name.toLowerCase();
         const filterName = filters.name.toLowerCase();
         if ( !roomName.includes( filterName ) ) return false;
      }

      if ( filters.building && filters.building.length > 0 ) {
         if ( !room.location ) return false;
         const location = `${room.location.building}_${room.location.floorNo}`;
         const selectedThisFloor = filters.building.includes( location );
         const selectedThisBuilding = filters.building.includes( room.location.building );
         if ( !( selectedThisFloor || selectedThisBuilding ) ) return false;
      }

      return true;
   }

   asFunction() {
      return this.accepts.bind( this );
   }
}

export default RoomFilter;
