import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';


export const StyledEventListItem = styled.li`
   width: 100%;
   max-width: 600px;
   margin-bottom: 10px;
   &:last-child{
      margin-bottom: 0;  
   }
`;


export const EventLink = styled.a`
   display: flex;
   flex-direction: column;
   justify-content: center;
   border: 2px solid ${( { theme } ) =>darken( 0.1, theme.primary )};
   border-radius: 20px;
   overflow: hidden;
   color: ${( { theme } ) => theme.text};
   text-decoration: none;
`;

export const EventHeader = styled.div`
   width: 100%;
   padding: 10px 15px;
   background-color: ${( { theme } ) =>  theme.primary };
   color: ${( { theme } ) => theme.white};
   /* font-size: ${( { theme } ) => theme.font.size.m}; */
   border-bottom: 2px solid ${( { theme } ) => darken( 0.1, theme.primary )};
   text-align: center;
`;

export const EventDescription = styled.div`
   padding: 15px
`;

export const DateItem = styled.p`
   margin: 0;
`;
