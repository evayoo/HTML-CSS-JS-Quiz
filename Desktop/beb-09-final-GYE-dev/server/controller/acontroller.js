// const Web3 = require('web3');

// // 가나슈 로컬 네트워크의 RPC 엔드포인트 주소
// const ganacheUrl = 'http://localhost:7545'; // 가나슈 기본 포트

// // Web3 인스턴스 생성
// const web3 = new Web3(ganacheUrl);

// // Web3 인스턴스를 사용하여 Ethereum 네트워크와 상호 작용 가능

// // Get accounts using async/await
// async function getAccounts() {
//   try {
//     const accounts = await web3.eth.getAccounts();
//     console.log(accounts);
//     const serverAddress = accounts[0];
//     console.log('Server Address:', serverAddress);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// getAccounts();

// // Alternatively, get accounts using .then()
// web3.eth.getAccounts()
//   .then(accounts => {
//     console.log(accounts);
//     const serverAddress = accounts[0];
//     console.log('Server Address:', serverAddress);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

