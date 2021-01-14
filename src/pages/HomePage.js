import React from "react";
import Table from "../components/Table";

// When nothing is happening, check to see if you are missing this.props. before the functions or variables u use !!!!!!!!!!!!!!!!!!!!!!!
class HomePage extends React.Component {
  componentDidMount() {
    console.log("Munted");
    // Step 2 : ✅ Pass the action of wConnect and i give it the host. Console log shows is correct
  }

  componentDidUpdate() {
    console.log("Rendered again");
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="nine wide column">
            {0 === 0 ? (
              <Table />
            ) : (
              <div className="ui segment" style={{ height: "320px" }}>
                <div className="ui active loader"></div>
                <p></p>
              </div>
            )}
          </div>

          <div className="seven wide column">Graph</div>
          <div className="nine wide column"></div>
          {/* <div className="seven wide column">
            {coinOne && coinTwo && tickerOne && tickerTwo ? (
              <ActiveOrders symbol={coinTwo.s} />
            ) : (
              <div className="ui segment" style={{ height: "120px" }}>
                <div className="ui active loader"></div>
                <p></p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    );
  }
}

export default HomePage;

//{console.log(this.props.socket)} - Store debugger!
