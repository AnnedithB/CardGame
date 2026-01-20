'use client';

interface GameButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function GameButton({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
}: GameButtonProps) {
  const baseStyles =
    'px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border-2 border-amber-500'
      : 'bg-amber-900/80 text-amber-200 hover:bg-amber-800/80 hover:text-white border-2 border-amber-700';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles}`}
    >
      {children}
    </button>
  );
}
