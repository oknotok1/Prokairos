import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import Header from "./components/Header";
import Timebox from "./components/Timebox";
import Priorities from "./components/Priorities";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    // Improvement: include render a loading indicator here
    return null;
  }

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

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
    fontFamily: "Inter",
  },
  scrollView: {
    width: "100%",
    // backgroundColor: "#F5F5F5",
  },
});
