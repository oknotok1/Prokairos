import { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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
        {topPriorities.map((priority, index) => (
          <Pressable
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
            <Text style={styles.p}>{priority}</Text>
          </Pressable>
        ))}
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
    padding: 16,
    marginRight: 16,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "black",
    backgroundColor:
      "linear-gradient(136.67deg, rgba(122, 68, 245, 0.95) -0.31%, rgba(0, 54, 207, 0.95) 102.78%)",
  },
});
