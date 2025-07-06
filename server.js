const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const CUSDIS_API_TOKEN = process.env.CUSDIS_API_TOKEN;

app.post('/webhook', async (req, res) => {
  const commentId = req.body.data?.id;

  if (!commentId) {
    return res.status(400).send('No comment ID provided.');
  }

  try {
    await axios.post(
      'https://cusdis.com/api/comment/approve',
      { id: commentId },
      {
        headers: {
          Authorization: `Bearer ${CUSDIS_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(`Approved comment: ${commentId}`);
    res.status(200).send('Comment approved');
  } catch (err) {
    console.error('Approval failed:', err.response?.data || err.message);
    res.status(500).send('Error approving comment');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
