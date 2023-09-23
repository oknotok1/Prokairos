import React from "react";
import { StyleSheet } from "react-native";
import { Button, Modal, Pressable, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { Priority } from "./Priorities";
import { Timebox } from "./Timebox";
import TimeBadge from "./TimeBadge";

interface InputModalProps {
  modalVisible: boolean;
  toggleModal: (priority: Priority | Timebox | undefined) => void;
  validateInput: () => boolean;
  selectedPriority?: Priority;
  setSelectedPriority?: (priority: Priority) => void;
  onPriorityChange?: () => (text: string) => void;
  handleTimeChange?: (event: DateTimePickerEvent, selectedDate?: Date) => void;
  savePriorities?: () => void;
  timebox?: boolean;
  selectedTimebox?: Timebox;
  setSelectedTimebox?: (timebox: Timebox) => void;
  onTimeboxChange?: () => (text: string) => void;
  updateTimebox?: () => void;
}

export default function InputModal({
  modalVisible,
  toggleModal,
  validateInput,
  selectedPriority,
  onPriorityChange,
  handleTimeChange,
  savePriorities,
  timebox,
  selectedTimebox,
  onTimeboxChange,
  updateTimebox,
}: InputModalProps) {
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
          <MaterialCommunityIcons name="close" color="#000" size={16 * 1.5} />
        </Pressable>
        <TextInput
          style={styles.input}
          value={selectedPriority?.task || selectedTimebox?.task}
          onChangeText={
            timebox
              ? onTimeboxChange && onTimeboxChange()
              : onPriorityChange && onPriorityChange()
          }
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
          onPress={timebox ? updateTimebox : savePriorities}
          disabled={!validateInput()}
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
    top: 0,
    right: 0,
    padding: 16 * 0.75,
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
