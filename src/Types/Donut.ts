import type { EasingFunction, StyleProp, ViewStyle } from "react-native";
import type { Linecap } from "react-native-svg";
import type { OptionalChildren } from "./React";

export interface ChartDatum {
  label: string;
  value: number;
  stroke?: string | string[];
  style?: StyleProp<ViewStyle>;
}

export type RenderPhase = "INITIAL" | "UPDATE";

export interface DonutProps extends OptionalChildren {
  delay?: number;
  duration?: number;
  data: ChartDatum[];
  strokeWidth?: number;
  easing?: EasingFunction;
  strokeLinecap?: Linecap;
  style?: StyleProp<ViewStyle>;
  onMeasure?: (dimensions: number) => void;
}
