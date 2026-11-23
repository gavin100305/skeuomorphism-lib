import React from "react";
export type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  disabled?: boolean;
  variant?: "default" | "accent";
  accessibilityLabel?: string;
};
export type ToggleProps = {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};
export type OptionsProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string; disabled?: boolean }[];
};
export type OverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
};
