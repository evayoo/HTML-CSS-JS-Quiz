import axios from "axios";

export const sendTokenToUser = async (email, amount, token) => {
  try {
    const result = await axios({
      url: "http://localhost:5000/send-token",
      method: "post",
      data: {
        receiver_email: email,
        swt_amount: amount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result.data);
    return result.data;
  } catch (e) {
    console.log(e);
    alert(e);
    return;
  }
};
