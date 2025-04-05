import * as user from "../user.js";

describe("These are the basic CRUD operations for a user", () => {
  it("should create a user", async () => {
    const req = {
      body: {
        username: "hello",
        password: "hi",
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    user.createNewUser(req, res, () => {});
  });
});
