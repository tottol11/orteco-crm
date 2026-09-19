interface Props {
  onClose: () => void;
}

export default function ActModal({ onClose }: Props) {
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
          maxWidth: 560,
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
          <div>
            <h2
              className="text-base font-semibold"
              style={{ color: "#111827" }}
            >
              Акт № ACT-2026-0154
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
              Акт выполненных работ
            </p>
          </div>
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
        <div className="px-6 py-5">
          {/* Fields */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-5">
            {[
              { label: "Клиент", value: "Coffee Boom" },
              { label: "Заявка", value: "#154" },
              { label: "Оборудование", value: "La Marzocco Linea PB" },
              { label: "Дата выполнения", value: "19.09.2026" },
              { label: "Ответственный мастер", value: "Болат" },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs" style={{ color: "#9ca3af" }}>
                  {label}
                </span>
                <span
                  className="text-sm font-medium"
                  style={{ color: "#111827" }}
                >
                  {value}
                </span>
              </div>
            ))}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs" style={{ color: "#9ca3af" }}>
                Статус акта
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium w-fit px-2 py-0.5 rounded"
                style={{ background: "#eff6ff", color: "#1d4ed8" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "#3b82f6" }}
                />
                Сформирован
              </span>
            </div>
          </div>

          {/* Выполненные работы */}
          <div
            className="mb-4 p-4 rounded-lg"
            style={{ background: "#f9fafb", border: "1px solid #f3f4f6" }}
          >
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "#6b7280" }}
            >
              Выполненные работы
            </p>
            <p className="text-sm" style={{ color: "#111827" }}>
              Диагностика и замена насоса. Проверка давления в группе. Тестовый
              запуск после замены.
            </p>
          </div>

          {/* Запчасти */}
          <div>
            <p
              className="text-xs font-medium mb-2"
              style={{ color: "#6b7280" }}
            >
              Использованные запчасти
            </p>
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: "1px solid #f3f4f6" }}
            >
              {[
                { name: "Насос A12", qty: "1 шт." },
                { name: "Прокладка B14", qty: "2 шт." },
              ].map((part, i, arr) => (
                <div
                  key={part.name}
                  className="flex items-center justify-between px-4 py-2.5 text-sm"
                  style={{
                    borderBottom:
                      i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                    background: "#ffffff",
                  }}
                >
                  <span style={{ color: "#374151" }}>{part.name}</span>
                  <span
                    className="tabular-nums px-2 py-0.5 rounded text-xs"
                    style={{ background: "#f3f4f6", color: "#6b7280" }}
                  >
                    {part.qty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: "1px solid #f3f4f6" }}
        >
          <label
            className="flex items-center gap-2 text-sm cursor-pointer transition-colors"
            style={{ color: "#6b7280" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#3b6fd4")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
          >
            <svg
              width="14"
              height="14"
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
            <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded text-sm transition-colors"
              style={{
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                color: "#6b7280",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#ffffff")
              }
            >
              Закрыть
            </button>
            <button
              className="px-4 py-2 rounded text-sm font-medium text-white transition-colors flex items-center gap-1.5"
              style={{ background: "#3b6fd4" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2f5ab8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#3b6fd4")
              }
            >
              <svg
                width="13"
                height="13"
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
          </div>
        </div>
      </div>
    </div>
  );
}
