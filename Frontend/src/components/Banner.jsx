import React from "react";
import dashboardImage from "../assets/dashboard.png";
import { motion } from "framer-motion";

function Banner() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white font-sans">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="container mx-auto px-6 py-20 md:py-32"
      >
        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="w-full p-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <img
                  src={dashboardImage}
                  alt="LinkShield Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default Banner;
