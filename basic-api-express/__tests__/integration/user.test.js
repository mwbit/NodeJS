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
    .end((err, res) => {
      token = res.body.token; // save the token!
      done();
    });
});

describe("Test the users path", () => {
  it("It should response the get method", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("It should response the getById method", async () => {
    const res = await request(app)
      .get("/users/1")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
  });

  it("It should response the getById method return empty", async () => {
    const res = await request(app)
      .get("/users/1000")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toEqual(undefined);
  });
});
