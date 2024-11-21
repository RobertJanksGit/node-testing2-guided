const db = require("../data/dbConfig");
const request = require("supertest");
const server = require("./server.js");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

describe("[GET] /hobbits", () => {
  test("responds with 200 OK", async () => {
    const res = await request(server).get("/hobbits");
    expect(res.status).toBe(200);
  });
});
describe("[POST] /hobbits", () => {
  const bilb = { name: "bilbo" };
  test("adds a bobbit to the database", async () => {
    await request(server).post("/hobbits").send(bilbo);
    expect(await db("hobbits")).toHaveLength(5);
  });
  test("responds with the new hobbit", async () => {
    const res = await request(server).post("/hobbits").send(bilbo);
    expect(res.body).toMatchObject(bilbo);
  });
});
