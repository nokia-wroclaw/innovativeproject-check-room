import styled from 'styled-components/macro';

export const StyledRoomHeader = styled.div`
  max-width: 400px;
  margin: 20px auto 0 auto;
  text-align: center;
`;

export const RoomTitle = styled.h2`
   font-size: ${( { theme } )=>theme.font.size.l};
   margin: 0;
`;
