import styled from 'styled-components/macro';

export const StyledEventModal = styled.div`
   position: fixed;
   top: 20vh;
   width: 80vh;
   max-width: 600px;
   left: 50vw;
   transform: translateX(-50%);
   z-index: 1000;
   text-align: center;
   background: ${( props ) => props.theme.white};
   border-radius: 30px;
   /* padding: 20px; */
   overflow: hidden;
   border: 3px solid ${( props ) => props.theme.primary};
`;

export const ModalEventName = styled.p`
margin: 0;
padding: 20px;
   background: ${( props ) => props.theme.primary};
   font-size: ${( props ) => props.theme.font.size.m};
`;

export const ModalEventDescription = styled.div`
padding: 20px;
`;
