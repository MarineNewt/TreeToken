import React, { Component } from 'react'

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">
       
        <div className="card mb-4" >
            <div className="card-body">
              <form className="mb-3" onSubmit={(event) => {
                    event.preventDefault()
                    this.props.mint()
                }}>
                    <button type="submit" className="btn btn-primary btn-block btn-lg" style = {{color: "white", backgroundColor: "green"}} >Produce</button>
              </form>
            </div>    
        </div>

      </div>
    );
  }
}

export default Main;
