import React from "react";
import Animated, { Layout, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useTheme } from "styled-components/native";
import { ItemStatus } from "./types";
import { Platform } from "react-native";

const useBulletStyles = () => {
  const { colors } = useTheme();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const BulletStyle: { [key in ItemStatus]: any } = {
    [ItemStatus.active]: {
      width: 16,
      height: 6,
      backgroundColor: colors.opacityDefault.c80,
      borderRadius: 1000,
    },
    [ItemStatus.nearby]: {
      width: 8,
      height: 6,
      backgroundColor: colors.opacityDefault.c30,
      borderRadius: 1000,
    },
    [ItemStatus.far]: {
      width: 4,
      height: 6,
      backgroundColor: colors.opacityDefault.c10,
      borderRadius: 1000,
    },
    [ItemStatus.none]: {
      width: 0,
      height: 6,
      backgroundColor: colors.opacityDefault.c10,
      borderRadius: 1000,
    },
  };

  return BulletStyle;
};

const Bullet = ({ type }: { type: ItemStatus }) => {
  const bulletStyles = useBulletStyles();

  const animatedStyles = useAnimatedStyle(
    () => ({
      width: withSpring(bulletStyles[type].width),
      height: withSpring(bulletStyles[type].height),
      backgroundColor: withSpring(bulletStyles[type].backgroundColor),
    }),
    [type],
  );

  return (
    <Animated.View
      layout={Platform.OS === "ios" ? Layout.duration(100) : undefined}
      style={[bulletStyles[type], animatedStyles]}
    />
  );
};

export default Bullet;
