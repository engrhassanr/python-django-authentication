// components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  const navItems = [
    { icon: "Dashboard", label: "Dashboard" },
    { icon: "Mail", label: "Mail", active: true },
    { icon: "Cases", label: "Cases" },
    { icon: "Settings", label: "Settings" },
    { icon: "logout", label: "Logout" },
  ];

  return (
    <div className="w-56 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="text-2xl font-bold">st</div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item, index) => (
          <div className="flex items-center gap-4">
            <a
              key={index}
              href="#"
              className={`flex items-center px-3 py-3 ${
                item.active
                  ? "bg-black text-white rounded-[8.75px]"
                  : "text-black hover:bg-white rounded-[8.75px]"
              }`}
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {renderIcon(item.icon, item.active)}
              </span>
            </a>
            <span className="font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

function renderIcon(iconName, active) {
  const color = active ? "white" : "currentColor";

  switch (iconName) {
    case "Dashboard":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke={color}
        >
          <path
            d="M7.51797 2.36713L3.0263 5.86713C2.2763 6.45046 1.66797 7.69212 1.66797 8.63379V14.8088C1.66797 16.7421 3.24297 18.3255 5.1763 18.3255H14.8263C16.7596 18.3255 18.3346 16.7421 18.3346 14.8171V8.75046C18.3346 7.74212 17.6596 6.45046 16.8346 5.87546L11.6846 2.26713C10.518 1.45046 8.64296 1.49213 7.51797 2.36713Z"
            stroke="black"
            strokeWidth={2}
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    case "Mail":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.168 17.7077H5.83464C2.79297 17.7077 1.04297 15.9577 1.04297 12.916V7.08268C1.04297 4.04102 2.79297 2.29102 5.83464 2.29102H11.668C12.0096 2.29102 12.293 2.57435 12.293 2.91602C12.293 3.25768 12.0096 3.54102 11.668 3.54102H5.83464C3.4513 3.54102 2.29297 4.69935 2.29297 7.08268V12.916C2.29297 15.2993 3.4513 16.4577 5.83464 16.4577H14.168C16.5513 16.4577 17.7096 15.2993 17.7096 12.916V8.74935C17.7096 8.40768 17.993 8.12435 18.3346 8.12435C18.6763 8.12435 18.9596 8.40768 18.9596 8.74935V12.916C18.9596 15.9577 17.2096 17.7077 14.168 17.7077Z"
            fill={color}
          />
          <path
            d="M9.99705 10.7253C9.29705 10.7253 8.58872 10.5086 8.04705 10.067L5.43871 7.98364C5.17205 7.76697 5.12205 7.3753 5.33872 7.10864C5.55538 6.84197 5.94704 6.79197 6.21371 7.00864L8.82204 9.09197C9.45538 9.60031 10.5304 9.60031 11.1637 9.09197L12.147 8.30864C12.4137 8.09197 12.8137 8.13363 13.0221 8.40863C13.2387 8.6753 13.1971 9.0753 12.9221 9.28364L11.9387 10.067C11.4054 10.5086 10.697 10.7253 9.99705 10.7253Z"
            fill={color}
          />
          <path
            d="M16.2513 7.29167C14.7596 7.29167 13.543 6.075 13.543 4.58333C13.543 3.09167 14.7596 1.875 16.2513 1.875C17.743 1.875 18.9596 3.09167 18.9596 4.58333C18.9596 6.075 17.743 7.29167 16.2513 7.29167ZM16.2513 3.125C15.4513 3.125 14.793 3.78333 14.793 4.58333C14.793 5.38333 15.4513 6.04167 16.2513 6.04167C17.0513 6.04167 17.7096 5.38333 17.7096 4.58333C17.7096 3.78333 17.0513 3.125 16.2513 3.125Z"
            fill={color}
          />
        </svg>
      );
    case "Cases":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0583 11.916L17.725 16.0827C17.6 17.3577 17.5 18.3327 15.2416 18.3327H4.7583C2.49997 18.3327 2.39997 17.3577 2.27497 16.0827L1.94163 11.916C1.87497 11.2243 2.09163 10.5827 2.4833 10.091C2.49163 10.0827 2.49163 10.0827 2.49997 10.0743C2.9583 9.51602 3.64997 9.16602 4.42497 9.16602H15.575C16.35 9.16602 17.0333 9.51602 17.4833 10.0577C17.4916 10.066 17.5 10.0743 17.5 10.0827C17.9083 10.5743 18.1333 11.216 18.0583 11.916Z"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit="10"
          />
          <path
            d="M2.91797 9.52474V5.23307C2.91797 2.39974 3.6263 1.69141 6.45964 1.69141H7.51797C8.5763 1.69141 8.81797 2.00807 9.21797 2.54141L10.2763 3.95807C10.543 4.30807 10.7013 4.52474 11.4096 4.52474H13.5346C16.368 4.52474 17.0763 5.23307 17.0763 8.06641V9.55807"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.85938 14.166H12.1427"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "Settings":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1.66797 10.7319V9.26523C1.66797 8.39856 2.3763 7.6819 3.2513 7.6819C4.75964 7.6819 5.3763 6.61523 4.61797 5.3069C4.18464 4.5569 4.44297 3.5819 5.2013 3.14856L6.64297 2.32356C7.3013 1.9319 8.1513 2.16523 8.54297 2.82356L8.63463 2.9819C9.38463 4.29023 10.618 4.29023 11.3763 2.9819L11.468 2.82356C11.8596 2.16523 12.7096 1.9319 13.368 2.32356L14.8096 3.14856C15.568 3.5819 15.8263 4.5569 15.393 5.3069C14.6346 6.61523 15.2513 7.6819 16.7596 7.6819C17.6263 7.6819 18.343 8.39023 18.343 9.26523V10.7319C18.343 11.5986 17.6346 12.3152 16.7596 12.3152C15.2513 12.3152 14.6346 13.3819 15.393 14.6902C15.8263 15.4486 15.568 16.4152 14.8096 16.8486L13.368 17.6736C12.7096 18.0652 11.8596 17.8319 11.468 17.1736L11.3763 17.0152C10.6263 15.7069 9.39297 15.7069 8.63463 17.0152L8.54297 17.1736C8.1513 17.8319 7.3013 18.0652 6.64297 17.6736L5.2013 16.8486C4.44297 16.4152 4.18464 15.4402 4.61797 14.6902C5.3763 13.3819 4.75964 12.3152 3.2513 12.3152C2.3763 12.3152 1.66797 11.5986 1.66797 10.7319Z"
            stroke={color}
            strokeWidth={2}
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.78906 5.82651C7.01049 3.25508 8.33192 2.20508 11.2248 2.20508H11.3176C14.5105 2.20508 15.7891 3.48365 15.7891 6.67651V11.3337C15.7891 14.5265 14.5105 15.8051 11.3176 15.8051H11.2248C8.35335 15.8051 7.03192 14.7694 6.79621 12.2408"
            stroke="#EB0000"
            stroke-width="1.07143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11.1442 8.99805H3.01562"
            stroke="#EB0000"
            stroke-width="1.07143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.61161 6.60547L2.21875 8.99833L4.61161 11.3912"
            stroke="#EB0000"
            stroke-width="1.07143"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default Sidebar;
