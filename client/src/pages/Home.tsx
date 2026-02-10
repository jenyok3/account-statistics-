import { AccountStatsWidget } from "@/components/AccountStatsWidget";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Ambient background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full opacity-20 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground text-lg font-light tracking-wide">
            Real-time system metrics and account status
          </p>
        </motion.div>

        <AccountStatsWidget className="shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-shadow duration-500" />
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 text-xs text-white/20 font-mono"
        >
          SYSTEM_STATUS: ONLINE • v1.0.2
        </motion.footer>
      </div>
    </div>
  );
}
