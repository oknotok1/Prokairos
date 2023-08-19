import { useState } from "react";
import {
  Button,
  Modal,
  Pressable,
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
      <Text style={styles.h3}>Top Priorities</Text>
      <View>
        {topPriorities.map((priority, index) => (
          <Pressable
            style={styles.tableRow}
            key={index}
            onPress={() => {
              toggleModal("open");
              setSelectedPriority(index);
            }}
          >
            <Text style={styles.p}>{priority}</Text>
          </Pressable>
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
});
