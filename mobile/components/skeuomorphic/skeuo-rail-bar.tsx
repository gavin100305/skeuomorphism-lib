import { SkeuoBottomBar } from "./skeuo-bottom-bar";
import type { ComponentProps } from "react";
export function SkeuoRailBar(
  props: Omit<ComponentProps<typeof SkeuoBottomBar>, "variant">,
) {
  return <SkeuoBottomBar {...props} variant="rail" />;
}
