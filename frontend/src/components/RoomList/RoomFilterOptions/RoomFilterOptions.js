import React from 'react';
import PropTypes from 'prop-types';
import { StyledRoomFilterOptions, Field } from './RoomFilterOptions_styles';

const RoomFilterOptions = ( { state } ) => {
   const [ filters, setFilters ] = state;

   return (
      <StyledRoomFilterOptions>
         <Field>
            Name
            <input type="text"
               value={ filters.name ?? '' }
               onChange={ ( e ) => setFilters(
                  { ...filters, name: e.target.value }
               ) } />
         </Field>

         <Field>
            Seats
            <input type="number"
               inputtype="numeric"
               pattern="[0-9]*"
               value={ filters.seatsNo ?? '' }
               onChange={ ( e ) => setFilters(
                  { ...filters, seatsNo: e.target.value }
               ) } />
         </Field>

         <Field>
            <input type="checkbox"
               checked={ filters.hasProjector ?? false }
               onChange={ ( e ) => setFilters(
                  { ...filters, hasProjector: e.target.checked }
               ) } />
            Projector
         </Field>

         <Field>
            <input type="checkbox"
               checked={ filters.hasWhiteboard ?? false }
               onChange={ ( e ) => setFilters(
                  { ...filters, hasWhiteboard: e.target.checked }
               ) } />
            Whiteboard
         </Field>
      </StyledRoomFilterOptions>
   );
};

RoomFilterOptions.propTypes = {
   state: PropTypes.arrayOf( PropTypes.any ).isRequired
};

export default RoomFilterOptions;
