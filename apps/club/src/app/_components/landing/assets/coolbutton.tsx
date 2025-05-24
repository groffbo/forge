export default function CoolButton({
  label,
  onClick,
  className,
  style,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={`
        relative z-10 overflow-hidden group 
        bg-gradient-to-r from-purple-800 to-purple-900 text-white 
        px-6 py-3 font-semibold rounded-lg 
        transition-all duration-200 hover:brightness-110 active:scale-95
        ${className}`}
    >
      <span className="relative z-10 flex items-center">{label}</span>
      <span className="absolute inset-0 bg-white/10 blur-sm translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
    </button>
  );
}
