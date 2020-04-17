// babel-plugin-macros.config.js
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
   styledComponents: {
      fileName: isDev,
      displayName: isDev
   }
};