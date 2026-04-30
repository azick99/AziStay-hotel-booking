import { Plane } from "lucide-react";
import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      >
        <Plane className="w-8 h-8 text-brand-500" />
      </motion.div>
    </div>
  );
}
