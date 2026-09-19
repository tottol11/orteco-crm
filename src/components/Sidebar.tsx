import type { Screen } from "../App";

interface Props {
  screen: Screen;
  setScreen: (s: Screen) => void;
}

const NAV = [
  { id: "requests" as Screen, label: "Заявки", icon: ClipboardIcon },
  { id: "warehouse" as Screen, label: "Склад", icon: BoxIcon },
  { id: "acts" as Screen, label: "Акты", icon: FileIcon },
  { id: "clients" as Screen, label: "Клиенты", icon: UsersIcon },
];

function ClipboardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="12" y2="17" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function Sidebar({ screen, setScreen }: Props) {
  const activeScreen = screen === "request-detail" ? "requests" : screen;

  return (
    <aside
      className="flex flex-col h-screen shrink-0"
      style={{
        width: 220,
        background: "#111827",
        borderRight: "1px solid #1f2937",
      }}
    >
      {/* Logo */}
      <div className="px-6 py-5" style={{ borderBottom: "1px solid #1f2937" }}>
        <span
          className="text-white font-semibold tracking-widest text-sm uppercase"
          style={{ letterSpacing: "0.15em" }}
        >
          ОРТЕКО
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 flex flex-col gap-0.5">
        {NAV.map(({ id, label, icon: Icon }) => {
          const isActive = activeScreen === id;
          const isDisabled = id === "acts" || id === "clients";
          return (
            <button
              key={id}
              onClick={() => !isDisabled && setScreen(id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors w-full text-left"
              style={{
                background: isActive ? "#1f2937" : "transparent",
                color: isActive
                  ? "#ffffff"
                  : isDisabled
                    ? "#4b5563"
                    : "#9ca3af",
                cursor: isDisabled ? "default" : "pointer",
              }}
            >
              <Icon />
              <span>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid #1f2937" }}>
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-colors w-full text-left"
          style={{ color: "#9ca3af" }}
        >
          <UserIcon />
          <div>
            <div className="text-xs font-medium" style={{ color: "#d1d5db" }}>
              Болат
            </div>
            <div className="text-xs" style={{ color: "#6b7280" }}>
              Профиль
            </div>
          </div>
        </button>
      </div>
    </aside>
  );
}
