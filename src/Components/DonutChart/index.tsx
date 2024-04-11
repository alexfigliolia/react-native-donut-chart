import { memo, useCallback, useMemo, useState } from "react";
import type { LayoutChangeEvent } from "react-native";
import { Easing, View } from "react-native";
import { Gradient } from "Components/Gradient";
import { Section } from "Components/Section";
import { DonutController } from "Controllers";
import { useController } from "Hooks";
import type { DonutProps } from "Types/Donut";
import { Styles } from "./Styles";

/**
 * ### Donut Chart
 *
 * A component for creating beautiful responsive
 * donuts using React Native
 *
 * ```tsx
 *  <DonutChart
 *    delay={0}
 *    duration={1500}
 *    strokeWidth={12}
 *    strokeLinecap="round"
 *    style={Styles.yourContrainerStyles}
 *    data={[{
 *      label: "rent",
 *      value: 2000,
 *      stroke: "rgb(228, 69, 69)",
 *      style: Styles.yourSVGStyles // such as shadow and stuff
 *    }]}
 *    easing={Easing.out(Easing.exp)}
 *    onMeasure={(dimensions: number) => {}}>
 *    {children}
 *  </DonutChart>
 * ```
 */
export const DonutChart = memo(function DonutChart({
  data,
  style,
  children,
  onMeasure,
  delay = 0,
  duration = 1500,
  strokeWidth = 25,
  strokeLinecap = "round",
  easing = Easing.inOut(Easing.exp),
}: DonutProps) {
  const [width, setWidth] = useState(strokeWidth);
  const [renderSections, render] = useState(false);
  const gap = useMemo(
    () => (data.length < 2 ? 0 : strokeWidth * 2),
    [strokeWidth, data.length],
  );
  const center = useMemo(() => width / 2, [width]);
  const radius = useMemo(() => (width - strokeWidth) / 2, [width, strokeWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const controller = useController(new DonutController(data));
  controller.update(data);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout;
      setWidth(width);
      onMeasure?.(width);
      render(true);
    },
    [onMeasure],
  );

  return (
    <View
      onLayout={onLayout}
      style={[Styles.container, style, { height: width }]}
    >
      <View style={Styles.inner}>
        {renderSections &&
          controller.data.map(({ label, style, stroke = "#000" }, i) => {
            return (
              <Section
                gap={gap}
                key={label}
                size={width}
                delay={delay}
                style={style}
                easing={easing}
                radius={radius}
                center={center}
                duration={duration}
                strokeWidth={strokeWidth}
                strokeLinecap={strokeLinecap}
                circumference={circumference}
                rotation={controller.angles[i]}
                value={controller.percentages[i]}
                renderPhase={controller.renderPhase}
                stroke={DonutController.parseStroke(label, stroke)}
              >
                {DonutController.renderGradient(stroke) && (
                  <Gradient label={label} colors={stroke} />
                )}
              </Section>
            );
          })}
      </View>
      {children}
    </View>
  );
});
