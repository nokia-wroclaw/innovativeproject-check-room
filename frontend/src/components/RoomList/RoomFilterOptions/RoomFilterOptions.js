import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../InputField/InputField';
import { StyledRoomFilterOptions } from './RoomFilterOptions_styles';

const RoomFilterOptions = ( { state } ) => {
   const [ filters, setFilters ] = state;

   return (
      <StyledRoomFilterOptions>
         <InputField
            label="Name"
            type="search"
            value={ filters.name }
            onChange={ ( val ) => setFilters(
               { ...filters, name: val }
            ) } />

         <InputField
            label="Seats"
            labelPosition="left"
            type="number"
            value={ filters.seatsNo }
            onChange={ ( val ) => setFilters(
               { ...filters, seatsNo: val }
            ) } />

         <InputField
            label="Projector"
            labelPosition="right"
            type="checkbox"
            value={ filters.hasProjector }
            onChange={ ( val ) => setFilters(
               { ...filters, hasProjector: val }
            ) } />

         <InputField
            label="Whiteboard"
            labelPosition="right"
            type="checkbox"
            value={ filters.hasWhiteboard }
            onChange={ ( val ) => setFilters(
               { ...filters, hasWhiteboard: val }
            ) } />
      </StyledRoomFilterOptions>
   );
};

RoomFilterOptions.propTypes = {
   state: PropTypes.arrayOf( PropTypes.any ).isRequired
};

export default RoomFilterOptions;
