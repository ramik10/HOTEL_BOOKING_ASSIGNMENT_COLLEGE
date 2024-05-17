import { Request, Response } from 'express';
import pool from '../db';

export const getHotels = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM hotels');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addHotel = async (req: Request, res: Response) => {
  const { name, location, price } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO hotels (name, location, price) VALUES ($1, $2, $3) RETURNING *',
      [name, location, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Aggregate function example
export const getAveragePrice = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT AVG(price) AS average_price FROM hotels');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// String match example
export const searchHotelsByName = async (req: Request, res: Response) => {
  const { name } = req.query;
  try {
    const result = await pool.query('SELECT * FROM hotels WHERE name ILIKE $1', [`%${name}%`]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Set operations example (UNION and INTERSECT)
export const getHotelsUnion = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM hotels WHERE location = 'Location1'
      UNION
      SELECT * FROM hotels WHERE location = 'Location2'
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getHotelsIntersect = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM hotels WHERE location = 'Location1'
      INTERSECT
      SELECT * FROM hotels WHERE price < 100
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Nested query example
export const getHotelsInPopularLocations = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM hotels
      WHERE location IN (
        SELECT location FROM bookings
        JOIN hotels ON bookings.hotel_id = hotels.id
        GROUP BY location
        HAVING COUNT(bookings.id) > 10
      )
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View example
export const getFrequentHotels = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM frequent_hotels');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// PL/SQL procedure example
export const bookHotel = async (req: Request, res: Response) => {
  const { hotel_id, guest_name, check_in, check_out } = req.body;
  try {
    await pool.query('CALL book_hotel($1, $2, $3, $4)', [hotel_id, guest_name, check_in, check_out]);
    res.status(201).json({ message: 'Hotel booked successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteHotel = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const queryText = 'DELETE FROM hotels WHERE id = $1';
      await pool.query(queryText, [id]);
      res.status(204).send(); // No content response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Update a hotel by ID
  export const updateHotel = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, location, price } = req.body;
      const queryText = 'UPDATE hotels SET name = $1, location = $2, price = $3 WHERE id = $4 RETURNING *';
      const result = await pool.query(queryText, [name, location, price, id]);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };