import React from "react";
import { connect } from "react-redux";
import { wsConnect } from "../actions";

// When nothing is happening, check to see if you are missing this.props. before the functions or variables u use !!!!!!!!!!!!!!!!!!!!!!!
class HomePage extends React.Component {
  componentDidMount() {
    console.log("Munted");
    this.props.wsConnect(this.endpoint()); // Step 2 : ✅ Pass the action of wConnect and i give it the host. Console log shows is correct
  }

  endpoint = () => {
    const symbolOne = "btcusdt";
    const symbolTwo = "ethusdt";
    const TRADE = [`${symbolOne}@trade`, `${symbolTwo}@trade`];
    const TICKER = [`${symbolOne}@ticker`, `${symbolTwo}@ticker`];

    return (
      "wss://stream.binance.com:9443/stream?streams=" +
      TRADE.join("/") +
      "/" +
      TICKER.join("/")
    );
  };

  render() {
    return (
      <button onClick={() => this.props.wsConnect(this.endpoint())}>
        Action
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  return { socket: state.socket };
};

export default connect(mapStateToProps, { wsConnect })(HomePage);

// const HomePage = () => {
//   return
//   return (
//     <div className="ui container">
//       <div className="ui grid">
//         <div className="nine wide column">
//           {coinOne && coinTwo && tickerOne && tickerTwo ? (
//             <Table
//               coinOne={coinOne}
//               coinTwo={coinTwo}
//               tickerOne={tickerOne}
//               tickerTwo={tickerTwo}
//             />
//           ) : (
//             <div className="ui segment" style={{ height: "320px" }}>
//               <div className="ui active loader"></div>
//               <p></p>
//             </div>
//           )}
//         </div>
//         <div className="seven wide column">Graph</div>

//         <div className="nine wide column"></div>

//         <div className="seven wide column">
//           {coinOne && coinTwo && tickerOne && tickerTwo ? (
//             <ActiveOrders symbol={coinTwo.s} />
//           ) : (
//             <div className="ui segment" style={{ height: "120px" }}>
//               <div className="ui active loader"></div>
//               <p></p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
