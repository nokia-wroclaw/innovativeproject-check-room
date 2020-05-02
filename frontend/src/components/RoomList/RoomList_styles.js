import styled from 'styled-components/macro';

export const StyledRoomList = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FilteredRoomList = styled.ul`
  width: 100%;
  max-width: 800px;
  padding: 5px 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 10px;
  align-items: center;
  grid-auto-rows: minmax(min-content, max-content);

  list-style: none;
`;
