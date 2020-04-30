import React from 'react';
import PropTypes from 'prop-types';
import { RiQrCodeLine } from 'react-icons/ri';
import { StyledQrCodeButton } from './QrCodeButton_styles';

const QrCodeButton = ( { id } ) => {
   return (
      <StyledQrCodeButton to={ `./${id}/qrCode` }>
         <abbr title="Seats">
            <RiQrCodeLine />
         </abbr>
      </StyledQrCodeButton>
   );
};

QrCodeButton.propTypes = {
   id: PropTypes.string.isRequired,
};

export default QrCodeButton;
