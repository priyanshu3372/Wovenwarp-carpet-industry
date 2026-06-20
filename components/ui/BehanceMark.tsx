type BehanceMarkProps = {
  size?: number;
  className?: string;
};

export default function BehanceMark({ size = 16, className }: BehanceMarkProps) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: Math.max(10, Math.round(size * 0.72)),
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: 0,
      }}
    >
      Be
    </span>
  );
}
