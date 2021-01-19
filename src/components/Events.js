import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const Events = () => {
  const eventStream = useSelector(
    (state) => state.eventStream.executionReport,
    shallowEqual
  );

  return (
    <div>
      <div className="ui header">Event Stream</div>
      <div>{JSON.stringify(eventStream)}</div>
    </div>
  );
};

export default Events;
