import chai from "chai";
import AuthService, { IRequest } from "./auth";

describe("signup with different arguments", () => {
  it("signup throws error on empty email", () => {
    chai.expect(() => { AuthService.signup("", "1233", {} as IRequest); })
      .throws("You must provide an email and password.");
  });

  it("signup throws error on empty password", () => {
    chai.expect(() => { AuthService.signup("asd", "", {} as IRequest); })
      .throws("You must provide an email and password.");
  });
});
