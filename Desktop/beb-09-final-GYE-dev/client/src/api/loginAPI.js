import axios from 'axios';

export async function loginAPI(email, password) {
  try {
    const result = await axios({
      url: "http://localhost:5000/user/login",
      method: "post",
      data: { email, password },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
  }