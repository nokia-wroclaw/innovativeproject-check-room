const prod = {
   url: {
      API_URL: '/api/',
   },
   google: {
      CLIENT_ID: '1021117011811-bghbdvuk8bppi3mhp5js5t3o78sp7e80.apps.googleusercontent.com',
   },
   exposeDebugTools: false,
};

const dev = {
   url: {
      API_URL: 'http://localhost:2000/api/',
   },
   google: {
      CLIENT_ID: '1021117011811-5476ii0amk1g82m4ldqj5okdoh7e84on.apps.googleusercontent.com',
   },
   exposeDebugTools: true,
};

export const constants = process.env.NODE_ENV === 'development' ? dev : prod;
