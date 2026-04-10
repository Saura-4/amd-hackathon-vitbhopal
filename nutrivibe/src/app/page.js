"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  currentUser,
  todayProgress,
  weeklyData,
  getContextualInsights,
  recentMeals,
} from "@/data/mockData";
import DashboardHeader from "@/components/DashboardHeader";
import InsightsFeed from "@/components/InsightsFeed";
import MealLogger from "@/components/MealLogger";
import WeeklyChart from "@/components/WeeklyChart";
import BottomNav from "@/components/BottomNav";
import {
  Leaf,
  Settings,
  Bell,
  User,
  Award,
  Heart,
  Shield,
  LogOut,
} from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [insights, setInsights] = useState(null);
  const [meals, setMeals] = useState(recentMeals);
  const [progress, setProgress] = useState(todayProgress);
  const [weekData, setWeekData] = useState(weeklyData);
  const [toastMessage, setToastMessage] = useState(null);

  const handleActionClick = (actionName) => {
    setToastMessage(`${actionName} is disabled in demo mode.`);
    setTimeout(() => setToastMessage(null), 2500);
  };
  
  const handleAddWater = () => {
    if (progress.water.consumed < progress.water.goal) {
      setProgress(prev => ({
        ...prev,
        water: { ...prev.water, consumed: prev.water.consumed + 1 }
      }));
    }
  };

  const handleAddMeal = (food) => {
    const mealCalories = food.calories || 0;
    const mealProtein = food.protein || Math.round(mealCalories * 0.05);
    const mealCarbs = food.carbs || Math.round(mealCalories * 0.1);
    const mealFat = food.fat || Math.round(mealCalories * 0.02);

    const newMeal = {
      id: Date.now(),
      name: food.title || food.name,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      calories: mealCalories,
      protein: mealProtein, // Mock macros
      carbs: mealCarbs,
      fat: mealFat,
      emoji: food.image || food.emoji || "🍽️",
    };
    
    setMeals((prev) => [newMeal, ...prev]);
    
    setProgress((prev) => ({
      ...prev,
      calories: { ...prev.calories, consumed: prev.calories.consumed + mealCalories },
      protein: { ...prev.protein, consumed: prev.protein.consumed + mealProtein },
      carbs: { ...prev.carbs, consumed: prev.carbs.consumed + mealCarbs },
      fat: { ...prev.fat, consumed: prev.fat.consumed + mealFat },
    }));

    setWeekData((prev) => {
      const newData = [...prev];
      const lastIdx = newData.length - 1;
      newData[lastIdx] = {
        ...newData[lastIdx],
        calories: newData[lastIdx].calories + mealCalories,
        protein: newData[lastIdx].protein + mealProtein,
        carbs: newData[lastIdx].carbs + mealCarbs,
        fat: newData[lastIdx].fat + mealFat,
      };
      return newData;
    });
    
    setToastMessage(`${newMeal.name} logged successfully!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  useEffect(() => {
    const hour = new Date().getHours();
    setInsights(getContextualInsights(hour));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 glass">
        <div className="max-w-lg mx-auto flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              NutriVibe
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-xl bg-white/50 border border-border/50 flex items-center justify-center hover:bg-white transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-xl bg-sage-100 flex items-center justify-center text-sm font-bold text-sage-700">
              {currentUser.avatar}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-5 pt-4 pb-28">
        <AnimatePresence mode="wait">
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-8"
            >
              <DashboardHeader user={currentUser} progress={progress} onAddWater={handleAddWater} />
              {insights && <InsightsFeed insights={insights} onAddMeal={handleAddMeal} />}
              <MealLogger recentMeals={meals} onAddMeal={handleAddMeal} />
              <WeeklyChart weeklyData={weekData} />
            </motion.div>
          )}

          {activeTab === "insights" && (
            <motion.div
              key="insights"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1 className="text-2xl font-bold mb-6">
                Contextual Insights ✨
              </h1>
              {insights && <InsightsFeed insights={insights} onAddMeal={handleAddMeal} />}
              <div className="mt-8 glass rounded-3xl p-6">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  How it works
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: "🕐",
                      text: "Suggestions adapt to the time of day",
                    },
                    {
                      icon: "📊",
                      text: "Recommendations based on your eating history",
                    },
                    {
                      icon: "🎯",
                      text: "Fills nutritional gaps from today's intake",
                    },
                    {
                      icon: "🧠",
                      text: "Learns your preferences over time",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "log" && (
            <motion.div
              key="log"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h1 className="text-2xl font-bold mb-6">Log Meal 🍽️</h1>
              <MealLogger recentMeals={meals} onAddMeal={handleAddMeal} />
            </motion.div>
          )}

          {activeTab === "trends" && (
            <motion.div
              key="trends"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold">Analytics 📈</h1>
              <WeeklyChart weeklyData={weekData} />
              {/* Weekly summary */}
              <div className="glass rounded-3xl p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  Weekly Summary
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      label: "Avg Calories",
                      value: `${Math.round(weekData.reduce((s, d) => s + d.calories, 0) / 7)}`,
                      sub: "kcal/day",
                      color: "sage",
                    },
                    {
                      label: "Avg Protein",
                      value: `${Math.round(weekData.reduce((s, d) => s + d.protein, 0) / 7)}g`,
                      sub: "per day",
                      color: "citrus",
                    },
                    {
                      label: "Best Day",
                      value: weekData.reduce((best, d) =>
                        Math.abs(d.calories - 2200) <
                        Math.abs(best.calories - 2200)
                          ? d
                          : best
                      ).day,
                      sub: "closest to goal",
                      color: "sage",
                    },
                    {
                      label: "Streak",
                      value: `${currentUser.streak} days`,
                      sub: "keep going!",
                      color: "citrus",
                    },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i }}
                      className={`p-4 rounded-2xl border border-border/50 ${
                        stat.color === "sage" ? "bg-sage-50/50" : "bg-citrus-50/50"
                      }`}
                    >
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                        {stat.label}
                      </p>
                      <p className="text-xl font-bold text-foreground mt-1">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-muted">{stat.sub}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-6"
            >
              <h1 className="text-2xl font-bold">Profile 👤</h1>

              {/* Profile card */}
              <div className="glass rounded-3xl p-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sage-400 to-sage-600 flex items-center justify-center text-2xl font-bold text-white">
                  {currentUser.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {currentUser.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.streak} day streak · {currentUser.dailyCalorieGoal} kcal goal
                  </p>
                </div>
              </div>

              {/* Goals */}
              <div className="glass rounded-3xl p-5">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  Daily Goals
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Calories",
                      value: `${currentUser.dailyCalorieGoal} kcal`,
                      icon: "🔥",
                    },
                    {
                      label: "Protein",
                      value: `${currentUser.macroGoals.protein}g`,
                      icon: "💪",
                    },
                    {
                      label: "Carbs",
                      value: `${currentUser.macroGoals.carbs}g`,
                      icon: "⚡",
                    },
                    {
                      label: "Fat",
                      value: `${currentUser.macroGoals.fat}g`,
                      icon: "🥑",
                    },
                  ].map((goal) => (
                    <div
                      key={goal.label}
                      className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{goal.icon}</span>
                        <span className="text-sm text-foreground font-medium">
                          {goal.label}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-foreground">
                        {goal.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settings links */}
              <div className="glass rounded-3xl overflow-hidden">
                {[
                  { icon: User, label: "Edit Profile", color: "text-sage-600" },
                  {
                    icon: Award,
                    label: "Achievements",
                    color: "text-citrus-600",
                  },
                  {
                    icon: Heart,
                    label: "Health Preferences",
                    color: "text-red-400",
                  },
                  {
                    icon: Shield,
                    label: "Privacy & Data",
                    color: "text-blue-500",
                  },
                  {
                    icon: Settings,
                    label: "Settings",
                    color: "text-muted-foreground",
                  },
                  { icon: LogOut, label: "Sign Out", color: "text-red-500" },
                ].map((item, i) => (
                  <motion.button
                    key={item.label}
                    onClick={() => handleActionClick(item.label)}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/30 transition-colors border-b border-border/30 last:border-0"
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Global Toast for Demo Actions */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-sage-600 text-white text-sm font-medium shadow-2xl whitespace-nowrap"
          >
            🚧 {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
