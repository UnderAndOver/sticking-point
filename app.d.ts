declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = {
    name: string;
    email: string;
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
