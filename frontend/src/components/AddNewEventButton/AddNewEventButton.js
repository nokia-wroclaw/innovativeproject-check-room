import React from 'react';
import { GoPlus } from 'react-icons/go';
import { StyledAddNewEventButton } from './AddNewEventButton_styles';

const AddNewEventButton = ( { openDrawer } ) => {
   return (
      <StyledAddNewEventButton onClick = { openDrawer } >
         <abbr title="New Event">
            <GoPlus />
         </abbr>
      </StyledAddNewEventButton>
   );
};

export default AddNewEventButton;
