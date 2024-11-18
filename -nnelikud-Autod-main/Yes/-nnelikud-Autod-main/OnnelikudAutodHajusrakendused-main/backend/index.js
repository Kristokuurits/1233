const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let cars = [
  { id: 1, name: 'Audi A4', price: 15000 },
  { id: 2, name: 'BMW 320i', price: 20000 },
];
let queues = {};

app.get('/onnelikud-autod', (req, res) => {
  res.status(200).json(cars);
});

app.post('/onnelikud-autod', (req, res) => {
  const { name, price } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid car name' });
  }
  const newCar = {
    id: cars.length + 1,
    name,
    price: price || 0,
  };
  cars.push(newCar);
  res.status(201).json({ message: 'Car repair added successfully', car: newCar });
});

app.get('/onnelikud-autod/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  if (isNaN(carId)) {
    return res.status(400).json({ error: 'Invalid car ID' });
  }
  const car = cars.find((c) => c.id === carId);
  if (!car) {
    return res.status(404).json({ error: 'Car repair not found' });
  }
  res.status(200).json(car);
});

app.post('/onnelikud-autod/:id', (req, res) => {
  const carId = parseInt(req.params.id);
  const { userName } = req.body;
  if (isNaN(carId)) {
    return res.status(400).json({ error: 'Invalid car ID' });
  }
  if (!userName || typeof userName !== 'string') {
    return res.status(400).json({ error: 'Invalid user name' });
  }
  const car = cars.find((c) => c.id === carId);
  if (!car) {
    return res.status(404).json({ error: 'Car repair not found' });
  }
  if (!queues[carId]) {
    queues[carId] = [];
  }
  queues[carId].push(userName);
  res.status(200).json({
    message: 'User added to the queue',
    queuePosition: queues[carId].length,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
