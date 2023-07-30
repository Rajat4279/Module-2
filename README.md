# Dapp

This project demonstrates the development of a simple dapp using React and Ethereum blockchain technology. The project allows users to connect their MetaMask wallets, send and recieve ETH, and view the ETH collected.

## Prerequisites
- Node.js (v18.16.0 or higher)        
- MetaMask wallet extension installed in your browser   
- ethers.js (v5.7.2 or higher)
## Description
This program is a simple contract written in Solidity, a programming language used for developing smart contracts on the Ethereum blockchain. The functionality of the smart contract is displayed to the user through a frontend made in react. The contract has a state variable, "balance" and has three functions. The "getBalance()" function which return the balance while the "deposit()" function increases the balance by 1 and "withdraw()" function does opposite of "deposite()". Further, the smart contract is deployed with help of hardhat and connected to the Ethereum blockchain using ethers.js. The smart contract is integerated with react to display it's functionslities on a browser and the user can connect their metamask wallet to make transactions.


## Getting Started

1. Clone the repository:
   
```
https://github.com/Rajat4279/Module-2
```

2. Install the dependencies :

```          
npm i
```

Open two additional terminals in your VS code.

In the second terminal type: npx hardhat node.

In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js.

Back in the first terminal, type ```npm run dev``` to launch the front-end.

Open the application in your browser, the project will be running on your localhost. Typically at:

```
http://localhost:3000
```

Connect your MetaMask wallet and interact with the dapp interface.

## Technologies Used
- React - JavaScript library for building user interfaces  
- Ethereum - Blockchain network for decentralized applications  
- MetaMask - Wallet and gateway to Ethereum blockchain  
- ethers.js - Library for interacting with Ethereum smart contracts  
- Hardhat - Development environment and task runner for building, testing, and deploying smart contracts on Ethereum and other blockchain platforms
## Authors

- Rajat

## License

This project is licensed under the MIT License - see [MIT LICENSE] for details
