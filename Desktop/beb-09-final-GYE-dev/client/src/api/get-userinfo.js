import axios from "axios";

export const getUserInfo = async (accessToken) => {
  try {
    const result = await axios({
      url: `http://localhost:5000/user`,
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return result.data;
  } catch (e) {
    console.log(e);
  }
};
