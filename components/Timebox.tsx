import { StyleSheet, Text, View } from "react-native";

export default function Timebox() {
  const timebox = {
    1: {
      hour: 5,
      firstHalf: "",
      secondHalf: "",
    },
    2: {
      hour: 6,
      firstHalf: "",
      secondHalf: "Wake up",
    },
    3: {
      hour: 7,
      firstHalf: "Breakfast",
      secondHalf: "Go for a walk",
    },
    4: {
      hour: 8,
      firstHalf: "Study",
      secondHalf: "Study",
    },
    5: {
      hour: 9,
      firstHalf: "Break",
      secondHalf: "Study",
    },
    6: {
      hour: 10,
      firstHalf: "Study",
      secondHalf: "Study",
    },
    7: {
      hour: 11,
      firstHalf: "Break",
      secondHalf: "Lunch",
    },
    8: {
      hour: 12,
      firstHalf: "Lunch",
      secondHalf: "Rest",
    },
    9: {
      hour: 1,
      firstHalf: "Rest",
      secondHalf: "Study",
    },
    10: {
      hour: 2,
      firstHalf: "Study",
      secondHalf: "Study",
    },
    11: {
      hour: 3,
      firstHalf: "Break",
      secondHalf: "Study",
    },
    12: {
      hour: 4,
      firstHalf: "Study",
      secondHalf: "Study",
    },
    13: {
      hour: 5,
      firstHalf: "Break",
      secondHalf: "Study",
    },
    14: {
      hour: 6,
      firstHalf: "Go for a walk",
      secondHalf: "Go for a walk",
    },
    15: {
      hour: 7,
      firstHalf: "Dinner",
      secondHalf: "Dinner",
    },
    16: {
      hour: 8,
      firstHalf: "Dinner",
      secondHalf: "Dinner",
    },
    17: {
      hour: 9,
      firstHalf: "Break",
      secondHalf: "Study",
    },
    18: {
      hour: 10,
      firstHalf: "Study",
      secondHalf: "Study",
    },
    19: {
      hour: 11,
      firstHalf: "Break",
      secondHalf: "Study",
    },
  };

  return (
    <View style={[styles.timebox, styles.container]}>
      <Text style={styles.h2}>Timebox</Text>

      <View>
        {Object.values(timebox).map((hour, index) => (
          <View style={styles.timeboxRow} key={index}>
            <View style={styles.timeboxIndex}>
              <Text style={{ textAlign: "center" }}>{hour.hour}</Text>
            </View>
            <View style={styles.timeboxValue}>
              <Text>{hour.firstHalf}</Text>
            </View>
            <View style={styles.timeboxValue}>
              <Text>{hour.secondHalf}</Text>
            </View>
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
  timebox: {},
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
