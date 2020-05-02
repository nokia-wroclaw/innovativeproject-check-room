import React, { useState, useEffect } from 'react';

import {
   HeaderWrapper,
   StyledHeader,
   NavList,
   NavItem,
   NavLink,
   HeaderBrand,
   StyledNav,
} from './NavBar_styles';
import Hamburger from './Hamburger/Hamburger';

const NavBar = () => {
   const [ isMenuOpen, setIsMenuOpen ] = useState( false );
   const handleMenuClick = () => setIsMenuOpen( !isMenuOpen );

   const handleKeyboard = ( e ) => {
      const code = e.keyCode;

      if ( code === 27 ) {
         setIsMenuOpen( false );
      }
   };

   useEffect( () => {
      window.addEventListener( 'keydown', handleKeyboard );


      return ()=>{
         window.removeEventListener( 'keypress', handleKeyboard );
      };
   }, [] );

   return (
      <StyledHeader>
         <HeaderWrapper>
            <HeaderBrand to="/">Checkroom</HeaderBrand>
            <Hamburger onClick={ handleMenuClick } isOpen={ isMenuOpen } />
            <StyledNav isOpen={ isMenuOpen }>
               <NavList isOpen={ isMenuOpen }>
                  <NavItem>
                     <NavLink to="/">Rooms</NavLink>
                  </NavItem>
               </NavList>
            </StyledNav>
         </HeaderWrapper>
      </StyledHeader>
   );
};

export default NavBar;
