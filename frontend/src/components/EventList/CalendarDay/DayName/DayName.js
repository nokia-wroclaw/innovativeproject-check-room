import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { StyledDayName } from './DayName_styles';

const DayName = ( { day } ) => {
   const line1 = moment( day ).toDate().toLocaleDateString( undefined, { year: 'numeric', month: 'long', day: 'numeric' } );
   const line2 = moment( day ).toDate().toLocaleDateString( undefined, { weekday: 'long' } );

   return (
      <StyledDayName>
         <p>{ line1 }</p>
         <p>{ line2 }</p>
      </StyledDayName>
   );
};

DayName.propTypes = {
   day: PropTypes.string.isRequired,
};

export default DayName;
