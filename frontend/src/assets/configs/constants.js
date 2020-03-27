const prod = {
   url: {
      API_URL: '/api/',
   },
};
const dev = {
   url: {
      API_URL: 'http://localhost:2000/api/',
   },
};

export const constants = process.env.NODE_ENV === 'development' ? dev : prod;
