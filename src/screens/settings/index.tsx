import { FC, useCallback, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, { BottomSheetView,useBottomSheet } from "@gorhom/bottom-sheet";
import { Button } from "react-native-paper";

export const Settings: FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { snapToPosition } = useBottomSheet();
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet  ref={bottomSheetRef} onChange={handleSheetChanges}>
        <Button onPress={()=>snapToPosition(300)} style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </Button>
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
