import React from "react";

export default function JoinCloneAccessBtn({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg text-lg shadow transition ${className}`}
      {...props}
    >
      Join the clone access
    </button>
  );
} 