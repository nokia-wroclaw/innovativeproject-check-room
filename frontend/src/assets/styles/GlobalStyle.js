import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
   
   body {
      margin: 0;
      padding: 0;
      font-family: "Open Sans";
      font-size: ${( { theme } ) => theme.font.size.s};
   }
  

   html {
      font-size: 62.5%;
      scroll-behavior: smooth;
   }

   *, *::before, *::after {
      box-sizing: border-box;
   }

   h1 { 
      font-weight: ${( { theme } ) => theme.font.weight.bold};
      
   }

   h2, h3 {
      font-weight: ${( { theme } ) => theme.font.weight.semiBold};
   }

   a {
      color: ${( { theme } ) => theme.link};
   }
`;

export default GlobalStyle;