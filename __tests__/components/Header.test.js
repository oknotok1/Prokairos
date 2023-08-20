import React from "react";
import { render } from "@testing-library/react-native";
import Header from "../../components/Header";

describe("Header", () => {
  it("renders correctly", () => {
    render(<Header />);
  });
});
