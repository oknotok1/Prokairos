import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import InputModal from "./InputModal";

export interface PriorityItem {
  id: number;
  task: string;
  time: Date;
  addNew?: boolean;
}

export default function Priorities() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [topPriorities, setTopPriorities] = useState<PriorityItem[]>([
    {
      id: 0,
      task: "Add a priority",
      time: new Date(),
      addNew: true,
    },
  ]);
  const [selectedPriority, setSelectedPriority] = useState<
    PriorityItem | undefined
  >();

  const toggleModal = (priority: PriorityItem | undefined = undefined) => {
    if (!priority) {
      setSelectedPriority(undefined);
      setModalVisible(false);
      return;
    }

    if (priority.addNew) {
      setSelectedPriority({
        id: topPriorities.length,
        task: "",
        time: new Date(),
      });
    } else {
      setSelectedPriority(priority);
    }

    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <InputModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        topPriorities={topPriorities}
        setTopPriorities={setTopPriorities}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
      />
      <Text style={styles.h3}>Priority</Text>
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
                topPriorities.length > 3 &&
                  index === topPriorities.length - 1 && { opacity: 0.5 },
              ]}
              key={index}
              onPress={() => {
                toggleModal(priority);
              }}
              disabled={topPriorities.length > 3 && priority.addNew}
            >
              <LinearGradient
                colors={["#7A44F5", "#0036CF"]}
                start={start}
                end={end}
                locations={locations}
                style={styles.priorityBoxGradient}
              >
                {priority.addNew ? (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[styles.priorityText, { textAlign: "center" }]}
                    >
                      {topPriorities.length > 3
                        ? "You have enough priorities for today!"
                        : priority?.task}
                    </Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.priorityText}>{priority?.task}</Text>
                    {priority?.time && (
                      <View
                        style={[
                          styles.priorityBadge,
                          {
                            backgroundColor:
                              priority.time.getHours() < 12
                                ? "#046D8E"
                                : "#FF4646",
                          },
                        ]}
                      >
                        <Text style={styles.priorityBadgeText_hour}>
                          {priority.time.getHours() % 12 === 0
                            ? 12
                            : priority.time.getHours() % 12}
                        </Text>
                        <Text style={styles.priorityBadgeText_minute}>
                          {priority.time.getMinutes() === 0 ? "00" : "30"}
                        </Text>
                      </View>
                    )}
                  </>
                )}
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
    gap: 8,
    borderRadius: 8,
    overflow: "hidden",
    opacity: 0.95,
  },
  priorityText: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 16 * 1.125,
  },
  priorityBadge: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 4 * 3,
    borderRadius: 16,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    alignSelf: "flex-start",
    opacity: 0.75,
  },
  priorityBadgeText_hour: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  priorityBadgeText_minute: {
    fontSize: 16 * 0.75,
    color: "#fff",
  },
});
