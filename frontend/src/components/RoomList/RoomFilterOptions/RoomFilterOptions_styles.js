import styled from 'styled-components/macro';
import { darken } from 'polished';

export const StyledRoomFilterOptions = styled.div`
   width: 100%;
   max-width: 600px;

   border: 2px solid ${( { theme } ) => darken( 0.1, theme.primary )};
   border-radius: 20px;
   padding: 20px;

   display: grid;
   grid-gap: 10px;

   ${( { theme } ) => theme.mdq.sm} {
      grid-template-columns: 1fr 1fr;
      label {
         justify-content: center;
      }
   }
`;
