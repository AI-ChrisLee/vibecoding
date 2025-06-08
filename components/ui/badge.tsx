import { cn } from "@/lib/utils"

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full border border-black text-black bg-transparent text-sm font-medium",
        className
      )}
      {...props}
    />
  );
}
