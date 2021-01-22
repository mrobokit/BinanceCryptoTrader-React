import styled from "styled-components";

import { PAGE_WIDTH } from "../../constants/constants";

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: ${(props) => (props.row ? "row" : "column")};
  justify-content: ${(props) => (props.between ? "space-between" : "center")};
  height: ${(props) => (props.partial ? "80vh" : "100%")};
  margin-left: auto;
  margin-right: auto;
  max-width: ${PAGE_WIDTH}px;
  padding-bottom: ${(props) => {
    switch (props.paddingBottom) {
      case "large":
        return "200px";
      case "medium":
        return "120px";
      default:
        return "auto";
    }
  }};
  padding-left: var(--padding);
  padding-right: var(--padding);
  width: 100%;
`;
