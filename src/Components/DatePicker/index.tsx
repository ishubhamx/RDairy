import { View, StyleSheet, Text } from "react-native";
import React, { FC, forwardRef, useCallback, useMemo, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Calendar, DateData } from "react-native-calendars";
import moment from "moment";
import { MD3Colors } from "react-native-paper";
export type Ref = BottomSheetModal;

interface IProps {
  onDateSelect: (date: string) => void;
}
const CustomBottomSheetModal = forwardRef<Ref, IProps>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const [selected, setSelected] = useState("");

  const initialDate = moment().format("YYYY-MM-DD");
  const maxDate = moment().add(1, "days").format("YYYY-MM-DD");

  const handleDatePress = useCallback(
    (date: DateData) => {
      props.onDateSelect(date.dateString);
      setSelected(date.dateString);
    },
    [props]
  );
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      enablePanDownToClose={true}
      handleIndicatorStyle={{ backgroundColor: "#fff" }}
      backgroundStyle={{ backgroundColor: "#1d0f4e" }}
      snapPoints={snapPoints}
    >
      <Calendar
        initialDate={initialDate}
        maxDate={maxDate}
        style={{ height: "100%" }}
        onDayPress={handleDatePress}
        markingType={"custom"}
        markedDates={{
          [selected]: {
            selected: true,

            disableTouchEvent: true,

            // dotColor: "#5f9ea0",
            customStyles: {
              container: {
                backgroundColor: MD3Colors.primary80,
              },
              text: {
                color: "black",
              },
            },
          },
          [initialDate]: {
            selected: true,
            marked: true,
            selectedColor: MD3Colors.primary10,
            dotColor: "#ffa500",
          },
        }}
        disableAllTouchEventsForDisabledDays={true}
      />
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});

export default CustomBottomSheetModal;
