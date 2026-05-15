const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const { calculateDiscountedPrice } = require("../helpers");

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET /api/books", () => {
  it("should return a list of all books with status 200", (done) => {
    chai.request(app).get("/api/books").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.books).to.be.an("array");
      expect(res.body.books.length).to.be.greaterThan(0);
      done();
    });
  });

  it("should return books with id, title, author, and price fields", (done) => {
    chai.request(app).get("/api/books").end((err, res) => {
      const book = res.body.books[0];
      expect(book).to.have.property("id");
      expect(book).to.have.property("title");
      expect(book).to.have.property("author");
      expect(book).to.have.property("price");
      done();
    });
  });

  it("should return 404 when a book ID does not exist", (done) => {
    chai.request(app).get("/api/books/9999").end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal("Book not found");
      done();
    });
  });

  it("should return 400 when adding a book with missing fields", (done) => {
    chai.request(app).post("/api/books").send({ title: "Incomplete Book" }).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body.success).to.equal(false);
      done();
    });
  });
});

describe("calculateDiscountedPrice()", () => {
  it("should return the correct price after applying a discount", () => {
    expect(calculateDiscountedPrice(100, 20)).to.equal(80);
  });

  it("should return the original price when discount is 0", () => {
    expect(calculateDiscountedPrice(50, 0)).to.equal(50);
  });

  it("should return 0 when discount is 100%", () => {
    expect(calculateDiscountedPrice(99.99, 100)).to.equal(0);
  });

  it("should throw an error when price is negative", () => {
    expect(() => calculateDiscountedPrice(-10, 20)).to.throw("Price cannot be negative");
  });

  it("should throw an error when discount is greater than 100", () => {
    expect(() => calculateDiscountedPrice(50, 150)).to.throw("Discount must be between 0 and 100");
  });

  it("should round the result to 2 decimal places", () => {
    expect(calculateDiscountedPrice(10, 33)).to.equal(6.7);
  });
});