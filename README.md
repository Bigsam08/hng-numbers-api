# Number classification API

This project is an API built with **Express** that returns interesting mathematical properties of a given number along with a fun fact retrieved from [Numbers API](http://numbersapi.com). The API provides information like whether a number is an **Armstrong number**, whether it is **even** or **odd**, and more.

## Features

- **Armstrong Number Check**: Checks if a given number is an Armstrong number.
- Even/Odd Check**: Determines whether the number is even or odd.
- Sum of given digit(s)
- isPerfectNumber
- isPrimeNumber
- Fun Math Fact**: Fetches a fun mathematical fact for the given number from [Numbers API](http://numbersapi.com).

## Endpoints

### `GET /api/classify-number`

Returns a JSON object with the mathematical properties of the given number, along with a fun fact.

#### Request
- example
- Response in JSON
- Status(200) Ok

```http
GET https://hng-numbers-api-4rfp.onrender.com/api/classify-number?371


{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": [
    "armstrong",
    "odd"
  ],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number"
}
```

#### Error json Response
- passing a non integer (status 400) Bad request

```http
GET https://hng-numbers-api-4rfp.onrender.com/api/classify-number?number=alphabet
{
  "number": "alphabet",
  "error": true
}
```

## Set up / dependencies installation
- npm init -y ( in your  project folder)
- npm install node
- npm install cors axios express

- create a server.js (main server entry)
- create a folder called routes touch <file_name> and create the endpoint there
- import the module to the server file using (app.use())
- node server.js (run server)


## Tesing API
- curl "https://hng-numbers-api-4rfp.onrender.com/api/classify-number?number=<your-number>"
- also you can use https://hng-numbers-api-4rfp.onrender.com/api/classify-number?number=<your-number>
- to run on localhost use http://localhost:<your-running-port>/api/classify-number?number=<your-number>
