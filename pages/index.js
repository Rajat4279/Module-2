import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <Button variant="primary" onClick={connectAccount}>Please connect your Metamask wallet</Button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="text-warning fs-4">Your Account:<span className="text-light fs-4 mx-2">{account}</span></p>
        <p className="text-warning fs-4">Your Balance:<span className="text-light fs-4 mx-2">{balance}</span></p>
        <Container className="d-flex justify-content-center align-items-center p-4">
          <Button variant="success m-2" onClick={deposit}>Deposit 1 ETH</Button>
          <Button variant="danger m-2" onClick={withdraw}>Withdraw 1 ETH</Button>
        </Container>
      </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
    <main className="container">
      <div className="m-4 p-2 border border-dark bg-secondary rounded d-flex flex-column justify-content-center align-items-center">
        <header className="d-flex m-4 p-2">
          <h1 className="text-capitalize font-weight-bold">Welcome To Your Atm!</h1>
          <img className="mx-3 bg-light bg-gradient rounded" src="https://academy.metacrafters.io/_next/image?url=%2Fimages%2Ficons%2Fm-logo.svg&w=2048&q=75" alt="" />
        </header>
        <div className="mb-4 p-2">
          {initUser()}
        </div>
      </div>
    </main>
  )
}
