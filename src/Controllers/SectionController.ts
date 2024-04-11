import type { RenderPhase, SectionProps } from "Types";
import { Interpolation } from "./Interpolation";

export class SectionController {
  public static readonly opacityInterpolation = new Interpolation(0, 1);

  public static stateFrom(props: SectionProps) {
    const { circumference, rotation = 0, renderPhase } = props;
    return {
      drawInterpolation: new Interpolation(
        circumference,
        this.strokeDashoffset(props),
      ),
      rotateInterpolation: this.rotationInterpolation(rotation, renderPhase),
    };
  }

  public static strokeDashoffset(props: SectionProps) {
    const { value, gap = 0, circumference } = props;
    return circumference * (1 - value) + gap;
  }

  public static rotationInterpolation(
    rotation: number,
    renderPhase: RenderPhase,
  ) {
    const toRotation = `${rotation}deg`;
    const fromRotation = renderPhase === "INITIAL" ? "0deg" : toRotation;
    return new Interpolation(fromRotation, toRotation);
  }
}
