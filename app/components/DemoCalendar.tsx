import CopyButtonStatic from "./CopyButtonStatic";

const DEMO_POSTS = [
  {
    day: "Monday",
    platform: "📸 Instagram",
    copy: "Most people think getting fit requires hours at the gym. They're wrong.\n\nAs a busy professional, you have exactly 20 minutes — and that's enough. Here's the 4-move circuit I give every client who travels 3+ days a week:\n\n① Push-ups × 15\n② Bodyweight squats × 20\n③ Plank hold × 45s\n④ Hip hinges × 12\n\nRepeat 3 rounds. No equipment. No excuses. Drop a 🔥 if you're trying this today.",
    hashtags: ["#FitnessCoach", "#BusyProfessional", "#WorkoutAtHome", "#FitLife", "#HealthyHabits", "#NoExcuses", "#MorningWorkout"],
    gradient: "from-violet-500/10 to-fuchsia-500/10 border-violet-500/20",
    index: 0,
  },
  {
    day: "Wednesday",
    platform: "📸 Instagram",
    copy: "I used to tell myself 'I'll start Monday.'\n\nThen Monday became next Monday. Then January. Then 'after the project wraps.'\n\nThe truth? There is no perfect time. There's only now.\n\nMy top client started with 10 minutes of walking on her lunch break. Twelve weeks later she ran her first 5K — while managing a 60-hour work week.\n\nSmall, consistent action beats perfect planning every single time. What's your 10-minute win today?",
    hashtags: ["#MindsetShift", "#FitnessMotivation", "#ConsistencyIsKey", "#FitnessCoaching", "#HealthyLifestyle", "#GoalSetting"],
    gradient: "from-fuchsia-500/10 to-pink-500/10 border-fuchsia-500/20",
    index: 2,
  },
  {
    day: "Friday",
    platform: "📸 Instagram",
    copy: "3 nutrition lies the fitness industry sold you:\n\n❌ You need to eat every 2 hours to 'boost metabolism'\n❌ Carbs after 6pm turn straight to fat\n❌ You must suffer to see results\n\nThe truth: Eat whole foods, hit your protein target, sleep 7+ hours, and move your body 4× a week.\n\nThat's it. The boring basics win every time.\n\nSave this post next time an ad promises you a shortcut. 📌",
    hashtags: ["#NutritionTips", "#FitnessMyths", "#HealthCoach", "#EatToPerform", "#CleanEating", "#FitnessEducation", "#WellnessTips"],
    gradient: "from-indigo-500/10 to-blue-500/10 border-indigo-500/20",
    index: 4,
  },
  {
    day: "Sunday",
    platform: "📸 Instagram",
    copy: "Sunday ritual that changed my clients' weeks:\n\n→ 20-min meal prep for protein sources\n→ Schedule workouts like meetings (block them in calendar)\n→ Set out workout clothes the night before\n→ Review your 'why' — keep it somewhere visible\n\nPeople who plan Sunday perform differently Monday through Friday. Not harder. Smarter.\n\nSwipe to see my exact Sunday prep checklist → 📋",
    hashtags: ["#SundayReset", "#MealPrep", "#FitnessRoutine", "#FitnessCoach", "#HealthyHabits", "#WorkLifeBalance", "#SundayMotivation"],
    gradient: "from-violet-500/10 to-indigo-500/10 border-violet-500/20",
    index: 6,
  },
];

export default function DemoCalendar() {
  return (
    <section className="py-20 px-6 border-t border-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3 block">
            Example Output
          </span>
          <h2 className="text-3xl font-bold mb-4">
            What Your Calendar Looks Like
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Below is a real sample generated for the niche{" "}
            <span className="text-slate-200 font-medium">
              &ldquo;fitness coaching for busy professionals&rdquo;
            </span>{" "}
            on Instagram with a Professional tone.
          </p>
        </div>

        <div className="grid gap-4">
          {DEMO_POSTS.map((post) => {
            const fullText = `${post.copy}\n\n${post.hashtags.join(" ")}`;
            return (
              <div
                key={post.day}
                className={`rounded-2xl border bg-gradient-to-br ${post.gradient} p-5 flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Day {post.index + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {post.day}
                    </span>
                    <span className="text-xs text-slate-500">{post.platform}</span>
                  </div>
                  <CopyButtonStatic text={fullText} />
                </div>

                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {post.copy}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.hashtags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-800/80 text-violet-300 px-2 py-0.5 rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#generator"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition-colors px-7 py-3.5 rounded-full font-semibold text-sm shadow-lg shadow-violet-900/40"
          >
            Generate Mine Now →
          </a>
        </div>
      </div>
    </section>
  );
}
