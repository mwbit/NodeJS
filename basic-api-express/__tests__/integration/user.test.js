const request = require("supertest");
const app = require("../../app");

let token;

beforeAll(done => {
  request(app)
    .post("/signin")
    .send({
      email: "teste@teste.com",
      password: "123456"
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe("Test the users path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
