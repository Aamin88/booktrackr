const request = require("supertest");
const app = require("../index");
const db = require("../config/db");
const seedDB = require("../config/seed");
const { faker } = require("@faker-js/faker");

beforeEach(async () => {
  await db.connect();
  await seedDB();
});

afterEach(async () => {
  await db.close();
});

describe("GET /books", () => {
  it("should return all books", async () => {
    const res = await request(app).get("/books");

    expect(res.statusCode).toBe(200);
    expect(res.body.books.length).toBeGreaterThan(0);
    expect(res.body.books[0]).toHaveProperty(
      "title",
      "author",
      "genre",
      "description",
      "dateOfPublication"
    );
  });
});

describe("GET /books/:id", () => {
  it("should return a book record", async () => {
    const res = await request(app).get("/books/66663e5313f73057be453736");
    expect(res.statusCode).toBe(200);
    console.log(res.body);
    // expect(res.body.book.title).toBe("Modern Granite Towels");
    // expect(res.body.book).toHaveProperty(
    //   "_id",
    //   "title",
    //   "author",
    //   "genre",
    //   "description",
    //   "dateOfPublication"
    // );
  });
});

describe("POST /books", () => {
  it("should create new books record", async () => {
    const res = await request(app).post("/books").send({
      _id: "6659a0be8bde7eb1dc858a05",
      title: faker.word.noun(),
      author: faker.person.fullName(),
      description:
        "The book to help brigde the gap between the best of yourself",
      genre: faker.hacker.noun(),
      coverImg: "https://storage.googleapis.com/aminmakes/Removal-326.png",
      dateOfPublication: faker.date.past(),
    });

    console.log(res.body);

    // expect(res.statusCode).toBe(201);
    // expect(res.body.book._id).toBe("6659a0be8bde7eb1dc858a05");
    // expect(res.body.book).toHaveProperty(
    //   "_id",
    //   "title",
    //   "author",
    //   "genre",
    //   "coverImg",
    //   "description",
    //   "dateOfPublication"
    // );
  });
});

describe("PUT /books/:id", () => {
  it("should update a book record", async () => {
    const genre = faker.hacker.adjective();
    const res = await request(app)
      .put("/books/66663e5313f73057be453739")
      .send({ genre });
    expect(res.statusCode).toBe(200);
    expect(res.body.updatedRecord).toHaveProperty(
      "title",
      "author",
      "genre",
      "description",
      "dateOfPublication"
    );
    expect(res.body.updatedRecord.genre).toBe(genre);
  });
});

describe("Delete /books/:id", () => {
  it("should delete a book record", async () => {
    const res = await request(app).delete("/books/66663e5313f73057be453740");
    expect(res.statusCode).toBe(204);
  });
});
