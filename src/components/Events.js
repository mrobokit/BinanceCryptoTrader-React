import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default () => {
  const eventStream = useSelector((state) => state.eventStream.data);
  return <div>{JSON.stringify(eventStream)}</div>;
};
