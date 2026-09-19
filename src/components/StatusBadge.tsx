type Status = 'Новая' | 'В работе' | 'Ожидает запчасть' | 'Завершена'

const CONFIG: Record<Status, { bg: string; text: string; dot: string }> = {
  'Новая': { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6' },
  'В работе': { bg: '#fefce8', text: '#a16207', dot: '#eab308' },
  'Ожидает запчасть': { bg: '#fff7ed', text: '#c2410c', dot: '#f97316' },
  'Завершена': { bg: '#f0fdf4', text: '#166534', dot: '#22c55e' },
}

export default function StatusBadge({ status }: { status: Status }) {
  const cfg = CONFIG[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.dot }} />
      {status}
    </span>
  )
}
