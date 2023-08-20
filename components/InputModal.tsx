import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Priority } from "./Priotities";
import { Timebox } from "./Timebox";
import TimeBadge from "./TimeBadge";

interface InputModalProps {
  modalVisible: boolean;
  toggleModal: (priority: Priority | undefined) => void;
  topPriorities?: Priority[];
  setTopPriorities?: React.Dispatch<React.SetStateAction<Priority[]>>;
  selectedPriority?: Priority | undefined;
  setSelectedPriority?: React.Dispatch<
    React.SetStateAction<Priority | undefined>
  >;
  timeboxes?: Timebox[];
  setTimeboxes?: React.Dispatch<React.SetStateAction<Timebox[]>>;
  selectedTimebox?: Timebox | undefined;
  setSelectedTimebox?: React.Dispatch<
    React.SetStateAction<Timebox | undefined>
  >;
}

export default function InputModal({
  modalVisible,
  toggleModal,
  topPriorities,
  setTopPriorities,
  selectedPriority,
  setSelectedPriority,
  timeboxes,
  setTimeboxes,
  selectedTimebox,
  setSelectedTimebox,
}: InputModalProps) {
  const handleTaskChange = () => {
    if (selectedPriority && setSelectedPriority) {
      return (text: string) => {
        const updatedPriority = {
          ...selectedPriority,
          task: text,
        };
        setSelectedPriority(updatedPriority);
      };
    } else if (selectedTimebox && setSelectedTimebox) {
      return (text: string) => {
        const updatedTimebox = {
          ...selectedTimebox,
          task: text,
        };
        setSelectedTimebox(updatedTimebox);
      };
    }
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedPriority && event.type === "set") {
      const selectedTime = selectedDate || new Date();
      const updatedPriority = {
        ...selectedPriority,
        time: selectedTime,
      };
      setSelectedPriority && setSelectedPriority(updatedPriority);
    }
  };

  const validateInput = () => {
    if (selectedPriority) {
      if (selectedPriority.task && selectedPriority.time) {
        return false;
      }
    }

    if (selectedTimebox) {
      if (selectedTimebox.task && selectedTimebox.time) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (
      topPriorities &&
      selectedPriority &&
      setTopPriorities &&
      setSelectedPriority
    ) {
      if (!selectedPriority) return;

      // make a copy of the topPriorities array to update
      const updatedPriorities = [...topPriorities];

      // if the priority is new, add it to the end of the list, otherwise update the existing priority in the list
      const index = updatedPriorities.findIndex(
        (priority) => priority.id === selectedPriority.id
      );
      updatedPriorities[index === -1 ? topPriorities.length : index] =
        selectedPriority;

      // sort updatedPriorities by time, earliest to latest
      updatedPriorities.sort((a, b) => {
        if (!a.time || !b.time) return 0;
        if (a.time < b.time) return -1;
        if (a.time > b.time) return 1;
        return 0;
      });

      // move the priority with .addNew to the end of the list
      const addNewIndex = updatedPriorities.findIndex(
        (priority) => priority.addNew
      );
      if (addNewIndex !== -1) {
        const addNewPriority = updatedPriorities[addNewIndex];
        updatedPriorities.splice(addNewIndex, 1);
        updatedPriorities.push(addNewPriority);
      }

      setTopPriorities(updatedPriorities);
      setSelectedPriority(undefined);
    } else if (
      selectedTimebox &&
      setSelectedTimebox &&
      timeboxes &&
      setTimeboxes
    ) {
      setTimeboxes(
        timeboxes.map((timebox) => {
          if (timebox.time.getTime() === selectedTimebox.time.getTime()) {
            return selectedTimebox;
          } else {
            return timebox;
          }
        })
      );

      setSelectedTimebox(undefined);
    }

    toggleModal(undefined);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalHeader}>
          {selectedPriority ? (
            `Priority ${selectedPriority?.id}`
          ) : selectedTimebox ? (
            <TimeBadge time={selectedTimebox.time} />
          ) : null}
        </Text>
        <Pressable
          style={styles.closeButton}
          onPress={() => {
            toggleModal(undefined);
          }}
        >
          <Text>⛌</Text>
        </Pressable>
        <TextInput
          style={styles.input}
          value={selectedPriority?.task}
          onChangeText={handleTaskChange()}
          placeholder="Do something"
        />
        {selectedPriority && (
          <DateTimePicker
            value={selectedPriority?.time || new Date()}
            mode="time"
            minuteInterval={30}
            is24Hour={false}
            display="default"
            onChange={handleTimeChange}
            textColor="#000"
            accentColor="#000"
          />
        )}

        <Button
          title="Save"
          onPress={handleSubmit}
          disabled={validateInput()}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    marginTop: 16 * 4,
    margin: 16,
    paddingTop: 16 * 1.5,
    display: "flex",
    flexDirection: "column",
    gap: 16 * 1.5,
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 8,
  },
  modalHeader: {
    fontSize: 16 * 1.5,
    fontWeight: "bold",
  },
  input: {
    height: 16 * 4,
    width: "100%",
    textAlign: "center",
    fontSize: 16 * 1.25,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
});
