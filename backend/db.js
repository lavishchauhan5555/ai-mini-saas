import sqlite3 from "sqlite3";
sqlite3.verbose();

// Create an in-memory database
export const db = new sqlite3.Database(':memory:');

export function loadSampleData(sampleData) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      for (const table of sampleData.tables) {
        db.run(`DROP TABLE IF EXISTS ${table.name}`);

        // Create table
        db.run(
          `CREATE TABLE ${table.name} (${table.columns.join(", ")})`
        );

        // Insert data
        table.rows.forEach(row => {
          const placeholders = row.map(() => "?").join(",");
          db.run(
            `INSERT INTO ${table.name} VALUES (${placeholders})`,
            row
          );
        });
      }
      resolve("Sample data loaded");
    });
  });
}
