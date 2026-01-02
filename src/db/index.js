const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});


// Function to test DB connectivity
async function connectDB() {
  try {
    const client = await pool.connect();
    await client.query("select 1");
    client.release();
    console.log("✅ Postgres connected");
  } catch (err) {
    console.error("❌ Postgres connection failed:", err.message);
    process.exit(1); // stop app if DB is down
  }
}


async function createUserInDB(user) {
  try {
    const { rows } = await pool.query(
      `insert into users
    (first_name, last_name, email, password, gender, age, photo_url, about, skills)
    values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    returning id, first_name, last_name, email
    `,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.gender,
        user.age,
        user.photoUrl,
        user.about,
        user.skills,
      ]
    );
    return rows[0];
  } catch (err) {
    throw (err);
  }
}


async function getUserFromDB(email) {
  try {
    const { rows } = await pool.query(
      `select * from users where email = $1`,
      [email]
    );
    return rows[0];
  } catch (err) {
    throw (err);
  }
}


async function deleteUserFromDBByEmail(email) {
  const { rows } = await pool.query(
    `
    delete from users
    where email = $1
    returning id, email
    `,
    [email]
  );

  return rows[0]; // undefined if not found
};

async function updateUserInDB(userId, data) {
  const fields = [];
  const values = [];

  const updateKeys = Object.keys(data || {});
  let idx = 1;

  for (const key of updateKeys) {
    const val = data[key];
    if (val === undefined) continue; // skip undefined fields

    fields.push(`${key} = $${idx}`);
    values.push(val);
    idx++;
  }

  if (!fields.length) return null;

  // add userId as the last parameter
  values.push(userId);

  const query = `
    update users
    set ${fields.join(', ')},
        updated_at = now()
    where id = $${idx}
    returning
      id,
      first_name,
      last_name,
      email,
      gender,
      age,
      photo_url,
      about,
      skills
  `;

  const { rows } = await pool.query(query, values);
  return rows[0];
}



module.exports = { createUserInDB, getUserFromDB, deleteUserFromDBByEmail, updateUserInDB };