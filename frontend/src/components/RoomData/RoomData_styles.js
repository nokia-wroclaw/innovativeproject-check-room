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
  font-size: 0.8em;
  margin-bottom: 2px;
`;

export const Bottom = styled.div`
  margin-top: auto;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${( { theme } ) => theme.primary };
  margin-bottom: 5px;
`;

export const RoomIndicators = styled.div`
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
