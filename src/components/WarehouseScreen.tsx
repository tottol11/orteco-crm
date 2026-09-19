import { useState } from "react";

const INVENTORY = [
  {
    name: "Насос A12",
    sku: "PUMP-A12",
    category: "Запчасти",
    qty: 14,
    low: false,
  },
  {
    name: "Фильтр B20",
    sku: "FIL-B20",
    category: "Расходники",
    qty: 32,
    low: false,
  },
  {
    name: "Датчик C10",
    sku: "SEN-C10",
    category: "Запчасти",
    qty: 4,
    low: true,
  },
  {
    name: "Прокладка B14",
    sku: "GAS-B14",
    category: "Расходники",
    qty: 21,
    low: false,
  },
];

const OPERATIONS = [
  {
    date: "18.09.2026",
    type: "Списание",
    item: "Насос A12",
    qty: "1 шт.",
    ref: "Заявка #154",
    person: "Болат",
  },
  {
    date: "18.09.2026",
    type: "Списание",
    item: "Прокладка B14",
    qty: "2 шт.",
    ref: "Заявка #154",
    person: "Болат",
  },
  {
    date: "17.09.2026",
    type: "Приход",
    item: "Фильтр B20",
    qty: "10 шт.",
    ref: "—",
    person: "Султан",
  },
];

export default function WarehouseScreen() {
  const [search, setSearch] = useState("");

  const filtered = INVENTORY.filter(
    (item) =>
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-8" style={{ maxWidth: 960 }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: "#111827" }}>
          Склад
        </h1>
        <button
          className="px-4 py-2 rounded text-sm font-medium text-white transition-colors"
          style={{ background: "#3b6fd4" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#2f5ab8")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#3b6fd4")}
        >
          + Приход
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5" style={{ width: 280 }}>
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
          placeholder="Поиск по наименованию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 text-sm rounded border outline-none"
          style={{
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            color: "#111827",
          }}
          onFocus={(ev) => (ev.currentTarget.style.borderColor = "#3b6fd4")}
          onBlur={(ev) => (ev.currentTarget.style.borderColor = "#e5e7eb")}
        />
      </div>

      {/* Inventory table */}
      <div
        className="rounded-lg overflow-hidden mb-6"
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
              <th
                className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#6b7280", letterSpacing: "0.06em" }}
              >
                Наименование
              </th>
              <th
                className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#6b7280", letterSpacing: "0.06em" }}
              >
                Артикул
              </th>
              <th
                className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#6b7280", letterSpacing: "0.06em" }}
              >
                Категория
              </th>
              <th
                className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                style={{ color: "#6b7280", letterSpacing: "0.06em" }}
              >
                Остаток
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <tr
                key={item.sku}
                className="transition-colors"
                style={{
                  borderBottom:
                    i < filtered.length - 1 ? "1px solid #f3f4f6" : "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fafafa")
                }
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ color: "#111827" }}>
                      {item.name}
                    </span>
                    {item.low && (
                      <span
                        className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded"
                        style={{ background: "#fff7ed", color: "#c2410c" }}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          <line x1="12" y1="9" x2="12" y2="13" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        Низкий остаток
                      </span>
                    )}
                  </div>
                </td>
                <td
                  className="px-5 py-4 font-mono text-xs"
                  style={{ color: "#6b7280" }}
                >
                  {item.sku}
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ background: "#f3f4f6", color: "#6b7280" }}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <span
                    className="font-semibold tabular-nums"
                    style={{ color: item.low ? "#c2410c" : "#111827" }}
                  >
                    {item.qty} шт.
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent operations */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "#374151" }}>
          Последние операции
        </h2>
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
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                >
                  Дата
                </th>
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                >
                  Операция
                </th>
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                >
                  Наименование
                </th>
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                >
                  Кол-во
                </th>
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                >
                  Источник
                </th>
                <th
                  className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "#6b7280", letterSpacing: "0.06em" }}
                >
                  Сотрудник
                </th>
              </tr>
            </thead>
            <tbody>
              {OPERATIONS.map((op, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i < OPERATIONS.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                >
                  <td
                    className="px-5 py-3 tabular-nums text-xs"
                    style={{ color: "#6b7280" }}
                  >
                    {op.date}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className="text-xs px-2 py-0.5 rounded font-medium"
                      style={
                        op.type === "Списание"
                          ? { background: "#fef2f2", color: "#991b1b" }
                          : { background: "#f0fdf4", color: "#166534" }
                      }
                    >
                      {op.type}
                    </span>
                  </td>
                  <td
                    className="px-5 py-3 text-sm font-medium"
                    style={{ color: "#111827" }}
                  >
                    {op.item}
                  </td>
                  <td
                    className="px-5 py-3 tabular-nums text-sm"
                    style={{ color: "#374151" }}
                  >
                    {op.qty}
                  </td>
                  <td
                    className="px-5 py-3 text-sm"
                    style={{ color: "#3b6fd4" }}
                  >
                    {op.ref}
                  </td>
                  <td
                    className="px-5 py-3 text-sm"
                    style={{ color: "#6b7280" }}
                  >
                    {op.person}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
