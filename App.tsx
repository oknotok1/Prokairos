import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
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
import Timebox from "./components/Timebox";
import Priorities from "./components/Priotities";

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

const Header = () => {
  const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate: string = new Intl.DateTimeFormat(
      "en-US",
      options
    ).format(date);

    const day: number = date.getDate();
    const daySuffix: string =
      day === 1 || day === 21 || day === 31
        ? "st"
        : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
        ? "rd"
        : "th";

    return formattedDate.replace(/(\d+)(?=,)/, `$1${daySuffix}`);
  };

  const currentDate: Date = new Date();
  const headerDate: string = getFormattedDate(currentDate); // Example: "August 19th, 2023"

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
    // backgroundColor: "#F5F5F5",
  },
  scrollView: {
    width: "100%",
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
    paddingTop: 16 * 3,
  },
  // Google Fonts: Inter - https://fonts.google.com/specimen/Inter?query=inter
  // Relative font sizes - http://zuga.net/articles/html-heading-elements/
  h1: {
    fontFamily: "Inter_700Bold",
    fontSize: 16 * 3,
  },
  headerDate: {
    fontFamily: "Inter_300Light",
    fontSize: 16,
    marginLeft: 16 / 5,
  },
});
