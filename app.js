function calculate() {
  const initial = parseFloat(document.getElementById('initial').value);
  const monthly = parseFloat(document.getElementById('monthly').value);
  const tax = parseFloat(document.getElementById('tax').value) / 100;
  const years = parseInt(document.getElementById('years').value);

  let invested = initial;
  let portfolio = initial;
  let dividends = 0;
  const portfolioHistory = [];
  const dividendHistory = [];

  for (let y = 1; y <= years; y++) {
    invested += monthly * 12;
    portfolio *= 1.08; // capital growth 8%/yr
    const div = portfolio * 0.03 * (1 - tax); // dividend yield 3%
    dividends += div;

    portfolioHistory.push(portfolio.toFixed(2));
    dividendHistory.push(div.toFixed(2));
  }

  document.getElementById('results').innerHTML = `
    <p>Portfolio Value: $${portfolio.toFixed(2)}</p>
    <p>Total Invested: $${invested.toFixed(2)}</p>
    <p>Total Dividends (after tax): $${dividends.toFixed(2)}</p>
  `;

  renderCharts(portfolioHistory, dividendHistory);
}

function renderCharts(portfolioHistory, dividendHistory) {
  new Chart(document.getElementById('growthChart'), {
    type: 'line',
    data: {
      labels: portfolioHistory.map((_, i) => `Y${i+1}`),
      datasets: [{
        label: 'Portfolio Value',
        data: portfolioHistory,
        borderColor: '#4caf50',
        fill: false
      }]
    }
  });

  new Chart(document.getElementById('dividendChart'), {
    type: 'bar',
    data: {
      labels: dividendHistory.map((_, i) => `Y${i+1}`),
      datasets: [{
        label: 'Annual Dividend (after tax)',
        data: dividendHistory,
        backgroundColor: '#2196f3'
      }]
    }
  });
}
