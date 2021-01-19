import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

export default () => {
  const eventStream = useSelector(
    (state) => state.eventStream.executionReport,
    shallowEqual
  );

  return (
    <div>
      <div className="ui header">
        Event Stream{" "}
        <button
          className="ui mini button"
          onClick={() => {
            console.log(eventStream);
          }}
        >
          console.log
        </button>
      </div>
      <div>{JSON.stringify(eventStream)}</div>
    </div>
  );
};
