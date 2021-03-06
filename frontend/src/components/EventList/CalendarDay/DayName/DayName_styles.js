import styled from 'styled-components/macro';

export const StyledDayName = styled.div`
   text-align: center;

   p {
      font-size: ${( { theme } ) => theme.font.size.s};
      ${( { theme } ) => theme.mdq.lg} {
         font-size: ${( { theme } ) => theme.font.size.m};
      }
      margin: 0;
   }

   p:first-of-type {
      font-weight: ${( { theme } ) => theme.font.weight.semiBold};
   }
`;
