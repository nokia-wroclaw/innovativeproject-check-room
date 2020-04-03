import styled from 'styled-components';

export const StyledDayName = styled.div`
   text-align: center;
   grid-column: 2/3;
   grid-row: 1/2;
   p {
      font-size: ${( { theme } ) => theme.font.size.s};
      ${( { theme } ) => theme.mdq.lg} {
         font-size: ${( { theme } ) => theme.font.size.m};
      }
      margin: 0 0 5px 0;
   }

   p:first-of-type {
      font-weight: ${( { theme } ) => theme.font.weight.semiBold};
   }
`;
