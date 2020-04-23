import styled from 'styled-components/macro';

export const StyledRoomData = styled.div`
  max-width: 400px;
  margin: 20px auto ;
  text-align: center;

`;

export const RoomTitle = styled.h2`
   font-size: ${( { theme } )=>theme.font.size.l};
   margin: 10px;
`;

export const RoomDescription = styled.div`
  margin: 10px;
`;

export const RoomLocation = styled.div`
  font-style: italic;
  margin: 10px;
`;

export const RoomIndicators = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Indicator = styled.div`
  margin: 0 10px;
`;
