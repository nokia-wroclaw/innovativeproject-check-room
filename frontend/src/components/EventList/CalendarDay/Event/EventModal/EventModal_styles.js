import styled from 'styled-components/macro';


export const StyledEventModal = styled.div`
  position: fixed;
  top: 20vh;
  left: 20vw;
  right: 20vw;
  z-index: 1000;
  text-align: center;
  background: ${( props ) => props.theme.primary};
  color: ${( props ) => props.theme.white};
  border-radius: 30px;
  padding: 20px;
`;

export const ModalEventName = styled.p`
   font-size: ${( props ) => props.theme.font.size.m};
`;


export const ModalEventLink = styled.a`
   color: ${( props ) => props.theme.white};
`;
