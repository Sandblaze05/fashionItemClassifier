import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Classify = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-b from-gray-800 to-slate-800 min-h-screen relative">
        <div className="relative flex flex-col">
          <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="sticky top-0 w-full bg-white/5 backdrop-blur-lg border-b border-white/20 p-4 flex justify-between items-center transition-colors z-20"
          >
            <h1
              className="font-mono text-3xl text-violet-100 cursor-pointer"
              onClick={() => navigate("/")}
            >
              F.i.C.
            </h1>
          </motion.header>
        </div>
      </div>
    </motion.div>
  );
};

export default Classify;
