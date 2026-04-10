"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowRight } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function InsightsFeed({ insights, onAddMeal }) {
  if (!insights) return null;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="w-full"
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-sage-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              {insights.greeting} {insights.emoji}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{insights.timeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tip card */}
      <motion.div
        className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-sage-50 to-citrus-50 border border-sage-200 shadow-lg shadow-sage-500/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: ["0px 10px 15px -3px rgba(107, 143, 91, 0.1)", "0px 15px 20px -3px rgba(107, 143, 91, 0.4)", "0px 10px 15px -3px rgba(107, 143, 91, 0.1)"]
        }}
        transition={{ 
          delay: 0.4,
          boxShadow: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }}
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{insights.tip.icon}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              {insights.tip.title}
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              {insights.tip.text}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Suggestion cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3"
      >
        {insights.suggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} onAddMeal={onAddMeal} />
        ))}
      </motion.div>
    </motion.section>
  );
}

function SuggestionCard({ suggestion, onAddMeal }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onAddMeal && onAddMeal(suggestion)}
      className="glass rounded-2xl p-4 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {/* Emoji icon */}
        <div className="w-14 h-14 rounded-2xl bg-sage-50 flex items-center justify-center text-3xl shrink-0">
          {suggestion.image}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-foreground leading-tight">
                {suggestion.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {suggestion.description}
              </p>
            </div>
            <motion.div
              className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ x: 3 }}
            >
              <ArrowRight className="w-4 h-4 text-sage-600" />
            </motion.div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {suggestion.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-sage-100 text-sage-700"
              >
                {tag}
              </span>
            ))}
            <span className="text-[10px] text-muted-foreground ml-1">
              {suggestion.calories} kcal · {suggestion.protein}g protein
            </span>
          </div>

          {/* AI reason */}
          <div className="mt-2 flex items-start gap-1.5">
            <Sparkles className="w-3 h-3 text-citrus-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-citrus-600 leading-snug italic">
              {suggestion.reason}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
