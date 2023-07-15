import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.body}>
      <StatusBar style="auto" />
      <Header />
      <Priorities />
      <Timebox />
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

const Priorities = () => {
  return (
    <View style={[styles.priorities, styles.container]}>
      <Text style={styles.h2}>Top Priorities</Text>
    </View>
  );
};

const Timebox = () => {
  return (
    <View style={[styles.timebox, styles.container]}>
      <Text style={styles.h2}>Timebox</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 16,
    backgroundColor: "#fff",
    // backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 8,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    backgroundColor: "lightgrey",
    paddingHorizontal: 8,
    paddingVertical: 16,
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
  timebox: {},
});
