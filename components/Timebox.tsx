import React, { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

interface Timebox {
  hour: number;
  firstHalf: string;
  secondHalf: string;
}

export default function Timebox() {
  const [timeboxes, setTimeboxes] = useState<{ [key: number]: Timebox }>({
    1: {
      hour: 5,
      firstHalf: "",
      secondHalf: "",
    },
    2: {
      hour: 6,
      firstHalf: "",
      secondHalf: "",
    },
    3: {
      hour: 7,
      firstHalf: "",
      secondHalf: "",
    },
    4: {
      hour: 8,
      firstHalf: "",
      secondHalf: "",
    },
    5: {
      hour: 9,
      firstHalf: "",
      secondHalf: "",
    },
    6: {
      hour: 10,
      firstHalf: "",
      secondHalf: "",
    },
    7: {
      hour: 11,
      firstHalf: "",
      secondHalf: "",
    },
    8: {
      hour: 12,
      firstHalf: "",
      secondHalf: "",
    },
    9: {
      hour: 1,
      firstHalf: "",
      secondHalf: "",
    },
    10: {
      hour: 2,
      firstHalf: "",
      secondHalf: "",
    },
    11: {
      hour: 3,
      firstHalf: "",
      secondHalf: "",
    },
    12: {
      hour: 4,
      firstHalf: "",
      secondHalf: "",
    },
    13: {
      hour: 5,
      firstHalf: "",
      secondHalf: "",
    },
    14: {
      hour: 6,
      firstHalf: "",
      secondHalf: "",
    },
    15: {
      hour: 7,
      firstHalf: "",
      secondHalf: "",
    },
    16: {
      hour: 8,
      firstHalf: "",
      secondHalf: "",
    },
    17: {
      hour: 9,
      firstHalf: "",
      secondHalf: "",
    },
    18: {
      hour: 10,
      firstHalf: "",
      secondHalf: "",
    },
    19: {
      hour: 11,
      firstHalf: "",
      secondHalf: "",
    },
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedTimebox, setSelectedTimebox] = useState({
    index: 0,
    hour: 0,
    minutes: "00",
  });
  const [tempValue, setTempValue] = useState<string>("");

  const toggleModal = (action: string) => {
    setTempValue("");
    action === "open" ? setModalVisible(true) : setModalVisible(false);
  };

  const handleSubmit = () => {
    setTimeboxes((prev: { [key: number]: Timebox }) => {
      const newTimeboxes = { ...prev };
      newTimeboxes[selectedTimebox.index] = {
        hour: selectedTimebox.hour,
        firstHalf: selectedTimebox.minutes === "00" ? tempValue : "",
        secondHalf: selectedTimebox.minutes === "30" ? tempValue : "",
      };
      return newTimeboxes;
    });

    toggleModal("close");
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal("close")}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>
            Timebox {selectedTimebox.hour}:{selectedTimebox.minutes}
          </Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => toggleModal("close")}
          >
            <Text>⛌</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            onChangeText={setTempValue}
            placeholder="Do something"
          />
          <View style={styles.saveButton}>
            <Button title="Save" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>

      <Text style={styles.h2}>Timebox</Text>
      <View>
        {Object.values(timeboxes).map((hour, index) => (
          <View style={styles.timeboxRow} key={index}>
            <View style={styles.timeboxIndex}>
              <Text style={{ textAlign: "center" }}>{hour.hour}</Text>
            </View>
            <Pressable
              style={styles.timeboxValue}
              onPress={() => {
                toggleModal("open");
                setSelectedTimebox({
                  index: index,
                  hour: hour.hour,
                  minutes: "00",
                });
              }}
            >
              <Text>{hour.firstHalf}</Text>
            </Pressable>
            <Pressable
              style={styles.timeboxValue}
              onPress={() => {
                toggleModal("open");
                setSelectedTimebox({
                  index: index,
                  hour: hour.hour,
                  minutes: "30",
                });
              }}
            >
              <Text>{hour.secondHalf}</Text>
            </Pressable>
          </View>
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
  h2: {
    fontSize: 16 * 2,
  },
  tableRow: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: -1,
  },
  timeboxRow: {
    display: "flex",
    flexDirection: "row",
  },
  timeboxIndex: {
    width: 16 * 2.5,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: -1,
    marginLeft: -1,
  },
  timeboxValue: {
    width: "44.75%",
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: -1,
    marginLeft: -1,
  },
  modalView: {
    margin: 16,
    marginTop: 16 * 4,
    height: 16 * 13,
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
    top: 16,
    right: 16,
    padding: 8,
  },
  modalHeader: {
    fontSize: 16 * 1.5,
    fontWeight: "bold",
    marginTop: 16 * 0.75,
  },
  input: {
    marginTop: 16 * 1.25,
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
    marginTop: 16,
  },
});
