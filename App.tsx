import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import Timebox from "./components/Timebox";
import Priorities from "./components/Priotities";

export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView}>
        <Header />
        <Priorities />
        <Timebox />
      </ScrollView>
    </SafeAreaView>
  );
}

const Header = () => {
  const date = new Date();
  const headerDate = date.toDateString();

  return (
    <View style={[styles.header, styles.container]}>
      <Text style={styles.h1}>Prokairos</Text>
      <Text style={styles.headerDate}>{headerDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
  },
  scrollView: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    // display: "flex",
    // flexDirection: "column",
    // gap: 16,
  },
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
  header: {
    marginTop: 16 * 2,
  },
  h1: {
    fontSize: 16 * 3,
  },
  h2: {
    fontSize: 16 * 2,
  },
  headerDate: {
    fontSize: 16,
  },
  priorities: {},
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
});
