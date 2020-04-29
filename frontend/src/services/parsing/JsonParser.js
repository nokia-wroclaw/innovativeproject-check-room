class JsonParser {
   static parseOrDefault( text, fallback ) {
      try {
         return JSON.parse( text );
      }
      catch ( e ) {
         return fallback;
      }
   }

   static parse( text ) {
      try {
         return JSON.parse( text );
      }
      catch ( e ) {
         throw new Error( `Not JSON: ${text}` );
      }
   }
};

export default JsonParser;
