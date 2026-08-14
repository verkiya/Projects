import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "deduplicate videos",
  { hourUTC: 0, minuteUTC: 0 },
  internal.learnings.internalDeduplicateVideos
);

crons.weekly(
  "check video availability",
  { dayOfWeek: "sunday", hourUTC: 2, minuteUTC: 0 },
  internal.actions.checkVideoAvailability
);

export default crons;
