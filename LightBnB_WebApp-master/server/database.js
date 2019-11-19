/* eslint-disable no-unused-vars */
const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

// getUserWithEmail
// Accepts an email address and will return a promise.
// The promise should resolve with the user that has that
// email address, or null if that user does not exist.

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  let user;

  const queryDatabase = `
  SELECT *
  FROM users
  WHERE users.email = $1;
  `;

  return pool.query(queryDatabase, [email])
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      } else return null;
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {

  const queryDatabase = `
    SELECT *
    FROM users
    WHERE users.id = $1;
  `;

  return pool.query(queryDatabase, [id])
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      } else return null;
    });
};
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {

  const queryDatabase = `
    INSERT INTO users (name, email, password)
    SELECT $1, $2::varchar, $3
    WHERE NOT EXISTS (SELECT * FROM users WHERE email = $2::varchar)
    RETURNING *
  `;

  return pool.query(queryDatabase, [user.name, user.email, user.password])
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      } else return null;
    }).catch((error) => {
      console.log(error);
    });


  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  const queryDatabase = `
    SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON property_reviews.property_id = reservations.property_id
    WHERE reservations.end_date < now()::date
    AND reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date DESC
    LIMIT $2;
    `;

  return pool.query(queryDatabase, [guest_id, limit])
    .then((res) => {
      if (res.rows) {
        console.log(res.rows);
        return res.rows;
      } else return null;
    });
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `cost_per_night > $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    if (queryParams.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `cost_per_night < $${queryParams.length} `;
  }

  queryString += `
  GROUP BY properties.id
  `;
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }
  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
    .then(res => res.rows);
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
