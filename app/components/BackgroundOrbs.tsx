/* Server component — pure CSS animations, no JS needed */
export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />
    </div>
  );
}
