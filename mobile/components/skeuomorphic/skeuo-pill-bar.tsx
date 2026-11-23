import { SkeuoBottomBar } from "./skeuo-bottom-bar";
import type { ComponentProps } from "react";
export function SkeuoPillBar(
  props: Omit<ComponentProps<typeof SkeuoBottomBar>, "variant">,
) {
  return <SkeuoBottomBar {...props} variant="pill" />;
}
