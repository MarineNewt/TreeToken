import React, { Component } from 'react'
import treeimage from './treeL.jpg'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
       <img src={treeimage} alt="Tree" height='300' style={{ float: 'center' }}/>

       <div className='text-left text-success' style={{ float: 'right', fontSize: 20, fontFamily: 'Times New Roman' }}>
       <p className='mt-5 mb-5'>Current Tree Token Balance: {window.web3.utils.fromWei(this.props.treeTokenBalance, 'Ether')}</p>
       <p>Current Tree Token Supply: {window.web3.utils.fromWei(this.props.treeTokenSupply, 'Ether')}</p>
       </div> 

        <div className="card mb-0" >
            <div className="card-body">
              <form className="mb-0" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.mint()
                }}>
                    {this.props.blockNumber < this.props.untilMine && <button disabled type="submit" className="btn btn-primary btn-block btn-lg mb-3" style = {{color: "white", backgroundColor: "green"}} >Produce a $TREE</button>}
                    {this.props.blockNumber >= this.props.untilMine && <button type="submit" className="btn btn-primary btn-block btn-lg mb-3" style = {{color: "white", backgroundColor: "green"}} >Produce a $TREE</button>}
                    <p style={{ margin: 0 }}>The network is currently at block {this.props.blockNumber},</p>
                    { this.props.blockNumber < this.props.untilMine && <p style={{ margin: 0 }}>you can mint your next TREE at block {this.props.untilMine}.</p>}
                    { this.props.blockNumber >= this.props.untilMine && <p style={{ margin: 0 }}>you can mint your next TREE Now!</p>}
              </form>
            </div>    
        </div>

      </div>
    );
  }
}

export default Main;
