"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const tabs = [
  { key: "calories", label: "Calories", color: "#6B8F5B" },
  { key: "protein", label: "Protein", color: "#FFA836" },
  { key: "carbs", label: "Carbs", color: "#E67300" },
  { key: "fat", label: "Fat", color: "#557349" },
];

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur border border-border rounded-xl px-3 py-2 shadow-lg">
        <p className="text-xs font-bold text-foreground">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-xs text-muted-foreground">
            <span className="font-semibold" style={{ color: entry.color }}>
              {entry.value}
            </span>{" "}
            {entry.name === "calories" ? "kcal" : "g"}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function WeeklyChart({ weeklyData }) {
  const [activeTab, setActiveTab] = useState("calories");
  const [chartType, setChartType] = useState("area");
  const activeConfig = tabs.find((t) => t.key === activeTab);

  // Compute trend
  const values = weeklyData.map((d) => d[activeTab]);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const last = values[values.length - 1];
  const prevAvg =
    values.slice(0, -1).reduce((a, b) => a + b, 0) / (values.length - 1);
  const trendDir = last > prevAvg ? "up" : last < prevAvg ? "down" : "flat";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-sage-600" />
          </div>
          <h2 className="text-lg font-bold text-foreground">Weekly Trends</h2>
        </div>
        {/* Chart type toggle */}
        <div className="flex gap-1 p-1 rounded-xl bg-sage-50">
          {["area", "bar"].map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all ${
                chartType === type
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-5">
        {/* Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "text-white shadow-md"
                  : "bg-white/50 text-muted-foreground hover:text-foreground border border-border/50"
              }`}
              style={
                activeTab === tab.key
                  ? { background: tab.color }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-6 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Average</p>
            <p className="text-lg font-bold text-foreground">
              {Math.round(avg)}
              <span className="text-xs font-normal text-muted-foreground ml-1">
                {activeTab === "calories" ? "kcal" : "g"}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            {trendDir === "up" ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : trendDir === "down" ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : (
              <Minus className="w-4 h-4 text-muted" />
            )}
            <span
              className={`text-xs font-semibold ${
                trendDir === "up"
                  ? "text-green-600"
                  : trendDir === "down"
                  ? "text-red-500"
                  : "text-muted-foreground"
              }`}
            >
              {trendDir === "up" ? "Trending up" : trendDir === "down" ? "Trending down" : "Stable"}
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full" style={{ height: 224 }}>
          <ResponsiveContainer width="100%" height={224}>
            {chartType === "area" ? (
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient
                    id={`gradient-${activeTab}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={activeConfig.color}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={activeConfig.color}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeTab}
                  stroke={activeConfig.color}
                  strokeWidth={2.5}
                  fill={`url(#gradient-${activeTab})`}
                  dot={{
                    r: 4,
                    fill: activeConfig.color,
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            ) : (
              <BarChart data={weeklyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E2E8F0"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: "#94A3B8" }}
                  width={40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={activeTab}
                  fill={activeConfig.color}
                  radius={[8, 8, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </motion.section>
  );
}
