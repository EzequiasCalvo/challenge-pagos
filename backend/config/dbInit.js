const pool = require("./dbConfig.js");

const createTables = async () => {
  const createUsersTable = `
        CREATE TABLE Users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255),
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

  const createPaymentsTable = `
        CREATE TABLE Payments (
            id SERIAL PRIMARY KEY,
            user_id INT,
            amount DECIMAL(10, 2),
            payment_type VARCHAR(50),
            recipient VARCHAR(255),
            description TEXT,
            creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users(id)
        );
    `;

  try {
    await pool.query(createUsersTable);
    console.log("Users table created successfully.");
    await pool.query(createPaymentsTable);
    console.log("Payments table created successfully.");
  } catch (err) {
    console.error("Error creating tables", err.stack);
  } finally {
    pool.end(); // Closes the pool connection to the database
  }
};

createTables();
