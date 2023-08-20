import React, { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import DateTimePicker from "@react-native-community/datetimepicker";

import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface PriorityItem {
  key: number;
  task: string;
  time: Date;
  addNew?: boolean;
}

export default function Priorities() {
  const [topPriorities, setTopPriorities] = useState<PriorityItem[]>([
    {
      key: 0,
      task: "Add a priority",
      time: new Date(),
      addNew: true,
    },
    // {
    //   key: Math.floor(Math.random() * 100000),
    //   task: "Do something",
    //   time: new Date(),
    // },
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<
    PriorityItem | undefined
  >();

  const toggleModal = (priority: PriorityItem | undefined = undefined) => {
    if (!priority) {
      setSelectedPriority(undefined);
      setModalVisible(false);
      return;
    }

    if (priority.addNew) {
      setSelectedPriority({
        key: topPriorities.length,
        task: "",
        time: new Date(),
      });
    } else {
      setSelectedPriority(priority);
    }

    setModalVisible(true);
  };

  const handleSubmit = () => {
    // TODO: fix sorting logic
    console.log("handleSubmit::selectedPriority", selectedPriority);
    if (!selectedPriority) return;

    // add selectedPriority to the topPriorities array
    const updatedPriorities = [...topPriorities];
    updatedPriorities.push(selectedPriority);

    // move the "add new" priority to the end of the array
    const addNewPriority = updatedPriorities.shift();
    updatedPriorities
      .sort((a, b) => a.key - b.key)
      .push(addNewPriority as PriorityItem);

    setTopPriorities(updatedPriorities);
    setSelectedPriority(undefined);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <InputModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.h3}>Priority</Text>
      <ScrollView
        horizontal
        scrollIndicatorInsets={{ left: 16, right: 16 }}
        style={styles.priorityRow}
      >
        {topPriorities.map((priority, index) => {
          const start = { x: 0.1, y: 0.2 };
          const end = { x: 0.9, y: 0.8 };
          const locations = [0.2, 0.8];

          return (
            <TouchableOpacity
              style={[
                styles.priorityBox,
                index === topPriorities.length - 1 && { marginRight: 32 },
              ]}
              key={index}
              onPress={() => {
                toggleModal(priority);
              }}
            >
              <LinearGradient
                colors={["#7A44F5", "#0036CF"]}
                start={start}
                end={end}
                locations={locations}
                style={styles.priorityBoxGradient}
              >
                {priority?.key === 0 ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.priorityText}>{priority?.task}</Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.priorityText}>{priority?.task}</Text>
                    {priority?.time && (
                      <View style={styles.priorityBadge}>
                        <Text style={styles.priorityBadgeText_hour}>
                          {priority.time.getHours() % 12 === 0
                            ? 12
                            : priority.time.getHours() % 12}
                        </Text>
                        <Text style={styles.priorityBadgeText_minute}>
                          {priority.time.getMinutes() === 0 ? "00" : "30"}
                        </Text>
                      </View>
                    )}
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

interface InputModalProps {
  modalVisible: boolean;
  toggleModal: (priority: PriorityItem | undefined) => void;
  selectedPriority: PriorityItem | undefined;
  setSelectedPriority: React.Dispatch<
    React.SetStateAction<PriorityItem | undefined>
  >;
  handleSubmit: () => void;
}

const InputModal: React.FC<InputModalProps> = ({
  modalVisible,
  toggleModal,
  selectedPriority,
  setSelectedPriority,
  handleSubmit,
}) => {
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

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => toggleModal}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalHeader}>
          Priority #{selectedPriority?.key}
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
          value={selectedPriority?.key === 0 ? "" : selectedPriority?.task}
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
          onChange={handleTimeChange} // Use the handleTimeChange function here
          textColor="#000"
          accentColor="#000"
        />

        <View style={styles.saveButton}>
          <Button title="Save" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

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
  saveButton: {
    // marginTop: 8,
  },
  priorityRow: {
    paddingBottom: 16 * 1.25,
    paddingLeft: 16,
  },
  priorityBox: {
    width: 16 * 12,
    height: 16 * 12,
    marginRight: 16,
    borderRadius: 8,
  },
  priorityBoxGradient: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    gap: 8,
    borderRadius: 8,
    overflow: "hidden",
    opacity: 0.95,
  },
  priorityText: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 16 * 1.125,
  },
  priorityBadge: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4 * 3,
    borderRadius: 16,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    alignSelf: "flex-start",
    opacity: 0.65,
  },
  priorityBadgeText_hour: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#7A44F5",
  },
  priorityBadgeText_minute: {
    fontSize: 16 * 0.75,
    color: "#7A44F5",
  },
});
