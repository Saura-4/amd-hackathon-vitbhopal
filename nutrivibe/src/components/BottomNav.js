"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  UtensilsCrossed,
  BarChart3,
  User,
} from "lucide-react";

const navItems = [
  { key: "dashboard", label: "Home", icon: LayoutDashboard },
  { key: "insights", label: "Insights", icon: Sparkles },
  { key: "log", label: "Log", icon: UtensilsCrossed, isCenter: true },
  { key: "trends", label: "Trends", icon: BarChart3 },
  { key: "profile", label: "Profile", icon: User },
];

export default function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      <div className="glass border-t border-glass-border rounded-t-3xl mx-auto max-w-lg">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <motion.button
                  key={item.key}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onTabChange(item.key)}
                  className="relative -mt-5"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-colors ${
                      isActive
                        ? "bg-sage-500 shadow-sage-500/30"
                        : "bg-sage-500 shadow-sage-500/20"
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </motion.button>
              );
            }

            return (
              <motion.button
                key={item.key}
                whileTap={{ scale: 0.9 }}
                onClick={() => onTabChange(item.key)}
                className="flex flex-col items-center gap-1 py-3 px-5 relative h-full justify-center w-full min-w-[64px]"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-sage-600" : "text-muted"
                  }`}
                />
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive ? "text-sage-600" : "text-muted"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -top-1 w-1 h-1 rounded-full bg-sage-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
