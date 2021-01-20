import React, { useState } from "react";
import {
  storePair,
  storeSymbol,
  storeTradeStatus,
  storeTickerStatus,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";

const SearchCrypto = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const config = useSelector((state) => state.config);

  return (
    <div>
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search crypto... Enter"
          value={search}
          onChange={(ev) => {
            setSearch(ev.target.value.toUpperCase());
          }}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              dispatch(storeTradeStatus(false));
              dispatch(storeTickerStatus(false));
              dispatch(storePair(search + config.fiat));
              dispatch(storeSymbol(search));
            }
          }}
        />
        <i className="search icon"></i>
      </div>
      <br /> <br />
    </div>
  );
};

export default SearchCrypto;
