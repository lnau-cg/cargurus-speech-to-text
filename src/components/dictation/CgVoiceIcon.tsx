import { cn } from "../lib/utils";
import { CARGURUS_VOICE_MARK } from "../../assets/cargurusVoiceMark";

/**
 * The brand gradient (red → purple → blue, top-left to bottom-right) from the
 * CarGurus voice icon, as live CSS so it can expand/flood a surface. Shared
 * with VoicePill, which floods the whole pill with it while listening.
 */
export const CG_VOICE_GRADIENT =
  "linear-gradient(135deg, #C8102E 0%, #7A1E66 50%, #1E6FE0 100%)";

// The white mark asset is 160×65; the mark fills ~72% of the circle's width.
const MARK_ASPECT = 65 / 160;
const MARK_WIDTH_RATIO = 0.72;

interface CgVoiceIconProps {
  size?: number;
  /** The icon's own gradient circle; fades out when the surface behind it floods instead. */
  backgroundVisible?: boolean;
  className?: string;
}

/** The white "CG + soundwaves" mark centered on a full circle of the brand gradient. */
export function CgVoiceIcon({ size = 28, backgroundVisible = true, className }: CgVoiceIconProps) {
  const markWidth = Math.round(size * MARK_WIDTH_RATIO);
  const markHeight = Math.round(markWidth * MARK_ASPECT);

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span
        className="absolute inset-0 transition-opacity duration-300 ease-out"
        style={{ background: CG_VOICE_GRADIENT, opacity: backgroundVisible ? 1 : 0 }}
      />
      <img
        src={CARGURUS_VOICE_MARK}
        alt=""
        aria-hidden="true"
        draggable={false}
        decoding="async"
        width={markWidth}
        height={markHeight}
        className="relative"
      />
    </span>
  );
}
