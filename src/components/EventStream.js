import React, { useEffect } from "react";
import { connectToEvent, storeEventStream } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import binance from "../components/api/binance";
import Events from "../components/Events";

const EventStream = () => {
  const dispatch = useDispatch();
  const streamKey = localStorage.getItem("streamKey");

  const connectToEventStream = () => {
    dispatch(
      connectToEvent(
        `wss://stream.binance.com:9443/ws/${streamKey}`,
        storeEventStream
      )
    );
  };

  useEffect(() => {
    if (!streamKey) {
      binance.post(`/userDataStream`).then(
        (response) => {
          console.log(response.data.listenKey);
          localStorage.setItem("streamKey", response.data.listenKey);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    // After 30 min, call this every 30 min to keep alive key
    const interval = setInterval(async () => {
      const response = await binance.put(
        `/userDataStream?listenKey=${streamKey}`
      );
      console.log("Extend key", response);
    }, 1800000); //30 min

    connectToEventStream();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Events />
    </div>
  );
};

export default EventStream;
