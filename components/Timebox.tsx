import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import TimeBadge from "./TimeBadge";
import InputModal from "./InputModal";

export interface Timebox {
  task: string;
  time: Date;
}

export default function Timebox() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [timeboxes, setTimeboxes] = useState<Timebox[]>([]);
  const [selectedTimebox, setSelectedTimebox] = useState<Timebox | undefined>();

  // for styling
  const screenWidth = Dimensions.get("window").width;
  const paddingHorizontal = 16;
  const gap = 8;
  const timeboxWidth = (screenWidth - 2 * paddingHorizontal - gap) / 2;

  const toggleModal = (timebox: Timebox | undefined = undefined) => {
    if (!timebox) {
      setSelectedTimebox(undefined);
      setModalVisible(false);
      return;
    } else {
      setSelectedTimebox(timebox);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    // add 38 timeboxes to the timeboxes array, one for each half hour of the day
    const timeboxesArray: Timebox[] = [];

    for (let i = 0; i < 38; i++) {
      const hour = Math.floor(i / 2) + 5;
      const minutes = i % 2 === 0 ? "00" : "30";
      const time = new Date();
      time.setHours(hour);
      time.setMinutes(Number(minutes));

      timeboxesArray.push({
        task: "",
        time: time,
      });
    }

    setTimeboxes(timeboxesArray);
  }, []);

  return (
    <View style={styles.container} testID="timebox-component">
      <InputModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        timeboxes={timeboxes}
        setTimeboxes={setTimeboxes}
        selectedTimebox={selectedTimebox}
        setSelectedTimebox={setSelectedTimebox}
      />
      <Text style={styles.h3}>Today</Text>
      <View style={styles.timebox_row}>
        {timeboxes.map((timebox, index) => (
          <TouchableOpacity
            style={[styles.timebox, { width: timeboxWidth }]}
            // style={styles.timebox}
            onPress={() => {
              toggleModal(timebox);
            }}
            key={index}
          >
            <TimeBadge time={timebox.time} />
            {timebox.task && <Text>{timebox.task}</Text>}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 16,
  },
  h3: {
    fontFamily: "Inter_700Bold",
    fontSize: 16 * 1.5,
  },
  timebox_row: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  timebox: {
    width: "48.75%",
    // justifyContent: "center",
    justifyContent: "flex-start",
    gap: 8,
    padding: 16 * 0.75,
    backgroundColor: "#F4F6FD",
    borderRadius: 8,
  },
});
