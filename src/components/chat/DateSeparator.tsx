interface DateSeparatorProps {
  label: string
}

export function DateSeparator({ label }: DateSeparatorProps) {
  return (
    <div className="flex justify-center py-3">
      <span className="bg-white/90 text-wa-text-secondary text-[12.5px] px-3 py-[5px] rounded-lg shadow-sm uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}
