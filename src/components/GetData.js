import React, { useState } from "react";
import { useIdentityContext } from "react-netlify-identity";

const GetData = ({ endpoint }) => {
  const { authedFetch } = useIdentityContext();

  return (
    <div className="inline">
      <button
        className="ui button green"
        onClick={() =>
          authedFetch
            .post(`/api/${endpoint}`)
            .then((response) => console.log(JSON.parse(response)))
            .catch((e) => console.log(e))
        }
      >
        {endpoint}
      </button>
    </div>
  );
};

export default GetData;
