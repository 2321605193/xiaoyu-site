type Status = "online" | "idle" | "offline";

const statusColors: Record<Status, string> = {
  online: "bg-status-online",
  idle: "bg-status-idle",
  offline: "bg-status-offline",
};

const statusLabels: Record<Status, string> = {
  online: "在线",
  idle: "空闲",
  offline: "离线",
};

export function StatusDot({
  status,
  showLabel = false,
  size = "sm",
}: {
  status: Status;
  showLabel?: boolean;
  size?: "sm" | "md";
}) {
  const dotSize = size === "sm" ? "h-2 w-2" : "h-3 w-3";
  const pulseSize = size === "sm" ? "h-2 w-2" : "h-3 w-3";

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex">
        {status === "online" && (
          <span
            className={`absolute inline-flex ${pulseSize} animate-ping rounded-full bg-status-online opacity-40`}
          />
        )}
        <span
          className={`relative inline-flex ${dotSize} rounded-full ${statusColors[status]}`}
        />
      </span>
      {showLabel && (
        <span className="text-xs text-text-secondary">
          {statusLabels[status]}
        </span>
      )}
    </span>
  );
}
