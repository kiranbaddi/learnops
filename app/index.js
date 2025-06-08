const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const app = express();
app.use(cors({ methods: ['GET', 'HEAD', 'POST'] }));
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute(
      'INSERT INTO learnops.users (name, email, password ) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM learnops.users WHERE email = ?',
      [email]
    );

    if (rows.length === 0)
      return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials' });

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}` });
});