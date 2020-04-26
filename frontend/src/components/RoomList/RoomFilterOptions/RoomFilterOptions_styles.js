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

   ${( { theme } ) => theme.mdq.md} {
      grid-template-columns: 1fr 1fr;
   }
`;

export const Field = styled.label`
   text-align: center;

   input[type="search"],
   input[type="number"] {
      width: 200px;
      margin-left: 15px;

      padding: 10px;
      border: solid 1px #b1b1b1;
      border-radius: 5px;
   }
`;
