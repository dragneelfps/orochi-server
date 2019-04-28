export default {
  getProfileRepository: (): any => {
    return {
      Profile: {
        dob: (profile) => "dob",
      }
    };
  }
};
