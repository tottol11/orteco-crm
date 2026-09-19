import { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
  onSubmit: (data: {
    client: string;
    equipment: string;
    description: string;
    responsible: string;
    priority: string;
  }) => void;
}

const CLIENT_EQUIPMENT: Record<string, string[]> = {
  "Coffee Boom": ["La Marzocco Linea PB"],
  Lanzhou: ["Rational SCC 61"],
  "Del Papa": ["Hoshizaki IM-65NE"],
  "Coffee Original": ["Nuova Simonelli Appia"],
};

const MASTERS = ["Болат", "Султан", "Данияр"];
const PRIORITIES = ["Низкий", "Обычный", "Высокий", "Срочный"];

export default function NewRequestModal({ onClose, onSubmit }: Props) {
  const [client, setClient] = useState("");
  const [equipment, setEquipment] = useState("");
  const [description, setDescription] = useState("");
  const [responsible, setResponsible] = useState("");
  const [priority, setPriority] = useState("Обычный");

  useEffect(() => {
    if (client) setEquipment(CLIENT_EQUIPMENT[client]?.[0] ?? "");
    else setEquipment("");
  }, [client]);

  function handleSubmit() {
    if (!client || !equipment || !responsible) return;
    onSubmit({ client, equipment, description, responsible, priority });
  }

  const isValid = client && equipment && responsible;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(17, 24, 39, 0.4)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="rounded-lg w-full"
        style={{
          maxWidth: 520,
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #f3f4f6" }}
        >
          <h2 className="text-base font-semibold" style={{ color: "#111827" }}>
            Новая заявка
          </h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded transition-colors"
            style={{ color: "#9ca3af" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Клиент */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: "#374151" }}>
              Клиент
            </label>
            <select
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded border outline-none appearance-none"
              style={{
                border: "1px solid #e5e7eb",
                color: client ? "#111827" : "#9ca3af",
                background: "#ffffff",
              }}
              onFocus={(ev) => (ev.currentTarget.style.borderColor = "#3b6fd4")}
              onBlur={(ev) => (ev.currentTarget.style.borderColor = "#e5e7eb")}
            >
              <option value="" disabled>
                Выберите клиента
              </option>
              {Object.keys(CLIENT_EQUIPMENT).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Оборудование */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: "#374151" }}>
              Оборудование
            </label>
            <select
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
              disabled={!client}
              className="w-full px-3 py-2 text-sm rounded border outline-none appearance-none"
              style={{
                border: "1px solid #e5e7eb",
                color: equipment ? "#111827" : "#9ca3af",
                background: client ? "#ffffff" : "#f9fafb",
                cursor: client ? "pointer" : "not-allowed",
              }}
              onFocus={(ev) => (ev.currentTarget.style.borderColor = "#3b6fd4")}
              onBlur={(ev) => (ev.currentTarget.style.borderColor = "#e5e7eb")}
            >
              <option value="" disabled>
                Выберите оборудование
              </option>
              {(CLIENT_EQUIPMENT[client] ?? []).map((eq) => (
                <option key={eq} value={eq}>
                  {eq}
                </option>
              ))}
            </select>
          </div>

          {/* Описание */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium" style={{ color: "#374151" }}>
              Описание проблемы
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Кофемашина не нагревает воду"
              className="w-full px-3 py-2 text-sm rounded border outline-none resize-none"
              style={{
                border: "1px solid #e5e7eb",
                color: "#111827",
                background: "#ffffff",
              }}
              onFocus={(ev) => (ev.currentTarget.style.borderColor = "#3b6fd4")}
              onBlur={(ev) => (ev.currentTarget.style.borderColor = "#e5e7eb")}
            />
          </div>

          {/* Ответственный + Приоритет */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#374151" }}
              >
                Ответственный мастер
              </label>
              <select
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border outline-none appearance-none"
                style={{
                  border: "1px solid #e5e7eb",
                  color: responsible ? "#111827" : "#9ca3af",
                  background: "#ffffff",
                }}
                onFocus={(ev) =>
                  (ev.currentTarget.style.borderColor = "#3b6fd4")
                }
                onBlur={(ev) =>
                  (ev.currentTarget.style.borderColor = "#e5e7eb")
                }
              >
                <option value="" disabled>
                  Выберите мастера
                </option>
                {MASTERS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium"
                style={{ color: "#374151" }}
              >
                Приоритет
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded border outline-none appearance-none"
                style={{
                  border: "1px solid #e5e7eb",
                  color: "#111827",
                  background: "#ffffff",
                }}
                onFocus={(ev) =>
                  (ev.currentTarget.style.borderColor = "#3b6fd4")
                }
                onBlur={(ev) =>
                  (ev.currentTarget.style.borderColor = "#e5e7eb")
                }
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-2 px-6 py-4"
          style={{ borderTop: "1px solid #f3f4f6" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm transition-colors"
            style={{
              border: "1px solid #e5e7eb",
              background: "#ffffff",
              color: "#6b7280",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#ffffff")}
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-4 py-2 rounded text-sm font-medium text-white transition-colors"
            style={{
              background: isValid ? "#3b6fd4" : "#d1d5db",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => {
              if (isValid) e.currentTarget.style.background = "#2f5ab8";
            }}
            onMouseLeave={(e) => {
              if (isValid) e.currentTarget.style.background = "#3b6fd4";
            }}
          >
            Создать заявку
          </button>
        </div>
      </div>
    </div>
  );
}
