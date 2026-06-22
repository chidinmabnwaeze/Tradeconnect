const palette = [
  "bg-[#4A7C2A]",
  "bg-[#95321C]",
  "bg-[#C4773B]",
  "bg-[#2E6F95]",
  "bg-[#7A4FA3]",
  "bg-[#B23B6B]",
];

function colorFor(name: string) {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palette[hash % palette.length];
}

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md";
}

export default function Avatar({ name, size = "sm" }: AvatarProps) {
  const dimension = size === "sm" ? "h-9 w-9 text-xs" : "h-12 w-12 text-sm";
  return (
    <div
      className={`flex ${dimension} shrink-0 items-center justify-center rounded-full font-semibold text-white ${colorFor(
        name
      )}`}
    >
      {initialsFor(name)}
    </div>
  );
}
