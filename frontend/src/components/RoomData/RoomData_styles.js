import styled from 'styled-components/macro';

export const StyledRoomData = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const RoomDescription = styled.div`
  margin: 10px;
`;

export const RoomLocation = styled.div`
  font-style: italic;
  margin: 10px;
  margin-top: auto;
`;

export const RoomIndicators = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Indicator = styled.div`
  margin: 0 10px;

  display: flex;
  align-items: center;

  abbr {
    display: flex;
  }

  svg {
    margin: 0 5px;
    color: ${( { active, theme } ) => active ? theme.primary : 'gray'};
  }
`;
