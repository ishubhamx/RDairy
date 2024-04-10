import React, { FC } from "react";
import { View, Text, StyleProp, ViewStyle } from "react-native";

import { Button, Icon, MD3Colors } from "react-native-paper";
import styles from "./style";

interface IProps {
  val?: number;
  minVal?: number;
  max?: number;
  disableControl?: boolean;
  minreq?: number;
  handleClick?: (val: number) => void;
  styleTextInput?: StyleProp<ViewStyle>;
  styleBtn?: StyleProp<ViewStyle>;
  disabledColor?: string;
  activeColor?: string;
  labelStyle?: any;
}
const RnIncrementDecrementBtn: FC<IProps> = ({
  val,
  minVal,
  max,
  disableControl,
  minreq,
  handleClick,
  styleTextInput,
  styleBtn,
  disabledColor,
  activeColor,
  labelStyle,
}) => {
  // console.log(typeof labelFontSize);
  const [value, changeValue] = React.useState(0);
  const [count, changeCount] = React.useState(100);
  const [minReq, addMinReq] = React.useState(0);
  const [min, addMinValue] = React.useState(0);
  const [leftBtnDisable, changeLeftBtnDisable] = React.useState(false);
  const [rightBtnDisable, changeRightBtnDisable] = React.useState(false);
  const [disableColorBtn, addDisableColor] = React.useState("#eeeeee");
  const [activeColorBtn, addActiveColor] = React.useState(MD3Colors.primary90);
  const minQty = 0.5;
  React.useEffect(() => {
    if (val) {
      changeValue(val);
    }
    if (max) {
      changeLeftBtnDisable(max <= 0);
      changeCount(max - 0);
    }
    if (minreq) {
      addMinReq(minreq);
    }
    if (val && max) {
      changeCount(max - val);

      changeRightBtnDisable(val <= 0);
    }
    if (minVal) {
      changeRightBtnDisable(value <= minVal);
      addMinValue(minVal);
    }
    if (disabledColor) {
      addDisableColor(disabledColor);
    }
    if (activeColor) {
      addActiveColor(activeColor);
    }
  }, [val, max, minreq, minVal, disabledColor, activeColor]);

  // function to handle btn click
  const handlePress = (val) => {
    handleClick ? handleClick(val) : {};
  };
  return (
    <View style={styles.viewOuter}>
      <View
        style={[
          styles.viewBtnLeft,
          {
            backgroundColor:
              rightBtnDisable || disableControl
                ? disableColorBtn
                : activeColorBtn,
          },
          styleBtn,
        ]}
      >
        <Button
          labelStyle={[styles.labelStyle, labelStyle]}
          disabled={rightBtnDisable || disableControl}
          onPress={() => {
            // changeDisable(true);
            if (value - minQty <= min || value - minQty < minReq) {
              changeLeftBtnDisable(false);
              changeRightBtnDisable(true);
              if (value - minQty <= min) {
                changeValue(value - minQty);
                changeCount(count + minQty);
                handlePress(value - minQty);
              }
              if (value - 1 < minReq) {
                changeCount(count + minReq);
                changeValue(0);
                handlePress(0);
              }
            } else {
              changeLeftBtnDisable(false);
              changeCount(count + minQty);
              changeValue(value - minQty);
              handlePress(value - minQty);
            }
          }}
        >
          <Icon source="minus" size={20} />
        </Button>
      </View>
      <View style={[styles.viewTextInput, styleTextInput]}>
        <Text
          style={[
            { color: "#000000" },
            labelStyle ? labelStyle : styles.labelStyle,
          ]}
        >
          {value}
        </Text>
      </View>
      <View
        style={[
          styles.viewBtnRight,
          {
            backgroundColor:
              leftBtnDisable || disableControl
                ? disableColorBtn
                : activeColorBtn,
          },
          styleBtn,
        ]}
      >
        <Button
          labelStyle={[styles.labelStyle, labelStyle]}
          disabled={leftBtnDisable || disableControl}
          removeClippedSubviews
          onPress={() => {
            if (count - 1 <= 0) {
              changeCount(0);
              changeRightBtnDisable(false);
              changeLeftBtnDisable(true);
              changeValue(value + 1);
            } else {
              if (value < minReq) {
                changeCount(count - minReq);
                changeValue(value + minReq);
                handlePress(value + minReq);
              } else {
                changeValue(value + minQty);
                handlePress(value + minQty);
              }
              changeRightBtnDisable(false);
            }
          }}
        >
          <Icon source="plus" size={20} />
        </Button>
      </View>
    </View>
  );
};

export default RnIncrementDecrementBtn;
