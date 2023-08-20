import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
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
    <View style={styles.container}>
      <InputModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        timeboxes={timeboxes}
        setTimeboxes={setTimeboxes}
        selectedTimebox={selectedTimebox}
        setSelectedTimebox={setSelectedTimebox}
      />
      <Text style={styles.h3}>Today</Text>
      <View style={styles.timebox_columnHeader}>
        <Text>:00</Text>
        <Text>:30</Text>
      </View>
      <View style={styles.timebox_row}>
        {timeboxes.map((timebox, index) => (
          <TouchableOpacity
            style={styles.timebox}
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
  h1: {
    fontFamily: "Inter_700Bold",
    fontSize: 16 * 3,
  },
  h3: {
    fontFamily: "Inter_700Bold",
    fontSize: 16 * 1.5,
  },
  p: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
  timebox_columnHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  timebox_row: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  timebox: {
    width: "48.75%",
    justifyContent: "center",
    padding: 16 * 0.75,
    backgroundColor: "#F4F6FD",
    borderRadius: 8,
  },
});
