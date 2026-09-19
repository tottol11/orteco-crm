import { useState } from "react";
import ActModal from "./ActModal";

interface Props {
  onBack: () => void;
  onWarehouse: () => void;
}

const STATUSES = ["Новая", "В работе", "Ожидает запчасть", "Завершена"];

const STATUS_STYLE: Record<string, { bg: string; text: string; dot: string }> =
  {
    Новая: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
    "В работе": { bg: "#fefce8", text: "#a16207", dot: "#eab308" },
    "Ожидает запчасть": { bg: "#fff7ed", text: "#c2410c", dot: "#f97316" },
    Завершена: { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
  };

const ACT_STATUS_STYLE: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  Сформирован: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  Подписан: { bg: "#f0fdf4", text: "#166534", dot: "#22c55e" },
};

const ACTS = [
  {
    id: "ACT-2026-0154",
    client: "Coffee Boom",
    ref: "#154",
    date: "19.09.2026",
    actStatus: "Сформирован",
    current: true,
  },
  {
    id: "ACT-2026-0152",
    client: "Del Papa",
    ref: "#152",
    date: "17.09.2026",
    actStatus: "Подписан",
    current: false,
  },
  {
    id: "ACT-2026-0148",
    client: "Lanzhou",
    ref: "#148",
    date: "15.09.2026",
    actStatus: "Подписан",
    current: false,
  },
];

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: "1px solid #e5e7eb", background: "#ffffff" }}
    >
      <div
        className="px-5 py-3.5"
        style={{ borderBottom: "1px solid #f3f4f6", background: "#f9fafb" }}
      >
        <h3
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "#6b7280", letterSpacing: "0.07em" }}
        >
          {title}
        </h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs" style={{ color: "#9ca3af" }}>
        {label}
      </span>
      <span
        className={`text-sm font-medium ${mono ? "font-mono" : ""}`}
        style={{ color: "#111827" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function RequestDetailScreen({ onBack, onWarehouse }: Props) {
  const [status, setStatus] = useState("В работе");
  const [parts, setParts] = useState([
    { name: "Насос A12", qty: 1, unit: "шт." },
    { name: "Прокладка B14", qty: 2, unit: "шт." },
  ]);
  const [showAddPart, setShowAddPart] = useState(false);
  const [newPart, setNewPart] = useState("");
  const [showActModal, setShowActModal] = useState(false);

  const statusCfg = STATUS_STYLE[status];

  function addPart() {
    if (newPart.trim()) {
      setParts([...parts, { name: newPart.trim(), qty: 1, unit: "шт." }]);
      setNewPart("");
      setShowAddPart(false);
    }
  }

  return (
    <>
      <div className="p-8" style={{ maxWidth: 900 }}>
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm mb-6 transition-colors"
          style={{ color: "#6b7280" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#111827")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Назад к заявкам
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
            Заявка №154
          </h1>
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium"
              style={{ background: statusCfg.bg, color: statusCfg.text }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: statusCfg.dot }}
              />
              {status}
            </span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-sm rounded border px-3 py-1.5 outline-none"
              style={{
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                color: "#374151",
                cursor: "pointer",
              }}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Main info */}
          <Section title="Основная информация">
            <div className="grid grid-cols-3 gap-6">
              <Field label="Клиент" value="Coffee Boom" />
              <Field label="Контактный телефон" value="+7 777 123 45 67" />
              <Field label="Адрес" value="Алматы" />
              <Field label="Оборудование" value="La Marzocco Linea PB" />
              <Field label="Серийный номер" value="LM-98234" mono />
              <Field label="Ответственный" value="Болат" />
            </div>
            <div
              className="mt-5 pt-5"
              style={{ borderTop: "1px solid #f3f4f6" }}
            >
              <span
                className="text-xs block mb-1.5"
                style={{ color: "#9ca3af" }}
              >
                Описание проблемы
              </span>
              <p
                className="text-sm"
                style={{ color: "#111827", lineHeight: "1.6" }}
              >
                Кофемашина не нагревает воду. При включении группа нагревается
                частично, температура не достигает рабочих значений.
              </p>
            </div>
          </Section>

          {/* Parts */}
          <Section title="Использованные запчасти">
            <div className="flex flex-col gap-0">
              {parts.map((part, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3"
                  style={{
                    borderBottom:
                      i < parts.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <span className="text-sm" style={{ color: "#111827" }}>
                    {part.name}
                  </span>
                  <span
                    className="text-sm tabular-nums px-2.5 py-0.5 rounded"
                    style={{ background: "#f3f4f6", color: "#374151" }}
                  >
                    {part.qty} {part.unit}
                  </span>
                </div>
              ))}
            </div>

            {showAddPart ? (
              <div
                className="flex gap-2 mt-3 pt-3"
                style={{ borderTop: "1px solid #f3f4f6" }}
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="Название запчасти"
                  value={newPart}
                  onChange={(e) => setNewPart(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPart()}
                  className="flex-1 px-3 py-2 text-sm rounded border outline-none"
                  style={{ border: "1px solid #e5e7eb" }}
                  onFocus={(ev) =>
                    (ev.currentTarget.style.borderColor = "#3b6fd4")
                  }
                  onBlur={(ev) =>
                    (ev.currentTarget.style.borderColor = "#e5e7eb")
                  }
                />
                <button
                  onClick={addPart}
                  className="px-4 py-2 rounded text-sm font-medium text-white"
                  style={{ background: "#3b6fd4" }}
                >
                  Добавить
                </button>
                <button
                  onClick={() => setShowAddPart(false)}
                  className="px-3 py-2 rounded text-sm"
                  style={{ background: "#f3f4f6", color: "#6b7280" }}
                >
                  Отмена
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAddPart(true)}
                className="mt-3 text-sm flex items-center gap-1.5 transition-colors"
                style={{ color: "#3b6fd4" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#2f5ab8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#3b6fd4")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Добавить запчасть
              </button>
            )}

            <div
              className="mt-4 pt-4 flex items-center gap-2"
              style={{ borderTop: "1px solid #f3f4f6" }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              <button
                onClick={onWarehouse}
                className="text-xs transition-colors"
                style={{ color: "#9ca3af" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3b6fd4")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              >
                Перейти к складу →
              </button>
            </div>
          </Section>

          {/* Acts */}
          <Section title="Акты выполненных работ">
            {/* Acts table */}
            <div
              className="rounded-lg overflow-hidden mb-4"
              style={{ border: "1px solid #f3f4f6" }}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr
                    style={{
                      background: "#f9fafb",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    {[
                      "Номер акта",
                      "Клиент",
                      "Заявка",
                      "Дата",
                      "Статус",
                      "",
                    ].map((col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-2.5 text-xs font-semibold"
                        style={{ color: "#9ca3af" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ACTS.map((act, i) => {
                    const cfg = ACT_STATUS_STYLE[act.actStatus];
                    return (
                      <tr
                        key={act.id}
                        style={{
                          borderBottom:
                            i < ACTS.length - 1 ? "1px solid #f3f4f6" : "none",
                        }}
                      >
                        <td
                          className="px-4 py-3 font-mono text-xs font-medium"
                          style={{ color: act.current ? "#3b6fd4" : "#374151" }}
                        >
                          {act.id}
                        </td>
                        <td
                          className="px-4 py-3 text-sm"
                          style={{ color: "#374151" }}
                        >
                          {act.client}
                        </td>
                        <td
                          className="px-4 py-3 text-sm"
                          style={{ color: "#6b7280" }}
                        >
                          {act.ref}
                        </td>
                        <td
                          className="px-4 py-3 text-sm tabular-nums"
                          style={{ color: "#6b7280" }}
                        >
                          {act.date}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded"
                            style={{ background: cfg.bg, color: cfg.text }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: cfg.dot }}
                            />
                            {act.actStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {act.current && (
                            <button
                              onClick={() => setShowActModal(true)}
                              className="text-xs transition-colors"
                              style={{ color: "#3b6fd4" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "#2f5ab8")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.color = "#3b6fd4")
                              }
                            >
                              Открыть →
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Current act actions */}
            <div
              className="rounded-lg p-4 flex items-center justify-between"
              style={{ background: "#f9fafb", border: "1px solid #f3f4f6" }}
            >
              <div>
                <p
                  className="text-xs font-medium font-mono mb-0.5"
                  style={{ color: "#111827" }}
                >
                  ACT-2026-0154
                </p>
                <p className="text-xs" style={{ color: "#9ca3af" }}>
                  Дата выполнения: 19.09.2026 · Ответственный: Болат
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowActModal(true)}
                  className="px-3 py-1.5 rounded text-xs font-medium transition-colors"
                  style={{
                    border: "1px solid #e5e7eb",
                    background: "#ffffff",
                    color: "#374151",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#ffffff")
                  }
                >
                  Открыть акт
                </button>
                <button
                  className="px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                  style={{
                    border: "1px solid #e5e7eb",
                    background: "#ffffff",
                    color: "#374151",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#ffffff")
                  }
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Скачать PDF
                </button>
                <label
                  className="px-3 py-1.5 rounded text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors"
                  style={{
                    border: "1px solid #e5e7eb",
                    background: "#ffffff",
                    color: "#374151",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#ffffff")
                  }
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Загрузить подписанный акт
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.png"
                  />
                </label>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer action */}
        <div
          className="mt-6 pt-6 flex justify-end"
          style={{ borderTop: "1px solid #e5e7eb" }}
        >
          <button
            onClick={() => setStatus("Завершена")}
            className="px-6 py-2.5 rounded text-sm font-medium text-white transition-colors"
            style={{ background: "#166534" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#14532d")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#166534")}
          >
            Завершить заявку
          </button>
        </div>
      </div>

      {showActModal && <ActModal onClose={() => setShowActModal(false)} />}
    </>
  );
}
