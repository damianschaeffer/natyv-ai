import { motion } from "framer-motion";

const ProtocolStatus = () => {
  return (
    <motion.div 
      className="flex items-center gap-2 text-xs font-body tracking-wider"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute h-2 w-2 rounded-full bg-protocol-active pulse-green" />
        <span className="h-2 w-2 rounded-full bg-protocol-active" />
      </div>
      <span className="text-muted-foreground uppercase">
        Natyv Protocol: <span className="text-protocol-active">Active</span>
      </span>
    </motion.div>
  );
};

export default ProtocolStatus;