import React from "react";

const Snackbar = ({ data }) => {
  if (data) {
    return <div>{JSON.stringify(data)}</div>;
  } else {
    return "";
  }
};

export default Snackbar;
