// Mock data layer — architected for easy swap to Firebase/Supabase

export const currentUser = {
  name: "Alex",
  avatar: "A",
  streak: 12,
  dailyCalorieGoal: 2200,
  macroGoals: {
    protein: 150, // grams
    carbs: 250,
    fat: 70,
  },
};

export const todayProgress = {
  calories: { consumed: 1480, goal: 2200 },
  protein: { consumed: 98, goal: 150, unit: "g" },
  carbs: { consumed: 165, goal: 250, unit: "g" },
  fat: { consumed: 42, goal: 70, unit: "g" },
  water: { consumed: 6, goal: 8, unit: "glasses" },
};

export const weeklyData = [
  { day: "Mon", calories: 2050, protein: 130, carbs: 230, fat: 62 },
  { day: "Tue", calories: 1890, protein: 142, carbs: 200, fat: 55 },
  { day: "Wed", calories: 2200, protein: 155, carbs: 245, fat: 68 },
  { day: "Thu", calories: 1750, protein: 118, carbs: 190, fat: 52 },
  { day: "Fri", calories: 2100, protein: 140, carbs: 235, fat: 65 },
  { day: "Sat", calories: 2400, protein: 125, carbs: 280, fat: 78 },
  { day: "Sun", calories: 1480, protein: 98, carbs: 165, fat: 42 },
];

// Contextual meal suggestions based on time of day
export function getContextualInsights(hour) {
  if (hour >= 5 && hour < 11) {
    return {
      greeting: "Good Morning",
      emoji: "🌅",
      timeLabel: "Breakfast Time",
      suggestions: [
        {
          id: 1,
          title: "Greek Yogurt Power Bowl",
          description: "High protein start based on your usual patterns",
          calories: 380,
          protein: 28,
          tags: ["High Protein", "Quick"],
          image: "🥣",
          reason: "You usually pick high-protein breakfasts — this builds on that!",
        },
        {
          id: 2,
          title: "Avocado Toast with Eggs",
          description: "Heart-healthy fats + protein to fuel your morning",
          calories: 420,
          protein: 22,
          tags: ["Heart Healthy", "Popular"],
          image: "🥑",
          reason: "Trending among users with similar goals.",
        },
        {
          id: 3,
          title: "Overnight Oats",
          description: "Meal-prep friendly, slow-release energy",
          calories: 340,
          protein: 14,
          tags: ["Meal Prep", "Fiber Rich"],
          image: "🫙",
          reason: "Great complex carbs to sustain your morning energy.",
        },
      ],
      tip: {
        title: "Morning Tip",
        text: "Eating within 2 hours of waking can boost your metabolism by up to 10%.",
        icon: "💡",
      },
    };
  }

  if (hour >= 11 && hour < 14) {
    return {
      greeting: "Good Afternoon",
      emoji: "☀️",
      timeLabel: "Lunch Hour",
      suggestions: [
        {
          id: 4,
          title: "Grilled Chicken Quinoa Bowl",
          description: "Balanced macros for sustained afternoon energy",
          calories: 520,
          protein: 42,
          tags: ["Balanced", "High Protein"],
          image: "🍗",
          reason: "Keeps you full until dinner — matches your calorie budget.",
        },
        {
          id: 5,
          title: "Mediterranean Salad Wrap",
          description: "Light yet satisfying with healthy fats",
          calories: 410,
          protein: 18,
          tags: ["Light", "Mediterranean"],
          image: "🌯",
          reason: "A lighter option since you had a heavier breakfast yesterday.",
        },
        {
          id: 6,
          title: "Lentil Soup & Bread",
          description: "Plant-based protein powerhouse",
          calories: 380,
          protein: 24,
          tags: ["Plant Based", "Warm"],
          image: "🍲",
          reason: "You haven't had enough fiber this week — this helps close the gap.",
        },
      ],
      tip: {
        title: "Lunch Wisdom",
        text: "A balanced lunch prevents the 3 PM energy crash. Aim for protein + complex carbs.",
        icon: "⚡",
      },
    };
  }

  if (hour >= 14 && hour < 17) {
    return {
      greeting: "Afternoon",
      emoji: "🌤️",
      timeLabel: "Snack O'Clock",
      suggestions: [
        {
          id: 7,
          title: "Apple & Almond Butter",
          description: "Sweet craving? Try this instead of processed snacks",
          calories: 220,
          protein: 6,
          tags: ["Natural Sugar", "Quick Fix"],
          image: "🍎",
          reason: "You typically grab something sweet around now — this is a healthier swap!",
        },
        {
          id: 8,
          title: "Trail Mix & Dark Chocolate",
          description: "Energy boost without the sugar crash",
          calories: 280,
          protein: 8,
          tags: ["Energy Boost", "Antioxidants"],
          image: "🍫",
          reason: "Steady energy to power through the rest of your day.",
        },
        {
          id: 9,
          title: "Protein Smoothie",
          description: "Quick, refreshing, and macro-friendly",
          calories: 310,
          protein: 25,
          tags: ["Refreshing", "High Protein"],
          image: "🥤",
          reason: "You're 52g short on protein today — this closes the gap fast.",
        },
      ],
      tip: {
        title: "Beat the Crash",
        text: "The afternoon slump is real! Skip the candy bar — protein + fiber keeps you going.",
        icon: "🔋",
      },
    };
  }

  // Evening / dinner (17-22) and late night
  return {
    greeting: "Good Evening",
    emoji: "🌙",
    timeLabel: "Dinner Time",
    suggestions: [
      {
        id: 10,
        title: "Baked Salmon & Veggies",
        description: "Omega-3 rich dinner for recovery and rest",
        calories: 480,
        protein: 38,
        tags: ["Omega-3", "Anti-inflammatory"],
        image: "🐟",
        reason: "Great for winding down — omega-3s support better sleep quality.",
      },
      {
        id: 11,
        title: "Stir-Fry Tofu & Brown Rice",
        description: "Light, plant-based evening option",
        calories: 420,
        protein: 22,
        tags: ["Plant Based", "Light Dinner"],
        image: "🍜",
        reason: "A lighter dinner since your lunch was heavier today.",
      },
      {
        id: 12,
        title: "Turkey & Sweet Potato Bowl",
        description: "Lean protein + slow carbs for overnight recovery",
        calories: 460,
        protein: 35,
        tags: ["Lean Protein", "Slow Carbs"],
        image: "🥗",
        reason: "You need 52g more protein today — this gets you close to your goal.",
      },
    ],
    tip: {
      title: "Evening Note",
      text: "Try to finish eating 2-3 hours before bed for better digestion and sleep.",
      icon: "😴",
    },
  };
}

export const recentMeals = [
  {
    id: 1,
    name: "Greek Yogurt Bowl",
    time: "8:30 AM",
    calories: 380,
    protein: 28,
    carbs: 42,
    fat: 12,
    emoji: "🥣",
  },
  {
    id: 2,
    name: "Chicken Grain Bowl",
    time: "12:45 PM",
    calories: 520,
    protein: 42,
    carbs: 58,
    fat: 16,
    emoji: "🍗",
  },
  {
    id: 3,
    name: "Apple & Almond Butter",
    time: "3:15 PM",
    calories: 220,
    protein: 6,
    carbs: 28,
    fat: 10,
    emoji: "🍎",
  },
  {
    id: 4,
    name: "Protein Smoothie",
    time: "5:00 PM",
    calories: 310,
    protein: 25,
    carbs: 35,
    fat: 4,
    emoji: "🥤",
  },
];
