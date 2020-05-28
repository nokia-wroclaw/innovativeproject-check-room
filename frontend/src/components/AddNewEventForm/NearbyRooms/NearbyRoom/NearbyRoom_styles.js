import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const NearbyRoomLink = styled( Link )`
   color: black;
   border: 1px solid ${( { theme } ) => darken( 0.1, theme.primary )};
   margin: 10px;
   border-radius: 30px;
`;
