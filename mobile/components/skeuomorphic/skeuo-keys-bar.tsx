import { SkeuoBottomBar } from "./skeuo-bottom-bar";
import type { ComponentProps } from "react";
export function SkeuoKeysBar(
  props: Omit<ComponentProps<typeof SkeuoBottomBar>, "variant">,
) {
  return <SkeuoBottomBar {...props} variant="keys" />;
}
