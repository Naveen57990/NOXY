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
        "noxy-card text-left w-full transition-all duration-500 hover:scale-105 group relative overflow-hidden",
        gradient,
        className
      )}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl animate-bounceGentle group-hover:animate-wiggle">{emoji}</span>
          <h3 className="text-xl font-semibold text-card-foreground">{title}</h3>
        </div>
        {children && (
          <div className="text-muted-foreground text-sm">
            {children}
          </div>
        )}
      </div>
      
      {/* Premium shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </button>
  );
};