import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Database setup
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Models
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('donor', 'organization', 'admin'),
    defaultValue: 'donor'
  },
  name: DataTypes.STRING
});

const Organization = sequelize.define('Organization', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  }
});

const Donation = sequelize.define('Donation', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  frequency: DataTypes.STRING
});

// Relationships
User.hasMany(Donation);
Donation.belongsTo(User);
Organization.hasMany(Donation);
Donation.belongsTo(Organization);

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role
    });
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ token, user: { id: user.id, email, name, role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, 'your-secret-key');
    res.json({ token, user: { id: user.id, email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/organizations', async (req, res) => {
  try {
    const organizations = await Organization.findAll({
      where: { status: 'approved' }
    });
    res.json(organizations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.json(donation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Initialize database and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});