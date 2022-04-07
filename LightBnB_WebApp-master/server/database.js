const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

//pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})
/// Users


/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, [email])
    .then(res => {
      let user = res.rows[0];
      return user;
    })
    .catch(err => console.error('query error', err.stack));
  }
  
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE id = $1;
    `, [id])
    .then(res => {
      let user = res.rows[0];
      return user;
    })
    .catch(err => console.error('query error', err.stack));
  
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const query = `
    INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const data = [user.name, user.email, user.password];
  return pool.query(query, data)
    .then(() => {
      console.log('res is', res)
      return res;
    })
  }
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  //console.log('guest id', guest_id)
  const query = `
    SELECT properties.*, reservations.start_date, reservations.end_date
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    WHERE guest_id = $1
    LIMIT $2;
    `;
  const data = [guest_id, limit];
  return pool.query(query, data)
    .then(res => {
      console.log('res.row', res.rows);
      return res.rows;
    })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
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
}
exports.addProperty = addProperty;
