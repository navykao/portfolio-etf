const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// อ่าน API Key จาก Environment Variable
const API_KEY = process.env.ALPHA_VANTAGE_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// หน้าเว็บหลัก
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ API: ดึงราคาหุ้นจาก Alpha Vantage
app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    const data = response.data['Global Quote'];

    res.json({
      symbol: data['01. symbol'],
      price: data['05. price'],
      change: data['09. change'],
      changePercent: data['10. change percent']
    });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch data', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
