const axios = require('axios');

const fetchProductImage = async (productName) => {
  try {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const url = `https://picsum.photos/id/${randomId}/400/400`;
    await axios.head(url);
    return url;
  } catch {
    const fallbackId = Math.floor(Math.random() * 500) + 1;
    return `https://picsum.photos/id/${fallbackId}/400/400`;
  }
};

module.exports = { fetchProductImage };