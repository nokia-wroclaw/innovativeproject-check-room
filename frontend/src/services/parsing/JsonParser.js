const JsonParser = {
   parse: ( text, fallback ) => {
      let result;

      try {
         result = JSON.parse( text );
      }
      catch ( e ) {
         result = fallback;
      }

      return result;
   }
};

export default JsonParser;
