import styled, { css }  from 'styled-components/macro';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
   position: fixed;
   z-index: 100;
   width: 100%;
   height: 70px;
   background-color: ${( { theme } ) => theme.primary};
`;

export const HeaderWrapper = styled.div`
   width: 100%;
   max-width: ${( { theme } ) => theme.maxWidth};
   margin: 0 auto;
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px 10%;
   ${( props ) => props.theme.mdq.sm} {
      justify-content: space-around;
      padding: 5px 10px;
   }
`;

export const HeaderBrand = styled( Link )`
   position: relative;
   font-size: ${( { theme } ) => theme.font.size.l};
   font-weight: ${( { theme } ) => theme.font.weight.semiBold};
   color: ${( { theme } ) => theme.white};
   text-align: center;
   text-decoration: none;
   :focus {
      color: ${( { theme } ) => theme.white};
   }
`;

export const StyledNav = styled.nav`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-around;
   position: fixed;
   top: 70px;
   left: 0;
   width: 100%;
   background-color: ${( { theme } ) => theme.primary};
   transform-origin: center 0;
   opacity: ${( { isOpen } ) => ( isOpen ? 1 : 0 )};
   transform: translateX(${( { isOpen } ) => ( isOpen ? 0 : 100 )}%);
   transition: opacity 0.4s, transform 0s ${( { isOpen } ) => ( isOpen ? 0 : 0.5 )}s;

   ${( props ) => props.theme.mdq.md} {
      width: auto;
      position: static;
      flex-direction: row;
      transform: none;
      transition: none;
      opacity: 1;
   }
`;

export const NavList = styled.ul`
   width: 100%;
   padding: 0;
   margin: 0 20px;
   list-style: none;
   display: flex;
   flex-direction: column;
   transform: translateX(${( { isOpen } ) => ( isOpen ? 0 : 100 )}%);
   transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
   ${( props ) => props.theme.mdq.md} {
      flex-direction: row;
      transform: none;
      transition: none;
   }
`;

export const NavItem = styled.li`
   text-align: center;
`;

export const NavNestedItem = styled.li`
   position: relative;
   text-align: center;
`;

export const NavLink = styled( Link )`
   display: block;
   width: 100%;
   height: 100%;
   padding: 30px 20px;
   ${( { theme } ) => theme.mdq.md} {
      padding: 15px 20px;
   }
   text-decoration: none;
   color: ${( { theme } ) => theme.white};
`;

export const NavButton = styled.a`
   display: block;
   width: 100%;
   height: 100%;
   padding: 30px 20px;
   ${( { theme } ) => theme.mdq.md} {
      padding: 15px 20px;
   }
   text-decoration: none;
   color: ${( { theme } ) => theme.white};

   cursor: pointer;
   &[disabled] {
      color: ${( { theme } ) => theme.white};
   }
`;

export const DropdownMenu = styled.div`
   min-width: 100%;
   background-color: ${( { theme } ) => theme.white};
   font-size: ${( { theme } ) => theme.font.size.s};
   border-radius: 0 0 10px 10px;
   border: 3px solid ${( { theme } ) => theme.primary};
   transition: max-height 0.3s ease;
   max-height: ${( { isOpen } ) => ( isOpen ? '600px' : 0 )};
   overflow: hidden;
   position: absolute;
   left: 0;
   top: 100%;
`;

export const DropdownMenuItem = styled.div`
   text-align: center;
   display: block;
   background: none;
   border: none;
   transition: color 0.3s;
   cursor: pointer;
   color: ${( { theme } ) => theme.text};
   :hover {
      color: ${( { theme } ) => theme.primary};
   }
`;

const dropdownNodeStyles = css`
   text-align: center;
   display: block;
   width: 100%;
   padding: 10px 5px;
   background: none;
   border: none;
   transition: color 0.3s;
   cursor: pointer;
   :hover {
      color: ${( { theme } ) => theme.primary};
   }
`;

export const DropdownButton = styled.button`
   ${dropdownNodeStyles}
`;

export const DropdownLink = styled( Link )`
   ${dropdownNodeStyles}
`;
