/**
 * This is a module for the numbers api
 * this is the endpoint url for the number api
 * this creates an express router which is then sent to to server
 */
const express = require("express");
const axios = require("axios");

const router = express.Router(); // creates a router instance

/**
 *
 * @param number
 * @returns boolean (true: if its is divisible by itself and 1) or false if its not
 */
const is_prime = (number) => {
  if (number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
};

/**
 * Perfect Nummber is a positive integer
 * and is equal to the sum of its divisors other than itself
 * e.g 6 = 1 + 2 + 3
 */
const is_perfect = (number) => {
  if (number <= 1) return false;
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      sum += i;
      if (i !== number / i) sum += number / i;
    }
  }
  return sum === number;
};

/**
 * sum up the user digit
 * return the sum
 */
const is_digit = (number) => {
  //convert number to string, split it to individuals
  //convert each digit back to number and add all
  const digits = String(number).split("");
  const sum = digits.reduce((totalSum, digit) => totalSum + parseInt(digit), 0);
  return sum;
};

/**
 * fun-fact function using the async to fetch api data
 * api: http://numbersapi.com/${num}/math
 */

const getfun_fact = async (num) => {
  const URL = `http://numbersapi.com/${num}/math`;
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    return `Could not retrive fun fact for ${num}: ${error.message}`;
  }
};

/**
 * isArmstrong: a sum of its nth powers of its digits
 * return true is number is armstrong
 */
const isArmstrong = (number) => {
  const str_num = String(number);
  const length = str_num.length;
  let total = 0;
  for (let i = 0; i < length; i++) {
    const digit = parseInt(str_num[i]);
    total += Math.pow(digit, length);
  }

  return total === Number(number);
};

/**
 * Poperties
 * check if numbber is armstrong or
 * nuber is odd or even using modulous
 */
const get_properties = (number) => {
  const properties = [];
  if (isArmstrong(number)) properties.push("armstrong");
  properties.push(number % 2 === 0 ? "even" : "odd");
  return properties;
};

// api endpoint

router.get("/classify-number", async (req, res) => {
  const userNumber = (req.query.number);

  // checks if the user passed a number to the url end-point
  if (!userNumber) {
    return res.status(400).json({
      error: "Number parameter is missing",
    });
  }

  // checks if the number passed is an integer using the parseInt method : return json error
  if (isNaN(parseInt(userNumber))) {
    return res.status(400).json({
      number: userNumber,
      error: true,
    });
  }

  try {
    const primeNumber = is_prime(userNumber);
    const perfectNumber = is_perfect(userNumber);
    const sumDigit = is_digit(userNumber);
    const fun_fact = await getfun_fact(userNumber);
    const properties = get_properties(userNumber);

    const responseData = {
      number: userNumber,
      is_prime: primeNumber,
      is_perfect: perfectNumber,
      properties: properties,
      digit_sum: sumDigit,
      fun_fact: fun_fact,
    };
    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Error occured" });
  }
});

module.exports = router;
