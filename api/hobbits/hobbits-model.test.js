const db = require("../../data/dbConfig");
const Hobbit = require("./hobbits-model");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});

test("environment is testing", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("getAll", () => {
  test("resolves all the hobbits in the table", async () => {
    const result = await Hobbit.getAll();
    console.log(result);
    expect(result).toHaveLength(4);
    expect(result[0]).toMatchObject({ name: "sam" });
  });
});
describe("getById", () => {
  test("resolves the hobbit by the given id", async () => {
    let result = await Hobbit.getById(1);
    expect(result).toMatchObject({ name: "sam" });
    result = await Hobbit.getById(2);
    expect(result).toMatchObject({ name: "frodo" });
    result = await Hobbit.getById(3);
    expect(result).toMatchObject({ name: "pippin" });
    result = await Hobbit.getById(4);
    expect(result).toMatchObject({ name: "merry" });
  });
  describe("insert", () => {
    const bilbo = { name: "bilbo" };
    test("resolves the newly created hobbit", async () => {
      const result = await Hobbit.insert(bilbo);
      expect(result).toMatchObject(bilbo);
    });
    test("adds a hobbit to the hobbits table", async () => {
      await Hobbit.insert(bilbo);
      const records = await db("hobbits");
      expect(records).toHaveLength(5);
    });
  });
});
