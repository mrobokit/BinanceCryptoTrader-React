import React, { useEffect, useState } from "react";
import { useIdentityContext } from "react-netlify-identity";
import Placeholder from "../semantic/Placeholder";

const ServerSideWallet = () => {
  const { authedFetch } = useIdentityContext();
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    //typeof string - it came back with an error string
    //typeof object - it came back with the data
    // Error is included in the response string, no need to catch anything
    authedFetch.post(`/api/fetchWallet`).then((data) => setBalance(data));
  }, []);

  const renderTableOnlyIfObjectReturnsTrue = () => {
    if (typeof balance === "string") return null;

    const renderList = balance?.map((acc) => {
      return (
        <tr key={acc.asset} data-bound={acc.asset}>
          <td data-label="Name">
            <div>
              <span
                style={{ marginRight: "5px" }}
                className="iconify"
                data-icon={`cryptocurrency:${acc.asset.toLowerCase()}`}
                data-inline="true"
              ></span>
              {acc.asset}
            </div>
          </td>
          <td data-label="Ammount">
            <div>{acc.free}</div>
          </td>
          <td data-label="Locked">
            {acc.locked > 0 ? (
              <div>{parseFloat(acc.locked).toFixed(2)}</div>
            ) : (
              <div>N/A</div>
            )}
          </td>
        </tr>
      );
    });

    return (
      <table
        className="ui selectable celled table"
        style={{ maxWidth: "350px" }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Ammount</th>
            <th>Locked</th>
          </tr>
        </thead>
        <tbody>{renderList}</tbody>
      </table>
    );
  };

  const run = () => {
    if (renderTableOnlyIfObjectReturnsTrue() === null) return null;

    return renderTableOnlyIfObjectReturnsTrue();
  };

  return (
    <div
      className="ui container segment center aligned"
      style={{ minHeight: "60vh" }}
    >
      {run()}

      {typeof balance === "string" ? (
        <div>
          <div className="ui header red" style={{ minHeight: "60vh" }}>
            {balance}
          </div>

          <p>Please go to Settings.</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ServerSideWallet;
