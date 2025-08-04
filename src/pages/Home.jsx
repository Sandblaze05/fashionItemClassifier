import React from "react";
import { motion } from "motion/react";
import { Badge, Star, Circle, Diamond, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const spaceElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 16 + 8,
    opacity: Math.random() * 0.7 + 0.3,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    icon: [Badge, Star, Circle, Diamond, Sparkles][
      Math.floor(Math.random() * 5)
    ],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-b from-gray-800 to-slate-800 min-h-screen relative">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {/* Animated space elements */}
          {spaceElements.map((element) => {
            const IconComponent = element.icon;
            return (
              <motion.div
                key={element.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: element.opacity,
                  scale: 1,
                  rotate: 360,
                }}
                transition={{
                  delay: element.delay,
                  duration: element.duration,
                  rotate: {
                    repeat: Infinity,
                    duration: element.duration * 2,
                    ease: "linear",
                  },
                }}
                className="absolute pointer-events-none"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                }}
              >
                <IconComponent className="text-white/40" size={element.size} />
              </motion.div>
            );
          })}

          {/* Twinkling effect overlay */}
          {Array.from({ length: 50 }, (_, i) => (
            <motion.div
              key={`twinkle-${i}`}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 3 + 1,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 flex flex-col">
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

          <main className="flex flex-col justify-center items-center px-4 min-h-screen">
            <section>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { staggerChildren: 0.4 },
                  animationDelay: 0.5,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                  className="text-7xl text-white w-full px-3 font-bold mb-4 text-center"
                >
                  Fashion Item Classifier
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeInOut" },
                  }}
                  className="text-white/90 px-3 text-center max-w-2xl"
                >
                  Discover the cosmos of fashion with our AI-powered classifier.
                  Upload your fashion items and let our intelligent system
                  identify and categorize them with stellar precision.
                </motion.div>
              </motion.div>
            </section>
          </main>

          {/* Partially visible rounded section */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-t-3xl mx-4 mb-0 min-h-screen relative"
            style={{ marginTop: "-20vh" }} // Overlap with viewport to show partially
          >
            <div className="p-8 pt-12">
              {/* Visual indicator that content continues */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex justify-center mb-6"
              >
                <div className="w-12 h-1 bg-white/40 rounded-full"></div>
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-6 text-center">
                How It Works
              </h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="bg-violet-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Badge className="text-violet-300" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Upload
                  </h3>
                  <p className="text-white/70">
                    Simply drag and drop or select your fashion item image to
                    begin the classification process.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="bg-violet-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="text-violet-300" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Analyze
                  </h3>
                  <p className="text-white/70">
                    Our advanced AI algorithms analyze your image using
                    cutting-edge computer vision technology.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-center"
                >
                  <div className="bg-violet-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="text-violet-300" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Discover
                  </h3>
                  <p className="text-white/70">
                    Receive detailed classification results with confidence scores
                    and item categories.
                  </p>
                </motion.div>
              </div>

              <div className="mt-16 text-center">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/classify")}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
                >
                  Start Classifying
                </motion.button>
              </div>

              {/* Additional content to make scrolling necessary */}
              <div className="mt-20 space-y-12">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h3 className="text-3xl font-bold text-white mb-6">Features</h3>
                  <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    <div className="relative rounded-xl p-6 bg-white/5 overflow-hidden">
                      <div className="absolute inset-0 animate-spin-slow bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full scale-150 blur-2xl opacity-30 z-0" />
                      <div className="relative z-10">
                        <h4 className="text-xl font-semibold text-white mb-3">
                          Accurate Classification
                        </h4>
                        <p className="text-white/70">
                          Advanced machine learning models trained on millions of
                          fashion items for precise categorization.
                        </p>
                      </div>
                    </div>

                    {/* {<div className="bg-white/5 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        Real-time Processing
                      </h4>
                      <p className="text-white/70">
                        Lightning-fast analysis that provides results in seconds,
                        not minutes.
                      </p>
                    </div>} */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        Multiple Categories
                      </h4>
                      <p className="text-white/70">
                        Supports classification of clothing, accessories, shoes,
                        and more fashion categories.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h4 className="text-xl font-semibold text-white mb-3">
                        Confidence Scores
                      </h4>
                      <p className="text-white/70">
                        Detailed confidence metrics help you understand the
                        reliability of each classification.
                      </p>
                    </div>
                    <div className="relative rounded-xl p-6 bg-white/5 overflow-hidden">
                      <div className="absolute inset-0 animate-spin-slow bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full scale-150 blur-2xl opacity-30 z-0" />
                      <div className="relative z-10">
                        <h4 className="text-xl font-semibold text-white mb-3">
                          Real-time Processing
                        </h4>
                        <p className="text-white/70">
                          Lightning-fast analysis that provides results in
                          seconds, not minutes.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <footer className="w-full bg-white/10 backdrop-blur-lg border-t border-white/20 p-4 flex justify-center items-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white/60 text-sm"
            >
              Powered by AI • Inspired by the Universe
            </motion.div>
          </footer>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
