import React from "react";
import type { ButtonProps } from "./types";
import { SkeuoButton } from "./skeuo-button";
export function SkeuoIconButton({
  icon,
  label,
  ...props
}: Omit<ButtonProps, "children" | "accessibilityLabel"> & {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <SkeuoButton {...props} accessibilityLabel={label}>
      {icon}
    </SkeuoButton>
  );
}
