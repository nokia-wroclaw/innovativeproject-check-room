import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledAddNewEventButton = styled( Link )`
   margin: 0 10px;

   display: flex;
   align-items: center;

   abbr {
      display: flex;
      cursor: pointer;
   }

   svg {
      margin: 0 5px;
      height: 40px;
      width: 40px;
      color: ${( { theme } ) => theme.primary};
   }
`;
