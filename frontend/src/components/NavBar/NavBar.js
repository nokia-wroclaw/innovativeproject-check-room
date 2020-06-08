import React, {
   useState,
   useEffect,
   useContext,
   useRef,
   useReducer,
} from 'react';
import MyGoogleLogin from './Google/MyGoogleLogin';
import MyGoogleName from './Google/MyGoogleName';
import MyGoogleLogout from './Google/MyGoogleLogout';
import BackendContext from '../../services/communication/BackendContext';

import {
   HeaderWrapper,
   StyledHeader,
   NavList,
   NavItem,
   NavLink,
   NavButton,
   HeaderBrand,
   StyledNav,
   NavNestedItem,
   DropdownLink,
   DropdownMenu,
   DropdownMenuItem,
   DropdownButton,
} from './NavBar_styles';
import Hamburger from './Hamburger/Hamburger';

const NavBar = () => {
   const backend = useContext( BackendContext );

   const [ isMenuOpen, setIsMenuOpen ] = useState( false );
   const handleMenuClick = () => setIsMenuOpen( !isMenuOpen );
   const closeMenu = () => setIsMenuOpen( false );
   const [ isUserDropdownOpen, toggleIsUserDropdownOpen ] = useReducer(
      ( state ) => !state,
      false
   );

   const handleKeyboard = ( e ) => {
      const code = e.keyCode;

      if ( code === 27 ) {
         setIsMenuOpen( false );
      }
   };

   const navRef = useRef( null );

   const closeIfClickOutside = ( e ) => {
      if ( !navRef.current.contains( e.target ) ) setIsMenuOpen( false );
   };

   useEffect( () => {
      window.addEventListener( 'keydown', handleKeyboard );
      document.addEventListener( 'mousedown', closeIfClickOutside );

      return () => {
         window.removeEventListener( 'keypress', handleKeyboard );
         document.removeEventListener( 'mousedown', closeIfClickOutside );
      };
   }, [] );

   const canManageUsers = backend.auth.can( 'manage users' );
   const canManageRooms = backend.auth.can( 'manage rooms' );

   return (
      <StyledHeader ref={ navRef }>
         <HeaderWrapper>
            <HeaderBrand onClick={ closeMenu } to="/">
               Checkroom
            </HeaderBrand>
            <Hamburger onClick={ handleMenuClick } isOpen={ isMenuOpen } />
            <StyledNav isOpen={ isMenuOpen }>
               <NavList isOpen={ isMenuOpen }>
                  <NavItem>
                     <NavLink onClick={ closeMenu } to="/">
                        Rooms
                     </NavLink>
                  </NavItem>
                  <MyGoogleLogin
                     render={ ( renderProps ) => (
                        <NavItem>
                           <NavButton
                              onClick={ () => {
                                 renderProps.onClick();
                                 closeMenu();
                              } }
                              disabled={ renderProps.disabled }
                           >
                              Log in with Google
                           </NavButton>
                        </NavItem>
                     ) }
                  />
                  <MyGoogleName
                     render={ ( renderProps ) => (
                        <NavNestedItem>
                           <NavButton onClick={ toggleIsUserDropdownOpen }>
                              { renderProps.name }
                           </NavButton>

                           <DropdownMenu isOpen={ isUserDropdownOpen }>
                              { canManageUsers ? (
                                 <DropdownMenuItem>
                                    <DropdownLink
                                       onClick={ () => {
                                          toggleIsUserDropdownOpen();
                                          closeMenu();
                                       } }
                                       to="/admin/users"
                                    >
                                       Manage users
                                    </DropdownLink>
                                 </DropdownMenuItem>
                              ) : null }

                              { canManageRooms ? (
                                 <DropdownMenuItem>
                                    <DropdownLink
                                       onClick={ () => {
                                          toggleIsUserDropdownOpen();
                                          closeMenu();
                                       } }
                                       to="/admin/rooms"
                                    >
                                       Manage rooms
                                    </DropdownLink>
                                 </DropdownMenuItem>
                              ) : null }

                              <MyGoogleLogout
                                 render={ ( renderProps2 ) => (
                                    <DropdownMenuItem>
                                       <DropdownButton
                                          onClick={ () => {
                                             renderProps2.onClick();
                                             toggleIsUserDropdownOpen();
                                             closeMenu();
                                          } }
                                          disabled={ renderProps2.disabled }
                                       >
                                          Log out
                                       </DropdownButton>
                                    </DropdownMenuItem>
                                 ) }
                              />
                           </DropdownMenu>
                        </NavNestedItem>
                     ) }
                  />
               </NavList>
            </StyledNav>
         </HeaderWrapper>
      </StyledHeader>
   );
};

export default NavBar;
