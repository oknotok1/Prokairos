
import React from "react";
import { render } from "@testing-library/react-native";
import { act } from "react-test-renderer";
import App from "../App";

describe("App", () => {
  act(() => {

    it("renders correctly", async () => {
      render(<App />);
    });

    it("loads the fonts correctly", async () => {
      const { fontsLoaded } = await render(<App />);
      expect(fontsLoaded).toBeTruthy();
    });
  });

});