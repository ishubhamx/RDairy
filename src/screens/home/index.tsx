import React, { FC, useRef, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Chip,
  Icon,
  Searchbar,
  SegmentedButtons,
} from "react-native-paper";
import CustomBottomSheetModal from "../../Components/DatePicker";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import moment from "moment";
import RnIncrementDecrementBtn from "../../Components/QuantityButton";
import { Images } from "../../assets";
// import { QuantityButton } from "../../Components/QuantityButton";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f632",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d723",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba4",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f635",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d726",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-746c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-44568d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f4444-bd96-145571e29d72",
    title: "Third Item",
  },
];

type ItemProps = { title: string };
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const Item = ({ title }: ItemProps) => (
  <Card style={styles.item}>
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={LeftContent}
    />
    <Card.Content>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Icon size={32} source={"cow"} />
        <RnIncrementDecrementBtn
          styleBtn={{ marginLeft: 16 }}
          minVal={0}
          minreq={0}
          max={10}
          val={0}
        />
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Icon size={32} source={Images.buffalo} />
        <RnIncrementDecrementBtn
          styleBtn={{ marginLeft: 16 }}
          minVal={0}
          minreq={0}
          max={10}
          val={0}
        />
      </View>
    </Card.Content>
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
  // <Surface style={styles.item}>
  //   <Text style={styles.title}>{title}</Text>
  // </Surface>
);
// const HeaderComponent = <CustomBottomSheetModal />;
export const HomeScreen: FC = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [value, setValue] = React.useState("");
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("MMM DD, YY")
  );
  const { dismiss } = useBottomSheetModal();

  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  const onDateSelect = (date) => {
    const formattedDate = moment(date).format("MMM DD, YYYY");
    setSelectedDate(formattedDate);
    bottomSheetRef.current?.dismiss();
  };
  const [searchQuery, setSearchQuery] = React.useState("");
  const headerComponent = (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Chip
        elevated
        style={{ margin: 16, flexWrap: "wrap" }}
        icon="calendar"
        onPress={handlePresentModalPress}
      >
        {selectedDate}
      </Chip>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "walk",
              label: "Morning",
              icon: "weather-sunset-up",
              // style: { backgroundColor: "#ffffff" },
            },

            {
              value: "drive",
              label: "Evening",
              icon: "weather-sunset-down",
              // style: { backgroundColor: "#ffffff" },
            },
          ]}
        />
      </SafeAreaView>
    </View>
  );
  return (
    <View style={{ flex: 1, margin: 16 }}>
      <Searchbar
        style={{ borderRadius: 8, marginBottom: 8 }}
        elevation={2}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        ListHeaderComponent={headerComponent}
        // stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 94 }}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <CustomBottomSheetModal
        onDateSelect={onDateSelect}
        ref={bottomSheetRef}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    borderRadius: 8,
    // padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});
