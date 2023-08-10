import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email:'',
    nickname: '',
    gye_amount: '',
    usdg_amount: '',
    isLoggedIn: false,
  },
  reducers: {
    setLogout: (state) => {
      state.email = '';
      state.nickname = '';
      state.gye_amount = '';
      state.usdg_amount = '';
      state.isLoggedIn = false;
      console.log('실제 상태:', state.email, state.nickname, state.gye_amount, state.usdg_amount, state.isLoggedIn);
    },
    setLogin: (state, action) => {
      const { email, nickname, gye_amount, usdg_amount } = action.payload;
      state.email = email;
      state.nickname = nickname;
      state.gye_amount = gye_amount;
      state.usdg_amount = usdg_amount;
      state.isLoggedIn = true;
      console.log('실제 상태:', state.email, state.nickname, state.gye_amount, state.usdg_amount, state.isLoggedIn); // 실제 상태 출력 '_' 프로퍼티는 프록시 객체의 실제 상태를 나타내는 프로퍼티
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setGyeAmount: (state, action) => {
      state.gye_amount = action.payload;
      console.log('GYE토큰 잔액', state.gye_amount)
    },
    setUsdgAmount: (state, action) => {
      state.usdg_amount = action.payload;
      console.log('USDG 잔액', state.usdg_amount)
    },
  },
});

export const {
  setLogout,
  setLogin,
  setNickname,
  setGyeAmount,
  setUsdgAmount,
} = userSlice.actions;

export default userSlice.reducer;