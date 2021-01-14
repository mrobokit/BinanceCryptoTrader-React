import React from "react";
// import ActiveOrders from "../components/ActiveOrders";
// import Table from "../components/Table";
import { connect } from "react-redux";

class HomePage extends React.Component {
  componentDidMount() {
    console.log("Homepage mounted");
    console.log(this.props.socket);
  }

  render() {
    return (
      <button onClick={() => console.log(this.props.socket)}>Action</button>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return { socket: state.socket };
};

export default connect(mapStateToProps)(HomePage);

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
