# Book Tracker API

Welcome to the Book Tracker API! This API is designed to help users track books they have read. The project is built using Node.js and Express, and it is fully tested with Jest and Supertest.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add new books to the already existing reading list.
- Retrieve a list of books read.
- Update details of books.
- Delete books from the list.
- Fully tested with Jest and Supertest.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Aamin88/book-track-api.git
   cd book-tracker-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root of the project and add your environment variables. For example:

   ```env
   PORT = 3000
   MONGO_URI = mongodb URI for connection
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage

Once the application is running, you can use tools like Postman or cURL to interact with the API.

## API Endpoints

### Books

#### Get all books

- **URL:** `/api/books`
- **Method:** `GET`
- **Description:** Retrieve a list of all books read by the user.
- **Response**:

```json
{
  "status": "ok",
  "book": {
    "_id": "661663bbf34650b1ebed0c5c",
    "title": "The mantle of the Man",
    "author": "Henry ",
    "dateOfPublication": "2020-01-01T00:00:00.000Z",
    "genre": "fiction",
    "__v": 0,
    "description": "Cool book"
  }
}
```

#### Get a book by ID

- **URL:** `/api/books/:id`
- **Method:** `GET`
- **Description:** Retrieve details of a specific book by its ID.

#### Add a new book

- **URL:** `/api/books`
- **Method:** `POST`
- **Description:** Add a new book to the books.
- **Request Body:**
  ```json
  {
    "title": "The mantle of the Man",
    "author": "Henry ",
    "dateOfPublication": "2020-01-01T00:00:00.000Z",
    "genre": "fiction",
    "description": "Cool book"
  }
  ```

#### Update a book

- **URL:** `/api/books/:id`
- **Method:** `PUT`
- **Description:** Update details of a specific book.
- **Request Body:**
  ```json
  {
    "title": "The mantle of the Man",
    "author": "Henry Me",
    "dateOfPublication": "2020-01-01T00:00:00.000Z",
    "genre": "fiction",
    "description": "Cool book"
  }
  ```

#### Delete a book

- **URL:** `/api/books/:id`
- **Method:** `DELETE`
- **Description:** Delete a book from the books list.

## Testing

This project uses Jest and Supertest for testing. To run the tests, use the following command:

```bash
npm run test
```

## Contribution

Contributions are welcome! Please feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
