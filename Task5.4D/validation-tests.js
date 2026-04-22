const axios = require('axios');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const BASE_URL = 'http://localhost:3000/api/books';
const MONGO_URI = 'mongodb://127.0.0.1:27017/booksDB';

let coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0
};

let total = 0;
let passed = 0;

const uniqueId = Date.now().toString();

function makeValidBook(id) {
  return {
    id: id + uniqueId,
    title: 'Valid Title',
    author: 'Valid Author',
    year: 2020,
    genre: 'Fiction',
    summary: 'This is a valid summary with at least ten characters.',
    price: 29.99
  };
}

function makeValidUpdate() {
  return {
    title: 'Updated Title',
    author: 'Updated Author',
    year: 2021,
    genre: 'Non-Fiction',
    summary: 'Updated summary with sufficient length.',
    price: 39.99
  };
}

function expectErrorStatus(error, expected) {
  if (!error.response) {
    throw new Error(`Expected ${expected}, got no response (${error.message})`);
  }
  if (error.response.status !== expected) {
    throw new Error(`Expected ${expected}, got ${error.response.status}`);
  }
}

async function test(description, testFunction, tags = []) {
  total++;
  try {
    await testFunction();
    console.log(`TEST|PASS|${description}`);
    passed++;
    tags.forEach(tag => coverageTracker[tag]++);
  } catch (error) {
    console.log(`TEST|FAIL|${description}|${error.message}`);
    process.exitCode = 1;
  }
}

async function cleanupTestBooks() {
  try {
    await mongoose.connect(MONGO_URI);
    await Book.deleteMany({ id: { $regex: uniqueId } });
  } catch (err) {
    console.error('Cleanup failed:', err.message);
  } finally {
    await mongoose.disconnect();
  }
}

async function runTests() {

  // T01: Valid create
  await test('T01: Valid book creation', async () => {
    const response = await axios.post(BASE_URL, makeValidBook('test1'));
    if (response.status !== 201) throw new Error(`Expected 201, got ${response.status}`);
  });

  // T02: Duplicate ID
  await test('T02: Duplicate ID on create', async () => {
    try {
      await axios.post(BASE_URL, makeValidBook('test1'));
    } catch (error) {
      expectErrorStatus(error, 409);
    }
  }, ['CREATE_FAIL']);

  // T03: Missing required field
  await test('T03: Missing title on create', async () => {
    const data = makeValidBook('test2');
    delete data.title;
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'REQUIRED']);

  // T04: Invalid type
  await test('T04: Invalid year type on create', async () => {
    const data = makeValidBook('test3');
    data.year = 'invalid';
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'TYPE']);

  // T05: Boundary (year too low)
  await test('T05: Year below minimum on create', async () => {
    const data = makeValidBook('test4');
    data.year = 999;
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'BOUNDARY']);

  // T06: Length violation
  await test('T06: Title exceeds max length on create', async () => {
    const data = makeValidBook('test5');
    data.title = 'a'.repeat(201);
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'LENGTH']);

  // T07: Summary too short
  await test('T07: Summary below min length on create', async () => {
    const data = makeValidBook('test6');
    data.summary = 'short';
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'LENGTH']);

  // T08: Negative price
  await test('T08: Negative price on create', async () => {
    const data = makeValidBook('test7');
    data.price = -10;
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'BOUNDARY']);

  // T09: Invalid ID format
  await test('T09: Invalid ID format on create', async () => {
    const data = makeValidBook('test@invalid');
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL']);

  // T10: Unknown field
  await test('T10: Unknown field on create', async () => {
    const data = { ...makeValidBook('test8'), extra: 'hack' };
    try {
      await axios.post(BASE_URL, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['CREATE_FAIL', 'UNKNOWN_CREATE']);

  // T11: Valid update
  await test('T11: Valid book update', async () => {
    const response = await axios.put(`${BASE_URL}/test1${uniqueId}`, makeValidUpdate());
    if (response.status !== 200) throw new Error(`Expected 200, got ${response.status}`);
  });

  // T12: Update not found
  await test('T12: Update non-existent book', async () => {
    try {
      await axios.put(`${BASE_URL}/notfound`, makeValidUpdate());
    } catch (error) {
      expectErrorStatus(error, 404);
    }
  }, ['UPDATE_FAIL']);

  // T13: Missing field in update
  await test('T13: Update with missing title', async () => {
    const data = makeValidUpdate();
    delete data.title;
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'REQUIRED']);

  // T14: Invalid type update
  await test('T14: Update with invalid year type', async () => {
    const data = { ...makeValidUpdate(), year: 'invalid' };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'TYPE']);

  // T15: Future year
  await test('T15: Update with year in future', async () => {
    const data = { ...makeValidUpdate(), year: new Date().getFullYear() + 5 };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'TEMPORAL']);

  // T16: Title too long
  await test('T16: Update with title too long', async () => {
    const data = { ...makeValidUpdate(), title: 'a'.repeat(201) };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'LENGTH']);

  // T17: Summary too short
  await test('T17: Update with summary too short', async () => {
    const data = { ...makeValidUpdate(), summary: 'short' };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'LENGTH']);

  // T18: Negative price
  await test('T18: Update with negative price', async () => {
    const data = { ...makeValidUpdate(), price: -5 };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'BOUNDARY']);

  // T19: Unknown field update
  await test('T19: Update with unknown field', async () => {
    const data = { ...makeValidUpdate(), extra: 'hack' };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'UNKNOWN_UPDATE']);

  // T20: Immutable ID
  await test('T20: Attempt to update ID', async () => {
    const data = { ...makeValidUpdate(), id: 'newid' };
    try {
      await axios.put(`${BASE_URL}/test1${uniqueId}`, data);
    } catch (error) {
      expectErrorStatus(error, 400);
    }
  }, ['UPDATE_FAIL', 'IMMUTABLE']);

  // FINAL OUTPUT
  console.log(`SUMMARY|${passed}|${total}`);

  const coverage = Object.entries(coverageTracker)
    .map(([k, v]) => `${k}:${v}`)
    .join(',');

  console.log(`COVERAGE|${coverage}`);
}

runTests()
  .catch(err => {
    console.error('Test runner error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await cleanupTestBooks();
  });