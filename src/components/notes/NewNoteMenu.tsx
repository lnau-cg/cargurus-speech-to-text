import { useTranslation } from "react-i18next";
import { Plus } from "../icons";
import { SPLIT_BUTTON_GROUP_CLASS, SPLIT_BUTTON_SEGMENT_CLASS } from "../ui/splitButton";
import { cn } from "../lib/utils";

// Matched to the search bar it sits beside: the same translucent fill that
// lifts on hover, under the same hairline.
const SOFT_GROUP_CLASS = "bg-foreground/4 dark:bg-white/5";
const SOFT_SEGMENT_CLASS =
  "hover:bg-foreground/6 focus-visible:bg-foreground/6 focus-visible:ring-1 focus-visible:ring-primary/30 dark:hover:bg-white/8 dark:focus-visible:bg-white/8";

interface NewNoteButtonProps {
  onNewNote: () => void;
}

/** The topbar's "New note" button. */
export default function NewNoteButton({ onNewNote }: NewNoteButtonProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(SPLIT_BUTTON_GROUP_CLASS, SOFT_GROUP_CLASS, "h-8")}>
      <button
        type="button"
        onClick={onNewNote}
        className={cn(
          SPLIT_BUTTON_SEGMENT_CLASS,
          SOFT_SEGMENT_CLASS,
          "gap-1.5 whitespace-nowrap ps-3 pe-3.5"
        )}
      >
        <Plus size={14} />
        {t("notes.list.newNote")}
      </button>
    </div>
  );
}
