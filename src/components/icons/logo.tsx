import { Activity, Mountain } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 text-primary">
      <Mountain className="h-6 w-6" />
      <Activity className="h-7 w-7" />
    </div>
  );
}
