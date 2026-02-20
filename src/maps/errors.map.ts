export default {
  data: {
    body: {
      missing: [0, 0, 1],
      wrongFormat: [0, 0, 2],
    },
  },
  auth: {


    register: {


      username: {
        invalid: {
          length: [1, 0, 0, 0, 1],
          characters: [1, 0, 0, 0, 2],
          
        },
        taken: [1, 0, 0, 1],
      },


       password: {
        invalid: {
          length: [1, 0, 1, 0, 1],
          characters: [1, 0, 1, 0, 2],
        },
      },


      email: {
        invalid: {
          format: [1, 0, 2, 0, 1],
        },
        taken: [1, 0, 2, 1],
      },
    },
  },
};
