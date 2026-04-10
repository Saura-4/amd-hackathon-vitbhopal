"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Search,
  Plus,
  X,
  Utensils,
  ScanLine,
  ChevronDown,
} from "lucide-react";

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

const quickAdd = [
  { name: "Banana", emoji: "🍌", calories: 105 },
  { name: "Coffee (black)", emoji: "☕", calories: 5 },
  { name: "Egg (boiled)", emoji: "🥚", calories: 78 },
  { name: "Chicken Breast", emoji: "🍗", calories: 165 },
  { name: "Rice (1 cup)", emoji: "🍚", calories: 206 },
  { name: "Apple", emoji: "🍎", calories: 95 },
];

export default function MealLogger({ recentMeals, onAddMeal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showPhotoUI, setShowPhotoUI] = useState(false);
  const [selectedType, setSelectedType] = useState("Lunch");
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedToast, setLoggedToast] = useState(null);

  const handleQuickAdd = (food) => {
    if (onAddMeal) onAddMeal(food);
    setLoggedToast(food.name);
    setTimeout(() => setLoggedToast(null), 2500);
  };

  return (
    <section className="w-full">
      {/* Section header with log button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-citrus-100 flex items-center justify-center">
            <Utensils className="w-4 h-4 text-citrus-600" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Meal Log</h2>
        </div>
        <motion.button
          animate={!isOpen ? { scale: [1, 1.03, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-sage-500 text-white text-sm font-medium shadow-lg shadow-sage-500/20 hover:bg-sage-600 transition-colors"
        >
          {isOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          {isOpen ? "Close" : "Log Meal"}
        </motion.button>
      </div>

      {/* Expandable logger */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="glass rounded-3xl p-5 mb-4">
              {/* Meal type selector */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {mealTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedType === type
                        ? "bg-sage-500 text-white shadow-md"
                        : "bg-sage-50 text-sage-700 hover:bg-sage-100"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-border text-sm focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all"
                />
              </div>

              {/* Quick add */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                  Quick Add
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {quickAdd
                    .filter((f) =>
                      f.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((food) => (
                      <motion.button
                        key={food.name}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleQuickAdd(food)}
                        className="flex items-center gap-2 p-3 rounded-xl bg-white border border-border/50 hover:border-sage-300 hover:shadow-sm transition-all text-left"
                      >
                        <span className="text-xl">{food.emoji}</span>
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            {food.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {food.calories} kcal
                          </p>
                        </div>
                      </motion.button>
                    ))}
                </div>
              </div>

              {/* AI Photo Logger - stubbed */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setShowPhotoUI(!showPhotoUI)}
                className="w-full p-4 rounded-2xl border-2 border-dashed border-citrus-300 bg-citrus-50/50 flex items-center justify-center gap-3 hover:border-citrus-400 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-citrus-100 flex items-center justify-center group-hover:bg-citrus-200 transition-colors">
                  <Camera className="w-5 h-5 text-citrus-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-citrus-700">
                    AI Photo Logging
                  </p>
                  <p className="text-xs text-citrus-500">
                    Snap a photo of your meal to auto-log
                  </p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-citrus-500 ml-auto transition-transform ${
                    showPhotoUI ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              {/* Photo upload stub */}
              <AnimatePresence>
                {showPhotoUI && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-6 rounded-2xl bg-gradient-to-br from-citrus-50 to-sage-50 border border-citrus-200/50 flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-2xl bg-white/80 border border-dashed border-citrus-300 flex items-center justify-center">
                        <ScanLine className="w-8 h-8 text-citrus-400" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Drag & drop a photo or{" "}
                        <span className="text-citrus-600 font-semibold cursor-pointer hover:underline">
                          browse files
                        </span>
                      </p>
                      <p className="text-[10px] text-muted">
                        AI will analyze and auto-fill nutritional data
                      </p>
                      <div className="mt-2 w-full max-w-xs bg-white/60 rounded-xl p-3 border border-citrus-200/30">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-2 h-2 rounded-full bg-citrus-400 animate-pulse" />
                          <span>Awaiting image upload...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent meals */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Today&apos;s Meals
        </p>
        {recentMeals.map((meal, i) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-border/50 hover:shadow-sm transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center text-xl">
              {meal.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {meal.name}
              </p>
              <p className="text-[10px] text-muted-foreground">{meal.time}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold text-foreground">
                {meal.calories}
              </p>
              <p className="text-[10px] text-muted-foreground">kcal</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {loggedToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-sage-600 text-white text-sm font-medium shadow-2xl"
          >
            ✅ {loggedToast} logged successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
