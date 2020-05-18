import React, { useState, useEffect } from 'react';
import MyGoogleLogin from './Google/MyGoogleLogin';
import MyGoogleName from './Google/MyGoogleName';
import MyGoogleLogout from './Google/MyGoogleLogout';

import {
   HeaderWrapper,
   StyledHeader,
   NavList,
   NavItem,
   NavLink,
   NavButton,
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

      return () => {
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
                  <MyGoogleLogin
                     render={ ( renderProps ) =>
                        <NavItem>
                           <NavButton onClick={ renderProps.onClick } disabled={ renderProps.disabled }>
                              Log in with Google
                           </NavButton>
                        </NavItem>
                     } />
                  <MyGoogleName
                     render={ ( renderProps ) =>
                        <NavItem>
                           <NavButton disabled>{ renderProps.name }</NavButton>
                        </NavItem>
                     } />
                  <MyGoogleLogout
                     render={ ( renderProps ) =>
                        <NavItem>
                           <NavButton onClick={ renderProps.onClick } disabled={ renderProps.disabled }>
                              Log out
                           </NavButton>
                        </NavItem>
                     } />
               </NavList>
            </StyledNav>
         </HeaderWrapper>
      </StyledHeader>
   );
};

export default NavBar;
