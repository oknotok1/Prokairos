import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { View, Text, Modal } from "react-native";

interface Quote {
  q: string;
  a: string;
  h: string;
}

export default function QuoteOfTheDay({ endOfPage }: { endOfPage?: boolean }) {
  const [modalVisible, setModalVisible] = useState<boolean>(true);
  const [quote, setQuote] = useState<Quote>();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const getQuote = async () => {
    const response = await fetch("https://zenquotes.io/api/today");
    const data = await response.json();
    setQuote(data[0]);
  };

  useEffect(() => {
    getQuote();
  }, []);

  if (!quote) {
    return null;
  }

  if (endOfPage) {
    return (
      <View style={styles.endOfPage}>
        <Text style={styles.title}>Quote of the day</Text>
        <Text style={styles.quote}>{quote?.q}</Text>
        <Text style={styles.author}>{quote?.a}</Text>
      </View>
    );
  } else
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal}
      >
        <View style={styles.modalView}>
          <Pressable
            style={styles.closeButton}
            onPress={() => {
              toggleModal();
            }}
          >
            <MaterialCommunityIcons name="close" color="#000" size={16 * 1.5} />
          </Pressable>
          <Text style={styles.title}>Quote of the day</Text>
          <Text style={styles.quote}>{quote?.q}</Text>
          <Text style={styles.author}>{quote?.a}</Text>
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
  title: {
    fontSize: 16 * 1.125,
    fontWeight: "bold",
  },
  quote: {
    fontSize: 16 * 1.25,
    textAlign: "center",
    fontWeight: "300",
    fontStyle: "italic",
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
  },
  endOfPage: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
    marginBottom: 16 * 2,
    borderRadius: 8,
  },
});
