import React from "react";
import { connect } from "react-redux";
import { fetchWallet } from "../actions";

class Wallet extends React.Component {
  componentDidMount() {
    this.props.fetchWallet();
  }

  renderList() {
    return this.props.wallet.balances.map((acc) => {
      if (acc && acc.free > 0) {
        return (
          <tr key={acc.asset} data-bound={acc.asset}>
            <td data-label="Name">
              <div>
                {/*  These come from iconify*/}
                <span
                  style={{ marginRight: "5px" }}
                  className="iconify"
                  data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
                  data-inline="false"
                ></span>
                {acc.asset}
              </div>
            </td>
            <td data-label="Ammount">
              <div>{acc.free}</div>
            </td>
          </tr>
        );
      }

      return null;
    });
  }

  render() {
    return (
      <div>
        {/* {console.log(this.props.wallet)} */}
        {this.props.wallet.balances ? (
          <table
            className="ui selectable celled table"
            style={{ maxWidth: "300px" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Ammount</th>
              </tr>
            </thead>
            <tbody>{this.renderList()}</tbody>
          </table>
        ) : (
          <div
            className="ui segment"
            style={{ minHeight: "300px", maxWidth: "265px" }}
          >
            <div className="ui active loader"></div>
            <p></p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { wallet: state.wallet };
};
export default connect(mapStateToProps, { fetchWallet })(Wallet);
