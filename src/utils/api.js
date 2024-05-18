import axios from "axios";

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get("https://api.coinlore.net/api/tickers/");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
};
