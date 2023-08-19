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
interface TopPriorities extends Array<string | undefined> {
  [index: number]: string | undefined;
}

export default function Priorities() {
  const [topPriorities, setTopPriorities] = useState<TopPriorities>([
    undefined,
    undefined,
    undefined,
  ]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPriority, setSelectedPriority] = useState<number>(0);
  const [tempPriority, setTempPriority] = useState<string>("");

  const toggleModal = (action: string) => {
    setTempPriority("");
    action === "open" ? setModalVisible(true) : setModalVisible(false);
  };

  const handleSubmit = () => {
    setTopPriorities((prev: TopPriorities) => {
      const newPriorities = [...prev];
      newPriorities[selectedPriority] = tempPriority;
      return newPriorities;
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
            Priority #{selectedPriority + 1}
          </Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => toggleModal("close")}
          >
            <Text>⛌</Text>
          </Pressable>
          <TextInput
            style={styles.input}
            onChangeText={setTempPriority}
            placeholder="Do something"
          />
          <View style={styles.saveButton}>
            <Button title="Save" onPress={handleSubmit} />
          </View>
        </View>
      </Modal>
      <Text style={styles.h3}>Priorities</Text>
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
                toggleModal("open");
                setSelectedPriority(index);
              }}
            >
              <LinearGradient
                colors={["#7A44F5", "#0036CF"]}
                start={start}
                end={end}
                locations={locations}
                style={styles.priorityBoxGradient}
              >
                <Text style={styles.priorityText}>{priority}</Text>
              </LinearGradient>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    borderRadius: 8,
    overflow: "hidden",
    opacity: 0.95,
  },
  priorityText: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 16 * 1.125,
  },
});
