import styled from 'styled-components';

export const StyledEventList = styled.div`
   margin: 0 25px;
   display: grid;
   grid-template-columns: 1fr;
   ${( { theme } ) => theme.mdq.lg} {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
   }
`;
