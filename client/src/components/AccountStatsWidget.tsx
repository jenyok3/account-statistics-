import { motion } from "framer-motion";
import { Activity, UserCheck, AppWindow, Ban, Loader2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useStats } from "@/hooks/use-stats";
import { cn } from "@/lib/utils";

interface AccountStatsWidgetProps {
  className?: string;
}

export function AccountStatsWidget({ className }: AccountStatsWidgetProps) {
  const { data: stats, isLoading, isError } = useStats();

  if (isLoading) {
    return (
      <div className={cn("bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 h-56 flex items-center justify-center relative overflow-hidden max-w-md w-full", className)}>
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className={cn("bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-4 h-56 flex flex-col items-center justify-center relative overflow-hidden max-w-md w-full", className)}>
        <Ban className="w-8 h-8 text-muted-foreground mb-2" />
        <p className="text-muted-foreground font-medium">Unable to load stats</p>
      </div>
    );
  }

  const chartData = [
    { name: "Активні", value: stats.active, color: "#22c55e" },
    { name: "Заблоковані", value: stats.blocked, color: "#64748b" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className={cn("bg-transparent border border-white/5 rounded-2xl p-5 h-64 flex flex-col relative overflow-hidden max-w-lg w-full", className)}
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-[#9d00ff] w-6 h-6 shrink-0" />
        <h3 className="text-2xl font-display font-bold text-white tracking-wide">Статистика акаунтів</h3>
      </div>
      
      <div className="flex-1 flex">
        {/* Left side - Chart with center number */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full h-48 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-bold font-mono text-white leading-none tracking-tighter">
                {stats.total}
              </span>
              <span className="text-[12px] text-muted-foreground uppercase tracking-widest mt-1">Total</span>
            </div>
          </div>
        </div>
        
        {/* Right side - 3 vertical cards */}
        <div className="flex flex-col gap-2 justify-center items-center flex-1 min-w-[160px]">
          {/* Total Accounts */}
          <div className="flex items-center gap-4 py-2 px-5 transition-colors cursor-default group w-full justify-center">
            <UserCheck className="text-gray-400 w-5 h-5 group-hover:text-gray-200 transition-colors" />
            <span className="text-xl font-bold font-mono text-gray-200">{stats.total}</span>
          </div>
          
          {/* Active Accounts */}
          <div className="flex items-center gap-4 py-2 px-5 transition-colors cursor-default group w-full justify-center">
            <AppWindow className="text-green-500 w-5 h-5 group-hover:text-green-400 transition-colors" />
            <span className="text-xl font-bold font-mono text-green-500">{stats.active}</span>
          </div>
          
          {/* Blocked Accounts */}
          <div className="flex items-center gap-4 py-2 px-5 transition-colors cursor-default group w-full justify-center">
            <Ban className="text-red-500 w-5 h-5 group-hover:text-red-400 transition-colors" />
            <span className="text-xl font-bold font-mono text-red-500">{stats.blocked}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
