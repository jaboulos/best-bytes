require('dotenv').config();
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const db = require('../db');

// takes info from body of req and attaches to req object under body property
router.use(express.json());
router.use(morgan('dev'));

// get all restaurants
router.get('/', async (req, res) => {
  // returns a promise, make async, wrap in trycatch block
  try {
    // resp comes back as an obj, with rows key, destructure property
    const { rows } = await db.query(
      'SELECT * FROM restaurants ORDER BY id ASC'
    );
    res.json({
      status: 'success',
      results: rows.length,
      data: {
        restaurants: rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// get restaurant by id
router.get('/:id', async (req, res) => {
  try {
    // parameterized query, prevents sql injections
    const { rows } = await db.query('SELECT * FROM RESTAURANTS WHERE id = $1', [
      req.params.id,
    ]);
    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: {
        restaurants: rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//create restaurant
router.post('/', async (req, res) => {
  try {
    // destructure response
    const {
      body: { name, location, price_range },
    } = req;
    const { rows } = await db.query(
      // return restaurant created and return all columns
      'INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) returning *',
      [name, location, price_range]
    );
    res.status(201).json({
      status: 'success',
      data: { restaurants: rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

// update restaurants
// put - send full payload as the request
// patch - send params you want to update
router.put('/:id', async (req, res) => {
  try {
    const {
      body: { name, location, price_range },
      params: { id },
    } = req;
    const { rows } = await db.query(
      'UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *',
      // pass req attributes in array to avoid string interpolation
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: 'success',
      data: { restaurants: rows[0] },
    });
  } catch (error) {
    console.log(error);
  }
});

// delete a restaurant
router.delete('/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    await db.query('DELETE FROM restaurants where id=$1', [id]);
    res.status(204).json({
      status: 'successs',
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
