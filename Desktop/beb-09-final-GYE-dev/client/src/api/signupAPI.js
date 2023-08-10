import axios from 'axios';

export async function signupAPI(email, password, nickname) {
  // try {
  //   const formData = new FormData();
  //   formData.append('email', email);
  //   formData.append('password', password);
  //   formData.append('nickname', nickname);

  //   const response = await axios.post('http://localhost:5000/auth/signup', formData);
  //   callback(null, response.data);
  //   console.log(response.data);
  // } catch (error) {
  //   callback(error, null);
  // }
  try {
    const result = await axios({
      url: "http://localhost:5000/user/signup",
      method: "post",
      data: {  email, password, nickname },
    });
    return result.data;
  } catch (err) {
    return err.response.data;
  }
}