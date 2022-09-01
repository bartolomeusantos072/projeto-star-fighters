import connection from "../config/database";

export async function find() {
  const result = await connection.query(
    `
      SELECT * 
      FROM fighters 
      ORDER BY wins DESC, draws DESC;
    `
  );
  return result.rows;
}

export async function findUsername(username: string) {
    const result = await connection.query(
      `
        SELECT * 
        FROM fighters WHERE username = $1
      `,
      [username]
    );
    return result.rows[0];
  }
  
  export async function insert(username: string) {
    const result = await connection.query(
      `
      INSERT INTO fighters (username, wins, losses, draws) 
      VALUES ($1, 0, 0, 0)
      RETURNING id;
    `,
      [username]
    );
  
    return result.rows[0];
  }
  
  export async function update(id: number, column: "wins" | "losses" | "draws") {
    connection.query(
      `
      UPDATE fighters 
       SET ${column}=${column}+1
      WHERE id=$1
    `,
      [id]
    );
  }
  