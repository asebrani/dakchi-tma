import { motion } from "framer-motion";
import { mockUser } from "@/data/mockUser";
import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const genreData = [
  { name: "Electronic", value: 42, fill: "hsl(142, 71%, 45%)" },
  { name: "Pop", value: 28, fill: "hsl(142, 71%, 35%)" },
  { name: "Hip-Hop", value: 18, fill: "hsl(142, 71%, 25%)" },
  { name: "Rock", value: 12, fill: "hsl(142, 71%, 18%)" },
];

const weeklyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 1.8 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 5.2 },
  { day: "Sat", hours: 6.8 },
  { day: "Sun", hours: 4.4 },
];

const hoursData = [
  { name: "hours", value: mockUser.stats.hoursListened, fill: "hsl(142, 71%, 45%)" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground">{label || payload[0].name}</p>
        <p className="text-sm font-semibold text-primary">
          {payload[0].value}{payload[0].dataKey === 'hours' ? 'h' : '%'}
        </p>
      </div>
    );
  }
  return null;
};

const ListeningStats = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-bold text-foreground mb-6">Listening Stats</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Hours Listened - Radial Chart */}
        <motion.div
          className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Hours Listened</p>
          <div className="h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="90%"
                data={hoursData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background={{ fill: "hsl(0, 0%, 15%)" }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-primary">{mockUser.stats.hoursListened}</span>
              <span className="text-xs text-muted-foreground">hours</span>
            </div>
          </div>
        </motion.div>

        {/* Genre Distribution - Donut Chart */}
        <motion.div
          className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Top Genres</p>
          <div className="h-32 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {genreData.slice(0, 2).map((genre) => (
              <span
                key={genre.name}
                className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Weekly Activity - Bar Chart */}
        <motion.div
          className="bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Weekly Activity</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barSize={12}>
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(0, 0%, 50%)", fontSize: 10 }}
                />
                <Bar
                  dataKey="hours"
                  fill="hsl(142, 71%, 45%)"
                  radius={[4, 4, 0, 0]}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(0, 0%, 20%)", opacity: 0.3 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Stats Summary Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {[
          { label: "Total Playlists", value: mockUser.stats.totalPlaylists },
          { label: "AI Generations", value: mockUser.stats.aiGenerations },
          { label: "Favorite Genre", value: "Electronic" },
          { label: "This Week", value: "28h" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-card/20 backdrop-blur-md border border-white/5 rounded-xl p-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ListeningStats;