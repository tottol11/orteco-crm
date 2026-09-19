import { useState } from "react";
import StatusBadge from "./StatusBadge";
import NewRequestModal from "./NewRequestModal";

interface Props {
  onOpenRequest: () => void;
}

type Status = "Новая" | "В работе" | "Ожидает запчасть" | "Завершена";

interface Request {
  id: number;
  client: string;
  equipment: string;
  responsible: string;
  status: Status;
  date: string;
  clickable: boolean;
}

const INITIAL_REQUESTS: Request[] = [
  {
    id: 154,
    client: "Coffee Boom",
    equipment: "La Marzocco Linea PB",
    responsible: "Болат",
    status: "В работе",
    date: "18.09.2026",
    clickable: true,
  },
  {
    id: 155,
    client: "Lanzhou",
    equipment: "Rational SCC 61",
    responsible: "Султан",
    status: "Новая",
    date: "18.09.2026",
    clickable: false,
  },
  {
    id: 156,
    client: "Del Papa",
    equipment: "Hoshizaki IM-65NE",
    responsible: "Данияр",
    status: "Ожидает запчасть",
    date: "17.09.2026",
    clickable: false,
  },
  {
    id: 157,
    client: "Coffee Original",
    equipment: "Nuova Simonelli Appia",
    responsible: "Болат",
    status: "Завершена",
    date: "17.09.2026",
    clickable: false,
  },
];

type Filter = "Все" | "Новые" | "В работе" | "Ожидают запчасть" | "Завершённые";

const FILTERS: Filter[] = [
  "Все",
  "Новые",
  "В работе",
  "Ожидают запчасть",
  "Завершённые",
];

const FILTER_MAP: Record<Filter, Status | null> = {
  Все: null,
  Новые: "Новая",
  "В работе": "В работе",
  "Ожидают запчасть": "Ожидает запчасть",
  Завершённые: "Завершена",
};

export default function RequestsScreen({ onOpenRequest }: Props) {
  const [filter, setFilter] = useState<Filter>("Все");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState<Request[]>(INITIAL_REQUESTS);
  const [highlight, setHighlight] = useState<number | null>(null);

  const filtered = requests.filter((r) => {
    const matchFilter =
      FILTER_MAP[filter] === null || r.status === FILTER_MAP[filter];
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.client.toLowerCase().includes(q) ||
      r.equipment.toLowerCase().includes(q) ||
      String(r.id).includes(q);
    return matchFilter && matchSearch;
  });

  function handleCreate(data: {
    client: string;
    equipment: string;
    description: string;
    responsible: string;
    priority: string;
  }) {
    const nextId = Math.max(...requests.map((r) => r.id)) + 1;
    const today = "19.09.2026";
    const newReq: Request = {
      id: nextId,
      client: data.client,
      equipment: data.equipment,
      responsible: data.responsible,
      status: "Новая",
      date: today,
      clickable: false,
    };
    setRequests([newReq, ...requests]);
    setHighlight(nextId);
    setShowModal(false);
    setFilter("Все");
    setTimeout(() => setHighlight(null), 2500);
  }

  return (
    <>
      <div className="p-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
            Заявки
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded text-sm font-medium text-white transition-colors"
            style={{ background: "#3b6fd4" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#2f5ab8")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#3b6fd4")}
          >
            + Новая заявка
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative" style={{ width: 280 }}>
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9ca3af"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Поиск заявок"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded border outline-none transition-colors"
              style={{
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                color: "#111827",
              }}
              onFocus={(ev) => (ev.currentTarget.style.borderColor = "#3b6fd4")}
              onBlur={(ev) => (ev.currentTarget.style.borderColor = "#e5e7eb")}
            />
          </div>

          <div
            className="flex items-center gap-0 rounded border overflow-hidden"
            style={{ border: "1px solid #e5e7eb", background: "#ffffff" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-3 py-2 text-xs font-medium transition-colors"
                style={{
                  background: filter === f ? "#111827" : "transparent",
                  color: filter === f ? "#ffffff" : "#6b7280",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: "1px solid #e5e7eb", background: "#ffffff" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #f3f4f6",
                  background: "#f9fafb",
                }}
              >
                {[
                  "№",
                  "Клиент",
                  "Оборудование",
                  "Ответственный",
                  "Статус",
                  "Дата",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                    style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr
                  key={r.id}
                  onClick={() => r.clickable && onOpenRequest()}
                  className="transition-colors"
                  style={{
                    borderBottom:
                      i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                    cursor: r.clickable ? "pointer" : "default",
                    background: highlight === r.id ? "#eff6ff" : "",
                    transition: "background 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (r.clickable && highlight !== r.id)
                      (e.currentTarget as HTMLElement).style.background =
                        "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    if (r.clickable)
                      (e.currentTarget as HTMLElement).style.background =
                        highlight === r.id ? "#eff6ff" : "";
                  }}
                >
                  <td
                    className="px-5 py-4 font-medium"
                    style={{ color: r.clickable ? "#3b6fd4" : "#374151" }}
                  >
                    #{r.id}
                  </td>
                  <td
                    className="px-5 py-4 font-medium"
                    style={{ color: "#111827" }}
                  >
                    {r.client}
                  </td>
                  <td className="px-5 py-4" style={{ color: "#374151" }}>
                    {r.equipment}
                  </td>
                  <td className="px-5 py-4" style={{ color: "#374151" }}>
                    {r.responsible}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={r.status} />
                  </td>
                  <td
                    className="px-5 py-4 tabular-nums"
                    style={{ color: "#6b7280" }}
                  >
                    {r.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div
              className="py-12 text-center text-sm"
              style={{ color: "#9ca3af" }}
            >
              Заявки не найдены
            </div>
          )}
        </div>

        <p className="mt-3 text-xs" style={{ color: "#9ca3af" }}>
          Показано {filtered.length} из {requests.length} заявок
        </p>
      </div>

      {showModal && (
        <NewRequestModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreate}
        />
      )}
    </>
  );
}
