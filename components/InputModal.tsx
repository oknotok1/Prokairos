import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { PriorityItem } from "./Priotities";

interface InputModalProps {
  modalVisible: boolean;
  toggleModal: (priority: PriorityItem | undefined) => void;
  topPriorities: PriorityItem[];
  setTopPriorities: React.Dispatch<React.SetStateAction<PriorityItem[]>>;
  selectedPriority: PriorityItem | undefined;
  setSelectedPriority: React.Dispatch<
    React.SetStateAction<PriorityItem | undefined>
  >;
}

export default function InputModal({
  modalVisible,
  toggleModal,
  topPriorities,
  setTopPriorities,
  selectedPriority,
  setSelectedPriority,
}: InputModalProps) {
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
      setSelectedPriority(updatedPriority);
    }
  };

  const handleSubmit = () => {
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
        <Text style={styles.modalHeader}>Priority {selectedPriority?.id}</Text>
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
          onChangeText={
            selectedPriority
              ? (text) =>
                  setSelectedPriority({
                    ...selectedPriority,
                    task: text,
                  })
              : () => {}
          }
          placeholder="Do something"
        />
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

        <Button
          title="Save"
          onPress={handleSubmit}
          disabled={!selectedPriority?.task || !selectedPriority?.time}
        />
      </View>
    </Modal>
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
    paddingVertical: 24,
    marginBottom: 16,
  },
  h1: {
    fontFamily: "Inter_700Bold",
    fontSize: 16 * 3,
  },
  h3: {
    paddingHorizontal: 16,
    fontFamily: "Inter_700Bold",
    fontSize: 16 * 1.5,
  },
  p: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
  },
  tableRow: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: -1,
  },
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
