import styled from 'styled-components/macro';

export const StyledEventList = styled.div`
   margin: 0 25px;
   padding-bottom: 30px;
   display: grid;
   grid-template-columns: ${( { isCompact } ) => ( isCompact ? '30px' : '' )} repeat(
      auto-fit,
      minmax(${( { isCompact } ) => ( isCompact ? '25px' : '250px' )}, 1fr)
   );
`;

export const Hours = styled.div`
   display: grid;
   width: 100%;
   grid-template-columns: auto;

   overflow: hidden;
   grid-template-rows: ${( { hourRangeWhenNotFullDay: hours } ) =>
      `auto repeat(${hours[0] * 4}, 0)
            repeat(${( hours[1] - hours[0] + 1 ) * 4}, 15px)
            repeat(${( 24 - hours[1] - 1 ) * 4}, 0px)`};
`;
