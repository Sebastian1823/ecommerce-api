const axios = require('axios');

const fetchProductImage = async (productName) => {
  try {
    const url = `https://picsum.photos/300?random=${Date.now()}`;
    await axios.head(url);
    return url;
  } catch {
    return 'https://picsum.photos/300';
  }
};

module.exports = { fetchProductImage };
