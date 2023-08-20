import { StyleSheet, Text, View } from "react-native";
export default function Header() {
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
    <View style={[styles.header, styles.container]} testID="header-component">
      <Text style={styles.h1}>Prokairos</Text>
      <Text style={styles.headerDate}>{headerDate}</Text>
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
  header: {
    paddingTop: 16 * 3,
  },
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
