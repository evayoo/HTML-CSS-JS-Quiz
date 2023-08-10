import axios from "axios";

export const ethFaucet = async (accessToken) => {
  try {
    const result = await axios({
      url: "http://localhost:5000/eth-faucet",
      method: "post",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    alert(e);
    return;
  }
};
