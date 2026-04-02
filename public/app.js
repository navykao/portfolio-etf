// ฟังก์ชันดึงข้อมูลหุ้นจาก API
async function getStockData() {
  const symbolInput = document.getElementById('symbol').value.trim();
  if (!symbolInput) {
    alert("กรุณาใส่ชื่อหุ้น เช่น AAPL");
    return;
  }

  try {
    const response = await fetch(`/api/stock/${symbolInput}`);
    const data = await response.json();

    if (data.error) {
      document.getElementById('result').innerText = "Error: " + data.error;
    } else {
      document.getElementById('result').innerHTML = `
        <h3>ข้อมูลหุ้น: ${data.symbol}</h3>
        <p>ราคา: ${data.price}</p>
        <p>การเปลี่ยนแปลง: ${data.change}</p>
        <p>เปอร์เซ็นต์การเปลี่ยนแปลง: ${data.changePercent}</p>
      `;
    }
  } catch (error) {
    document.getElementById('result').innerText = "ไม่สามารถดึงข้อมูลได้: " + error.message;
  }
}
