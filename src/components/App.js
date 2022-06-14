import React, { Component } from 'react';
import Web3 from 'web3';
import TreeToken from '../contracts/TreeToken.json'
import Main from './Main.js'
import logo from './treeL.jpg';
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId() 
    let blockNumber = await web3.eth.getBlockNumber()
    this.setState({ blockNumber })

    //load Tree Token
    const treeTokenData = TreeToken.networks[networkId]
    if(treeTokenData) {
      const treeToken = new web3.eth.Contract(TreeToken.abi, treeTokenData.address)
      this.setState({ treeToken })
      let treeTokenBalance = await treeToken.methods.balanceOf(this.state.account).call()
      this.setState({ treeTokenBalance: treeTokenBalance.toString() })
      let treeTokenSupply = await treeToken.methods.totalSupply().call()
      this.setState({ treeTokenSupply: treeTokenSupply.toString() })
      let untilMine = await treeToken.methods.mineTime(this.state.account).call()
      this.setState({ untilMine: untilMine.toString()  })
      }
    else {
      window.alert('TreeToken contract not deployed to detected network. ')
      }

    this.setState({ loading: false })
  }

  async loadWeb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-ethereum browser detected. Metamask install is recommended.')
    }
  }

  mint = () => {
    this.setState({loading: true})
    this.state.treeToken.methods.mint().send({ from: this.state.account }).on('transactionHash', (hash) => {
    this.setState({ loading: false })
  })}

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      treeToken: {},
      treeTokenBalance: '0',
      treeTokenSupply: '0',
      untilMine: '0',
      blockNumber: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
      mint={this.mint}
      treeTokenBalance={this.state.treeTokenBalance}
      treeTokenSupply={this.state.treeTokenSupply}
      blockNumber={this.state.blockNumber}
      untilMine={this.state.untilMine}
      />
    }
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <div
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            rel="noopener noreferrer"
          >
            Tree Token System 
          </div>
          <small className="navbar-brand col-sm-1 "> {this.state.account} </small>
          <img src={logo} height="40" width="40"  alt="" />
        </nav>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Tree Token</h1>
                {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;