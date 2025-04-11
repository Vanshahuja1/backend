const express = require('express');
const router = express.Router();
const db = require('../db');

// SQL to create table if it doesn't exist
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS form_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    mobile VARCHAR(15),
    email VARCHAR(255),
    company VARCHAR(255),
    service VARCHAR(255),
    message TEXT,
    website VARCHAR(255),
    date DATE,
    timezone VARCHAR(100)
  )
`;

router.post('/submit-form', (req, res) => {
  const {
    name,
    mobile,
    email,
    company,
    service,
    message,
    website,
    date,
    timezone,
  } = req.body;

  // First ensure the table exists
  db.query(createTableSQL, (tableErr) => {
    if (tableErr) {
      console.error('Error creating table:', tableErr);
      return res.status(500).json({ success: false, message: 'Table creation failed' });
    }

    // Now insert the data
    const insertSQL = `
      INSERT INTO form_submissions 
      (name, mobile, email, company, service, message, website, date, timezone) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      insertSQL,
      [name, mobile, email, company, service, message, website, date, timezone],
      (insertErr, result) => {
        if (insertErr) {
          console.error('Error inserting form data:', insertErr);
          return res.status(500).json({ success: false, message: 'Database insert error' });
        }

        res.status(200).json({ success: true, message: 'Form submitted successfully!' });
      }
    );
  });
});

module.exports = router;
