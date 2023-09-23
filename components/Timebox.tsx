import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const populateTimeboxes = async () => {
    const timeboxesString = await AsyncStorage.getItem("timeboxes");
    if (timeboxesString) {
      const timeboxes = JSON.parse(timeboxesString);
      // Convert the time string back to a Date object
      timeboxes.forEach((timebox: Timebox) => {
        timebox.time = new Date(timebox.time);
      });
      setTimeboxes(timeboxes);
    } else {
      // Add 38 timeboxes to the timeboxes array, one for each half hour of the day
      const timeboxesArray: Timebox[] = [];

      for (let i = 0; i < 38; i++) {
        const hour = Math.floor(i / 2) + 5;
        const minutes = i % 2 === 0 ? "00" : "30";
        const time = new Date();
        time.setHours(hour);
        time.setMinutes(Number(minutes));
        time.setSeconds(0);
        time.setMilliseconds(0);

        timeboxesArray.push({
          task: "",
          time: time,
        });
      }

      setTimeboxes(timeboxesArray);
    }
  };

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

  const onTimeboxChange = () => {
    return (text: string) => {
      if (!selectedTimebox) {
        return;
      }

      const updatedTimebox = {
        ...selectedTimebox,
        task: text,
      };
      setSelectedTimebox(updatedTimebox);
    };
  };

  const updateTimebox = () => {
    // Find the timebox in the timeboxes array that matches the selectedTimebox
    const updatedTimeboxes = timeboxes.map((timebox) => {
      if (timebox.time === selectedTimebox?.time) {
        return selectedTimebox;
      } else {
        return timebox;
      }
    });

    // Save the updated timeboxes array to AsyncStorage, update the state, and close the modal
    AsyncStorage.setItem("timeboxes", JSON.stringify(updatedTimeboxes));
    setTimeboxes(updatedTimeboxes);
    toggleModal(undefined);
  };

  const clearTimeboxes = async () => {
    // Clear the timeboxes from AsyncStorage and repopulate the timeboxes array
    await AsyncStorage.removeItem("timeboxes");
    populateTimeboxes();
  };

  const validateInput = () => {
    // Disable save button if values are not valid or set
    const valid =
      selectedTimebox && selectedTimebox.task && selectedTimebox.time;

    return Boolean(valid);
  };

  useEffect(() => {
    populateTimeboxes();
  }, []);

  return (
    <View style={styles.container} testID="timebox-component">
      <InputModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        validateInput={validateInput}
        selectedTimebox={selectedTimebox}
        setSelectedTimebox={setSelectedTimebox}
        onTimeboxChange={onTimeboxChange}
        updateTimebox={updateTimebox}
        timebox
      />
      <Text style={styles.h3}>Today</Text>
      <View style={styles.timebox_row}>
        {timeboxes.map((timebox, index) => (
          <TouchableOpacity
            style={[styles.timebox, { width: timeboxWidth }]}
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
      <TouchableOpacity style={styles.clearAllButton} onPress={clearTimeboxes}>
        <Text style={styles.clearAllButtonText}>Clear all</Text>
      </TouchableOpacity>
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
    justifyContent: "flex-start",
    gap: 8,
    padding: 16 * 0.75,
    backgroundColor: "#F4F6FD",
    borderRadius: 8,
  },
  clearAllButton: {
    backgroundColor: "#FEE2E2",
    borderRadius: 8,
    padding: 16 * 0.75,
    marginTop: 16 / 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  clearAllButtonText: {
    fontSize: 16 * 1.25,
    color: "#000",
    fontWeight: "500",
  },
});
