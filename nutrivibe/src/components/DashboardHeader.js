"use client";

import { motion } from "framer-motion";
import { Flame, Trophy, TrendingUp, Droplets } from "lucide-react";
import ProgressRing from "./ProgressRing";

export default function DashboardHeader({ user, progress, onAddWater }) {
  const caloriePercent = Math.round(
    (progress.calories.consumed / progress.calories.goal) * 100
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Greeting + Streak */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Hey, {user.name} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here&apos;s your daily nutrition snapshot
          </p>
        </div>
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-citrus-50 border border-citrus-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Flame className="w-5 h-5 text-citrus-500" />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-citrus-600 leading-tight">
              {user.streak}
            </span>
            <span className="text-[10px] text-citrus-500 font-medium uppercase tracking-wider">
              Day Streak
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main Calorie Ring + Macros */}
      <div className="glass rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Calorie ring */}
          <div className="flex flex-col items-center">
            <ProgressRing
              value={progress.calories.consumed}
              max={progress.calories.goal}
              size={160}
              strokeWidth={14}
              color="#6B8F5B"
              bgColor="#E4EBE0"
              label=""
              delay={0}
            />
            <div className="text-center mt-2">
              <p className="text-sm font-medium text-muted-foreground">
                <span className="text-xl font-bold text-sage-600">
                  {progress.calories.consumed}
                </span>{" "}
                / {progress.calories.goal} kcal
              </p>
              <p className="text-xs text-muted mt-1">
                {progress.calories.goal - progress.calories.consumed} remaining
              </p>
            </div>
          </div>

          {/* Macro breakdown */}
          <div className="flex-1 grid grid-cols-3 gap-4 w-full">
            <MacroCard
              label="Protein"
              consumed={progress.protein.consumed}
              goal={progress.protein.goal}
              unit="g"
              color="#6B8F5B"
              bgColor="#E4EBE0"
              icon={<TrendingUp className="w-4 h-4" />}
              delay={0.15}
            />
            <MacroCard
              label="Carbs"
              consumed={progress.carbs.consumed}
              goal={progress.carbs.goal}
              unit="g"
              color="#FFA836"
              bgColor="#FFF0D4"
              icon={<Flame className="w-4 h-4" />}
              delay={0.3}
            />
            <MacroCard
              label="Fat"
              consumed={progress.fat.consumed}
              goal={progress.fat.goal}
              unit="g"
              color="#E67300"
              bgColor="#FFDDA8"
              icon={<Trophy className="w-4 h-4" />}
              delay={0.45}
            />
          </div>
        </div>

        {/* Water tracker */}
        <motion.div
          className="mt-6 pt-6 border-t border-border flex items-center justify-between cursor-pointer group"
          onClick={onAddWater}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center">
              <Droplets className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Water Intake <span className="text-[10px] text-blue-500 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">(Click to add)</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {progress.water.consumed} / {progress.water.goal} glasses
              </p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: progress.water.goal }).map((_, i) => (
              <motion.div
                key={i}
                className={`w-3.5 h-8 rounded-full ${
                  i < progress.water.consumed
                    ? "bg-blue-400 shadow-sm shadow-blue-400/50"
                    : "bg-blue-100"
                }`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                style={{ transformOrigin: "bottom" }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function MacroCard({ label, consumed, goal, unit, color, bgColor, icon, delay }) {
  const pct = Math.round((consumed / goal) * 100);

  return (
    <motion.div
      className="flex flex-col items-center p-3 md:p-4 rounded-2xl bg-white/50 border border-border/50"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <ProgressRing
        value={consumed}
        max={goal}
        size={72}
        strokeWidth={7}
        color={color}
        bgColor={bgColor}
        delay={delay}
        showPercentage
      />
      <p className="text-xs font-semibold text-foreground mt-2">{label}</p>
      <p className="text-[10px] text-muted-foreground">
        {consumed}/{goal}{unit}
      </p>
    </motion.div>
  );
}
