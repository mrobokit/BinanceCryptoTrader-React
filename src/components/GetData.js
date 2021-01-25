import React, { useState } from "react";
import { useIdentityContext } from "react-netlify-identity";

const GetData = () => {
  const { authedFetch } = useIdentityContext();

  return (
    <div className="inline">
      <button
        className="ui button green"
        onClick={() =>
          authedFetch
            .post("/api/protected-read")
            .then((response) => console.log(response))
            .catch((e) => console.log(e))
        }
      >
        Read
      </button>
    </div>
  );
};

export default GetData;
