import type { OverlayProps } from "./types";
import { Overlay } from "./overlay";
export function SkeuoBottomSheet(props: OverlayProps) {
  return <Overlay {...props} sheet />;
}
