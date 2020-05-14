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
         if ( room.seatsNo < filters.seatsNo ) return false;
      }

      if ( filters.name ) {
         const roomName = room.name.toLowerCase();
         const filterName = filters.name.toLowerCase();
         if ( !roomName.includes( filterName ) ) return false;
      }

      if ( filters.building ) {
         if ( !room.location ) return false;
         if ( room.location.building !== filters.building ) return false;
      }

      return true;
   }

   asFunction() {
      return this.accepts.bind( this );
   }
}

export default RoomFilter;
