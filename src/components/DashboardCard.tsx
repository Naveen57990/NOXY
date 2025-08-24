import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  emoji: string;
  gradient: string;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

export const DashboardCard = ({ 
  title, 
  emoji, 
  gradient, 
  onClick, 
  className,
  children 
}: DashboardCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "noxy-card text-left w-full transition-all duration-300 hover:scale-105 group",
        gradient,
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{emoji}</span>
        <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
      </div>
      {children && (
        <div className="text-muted-foreground text-sm">
          {children}
        </div>
      )}
    </button>
  );
};