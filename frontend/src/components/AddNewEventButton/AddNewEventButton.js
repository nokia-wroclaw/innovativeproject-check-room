import React from 'react';
import PropTypes from 'prop-types';
import { GoPlus } from 'react-icons/go';
import { StyledAddNewEventButton } from './AddNewEventButton_styles';

const AddNewEventButton = ( { id } ) => {
   return (
      <StyledAddNewEventButton to={ `./${id}/add` }>
         <abbr title="New Event">
            <GoPlus />
         </abbr>
      </StyledAddNewEventButton>
   );
};

AddNewEventButton.propTypes = {
   id: PropTypes.string.isRequired,
};

export default AddNewEventButton;
