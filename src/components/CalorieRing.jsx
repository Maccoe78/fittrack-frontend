function CalorieRing({ value, subtitle, progress = 1, size = 220 }) {
    const stroke = 14;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.min(Math.max(progress, 0), 1);
    const offset = circumference * (1 - clamped);

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth={stroke}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#a3e635"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-bold text-white">{value}</p>
                {subtitle && (
                    <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

export default CalorieRing;