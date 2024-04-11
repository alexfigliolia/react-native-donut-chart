import type { EasingFunction, StyleProp, ViewStyle } from "react-native";
import type { Linecap } from "react-native-svg";
import type { Interpolation } from "Controllers";
import type { RenderPhase } from "./Donut";
import type { OptionalChildren } from "./React";

export interface SectionProps extends OptionalChildren {
  size: number;
  gap: number;
  value: number;
  delay: number;
  radius: number;
  center: number;
  stroke: string;
  duration: number;
  rotation: number;
  strokeWidth: number;
  circumference: number;
  strokeLinecap: Linecap;
  easing: EasingFunction;
  renderPhase: RenderPhase;
  style?: StyleProp<ViewStyle>;
}

export interface SectionState {
  drawInterpolation: Interpolation<number>;
  rotateInterpolation: Interpolation<string>;
}
