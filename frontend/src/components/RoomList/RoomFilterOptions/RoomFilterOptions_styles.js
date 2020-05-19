import styled from 'styled-components/macro';
import { darken } from 'polished';

export const StyledRoomFilterOptions = styled.div`
   max-width: 600px;
   margin: 0 10px 5px 10px;

   border: 2px solid ${( { theme } ) => darken( 0.1, theme.primary )};
   border-radius: 20px;
   padding: 18px 18px 0 18px;
`;
