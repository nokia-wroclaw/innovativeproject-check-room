class JsonParser {
   static parseOrDefault( text, fallback ) {
      let result;

      try {
         result = JSON.parse( text );
      }
      catch ( e ) {
         result = fallback;
      }

      return result;
   }

   static parse( text ) {
      let result;

      try {
         result = JSON.parse( text );
      }
      catch ( e ) {
         throw new Error( `Not JSON: ${text}` );
      }

      return result;
   }
};

export default JsonParser;
