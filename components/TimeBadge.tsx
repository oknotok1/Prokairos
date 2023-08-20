import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TimeBadge({ time }: { time: Date }) {
  return (
    <View
      style={[
        styles.timeBadge,
        {
          backgroundColor: time.getHours() < 12 ? "#046D8E" : "#FF4646",
        },
      ]}
    >
      <Text style={styles.timeBadge_hour}>
        {time.getHours() % 12 === 0 ? 12 : time.getHours() % 12}
      </Text>
      <Text style={styles.timeBadge_minute}>
        {time.getMinutes() === 0 ? "00" : "30"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  timeBadge: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4 * 3,
    borderRadius: 16,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    alignSelf: "flex-start",
    opacity: 0.75,
  },
  timeBadge_hour: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  timeBadge_minute: {
    fontSize: 16 * 0.75,
    color: "#fff",
  },
});
