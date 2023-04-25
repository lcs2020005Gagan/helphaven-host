// import { useState } from 'react';
// import { ethers } from 'ethers';

// function Transaction() {
//   const [address, setAddress] = useState('');
//   const [balance, setBalance] = useState('');
//   const [error, setError] = useState('');

//   async function connectWallet() {
//     if (typeof window.ethereum === 'undefined') {
//       setError('Please install Metamask to use this feature.');
//       return;
//     }
//     try {
//       await window.ethereum.request({ method: 'eth_requestAccounts' });
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       const account = await signer.getAddress();
//       const balance = await provider.getBalance(account);
//       setAddress(account);
//       setBalance(ethers.utils.formatEther(balance));
//       setError('');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to connect to wallet. Please try again.');
//     }
//   }

//   return (
//     <div>
//       <button onClick={connectWallet}>Connect to Wallet</button>
//       {error && <p>{error}</p>}
//       {address && (
//         <div>
//           <p>Account address: {address}</p>
//           <p>Balance: {balance} ETH</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Transaction;

import React from 'react'

function Transaction() {
  return (
    <div>Transaction</div>
  )
}

export default Transaction