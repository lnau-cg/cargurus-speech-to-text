import type React from "react";
import { useTranslation } from "react-i18next";
import { Home, BookOpen } from "./icons";

// Stripped to a dictation-only app: Chat, Notes, Upload, Integrations, and
// Insights nav entries removed. Their views/code remain but are unreachable
// from the sidebar. Snippets lives as a tab inside Dictionary.
export type ControlPanelView =
  "home" | "insights" | "chat" | "personal-notes" | "dictionary" | "upload" | "integrations";

export interface ControlPanelNavItem {
  id: ControlPanelView;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

/**
 * Single source of truth for main-window navigation. The sidebar renders these
 * rows and the top bar shows the active item's label as the page title, so the
 * two can never disagree.
 */
export function useControlPanelNavItems(): ControlPanelNavItem[] {
  const { t } = useTranslation();

  return [
    { id: "home", label: t("sidebar.home"), icon: Home },
    { id: "dictionary", label: t("sidebar.dictionary"), icon: BookOpen },
  ];
}
