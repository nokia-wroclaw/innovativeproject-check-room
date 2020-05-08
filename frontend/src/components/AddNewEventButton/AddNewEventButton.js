import React from 'react';
import PropTypes from 'prop-types';
import { GoPlus } from 'react-icons/go';
import { StyledAddNewEventButton } from './AddNewEventButton_styles';

const AddNewEventButton = ( { openDrawer } ) => {
   return (
      <StyledAddNewEventButton onClick={ openDrawer } >
         <abbr title="New Event">
            <GoPlus />
         </abbr>
      </StyledAddNewEventButton>
   );
};

AddNewEventButton.propTypes = {
   openDrawer: PropTypes.func.isRequired,
};

export default AddNewEventButton;
