import React, { useState } from "react";
import { useIdentityContext } from "react-netlify-identity";

const SendData = ({ theKey, id, name }) => {
  const { authedFetch } = useIdentityContext();
  const [value, setValue] = useState("");

  return (
    <div className="inline">
      <input
        className="ui input action fau-input"
        type="text"
        value={value}
        placeholder={name}
        maxLength="80"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <button
        className="ui button green"
        onClick={() =>
          authedFetch
            .post("/api/protected-write", {
              body: JSON.stringify({
                [theKey]: value,
                id: id,
              }),
            })
            .then((response) => console.log(response))
            .catch((e) => console.log(e))
        }
      >
        Save
      </button>
    </div>
  );
};

export default SendData;
