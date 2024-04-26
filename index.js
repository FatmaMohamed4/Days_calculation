const express = require('express');
const { formatDistanceStrict, parseISO } = require('date-fns');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate', (req, res) => {
  const { targetDate } = req.body;

  if (!targetDate) {
    return res.status(400).json({ error: 'Error in date ' });
  }

  const currentDate = new Date();
  const parsedTargetDate = parseISO(targetDate);

  if (parsedTargetDate < currentDate) {
    return res.status(400).json({ error: 'Error in date ' });
  }

  const remainingDays = formatDistanceStrict(currentDate, parsedTargetDate, { unit: 'day' });

  res.json({ remainingDays });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
