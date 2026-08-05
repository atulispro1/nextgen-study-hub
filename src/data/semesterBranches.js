/* ============================================================
   SEMESTER BRANCH CONFIGURATION (NextGen Study Hub)
   ============================================================
   Central place that manages branches and their subjects.

   🚀 FUTURE SCALABILITY
   ---------------------
   Subjects are organised per semester and per branch:

     export const SUBJECTS_BY_SEMESTER = {
       3: { cs: [...], me: [...] },
       4: { cs: [...], me: [...] },   // future
       5: { cs: [...], me: [...] },   // future
       6: { cs: [...], me: [...] },   // future
     };

   To enable a new semester, add its id to BRANCH_SEMESTERS and
   give it a branch map above. No routing, component, or page
   changes are needed afterwards.
   ============================================================ */

/* ------------------------------------------------------------
   BRANCH-BASED SEMESTERS
   Semesters listed here use the branch flow: students pick a
   branch first, then browse branch-wise subjects.
   ------------------------------------------------------------ */

export const BRANCH_SEMESTERS = ["3"];

/** True when a semester uses the branch selection flow. */
export const isBranchSemester = (semesterId) =>
  BRANCH_SEMESTERS.includes(String(semesterId));

export const BRANCHES = [
  {
    slug: "cs",
    name: "Computer Science",
    shortName: "CS",
    icon: "💻",
    tagline: "Code • Logic • Software",
    description:
      "Programming, software, and the digital world. Ideal if you love code, logic, and building technology.",
    accent: "#818cf8",
    border: "rgba(99,102,241,0.34)",
    glow: "rgba(99,102,241,0.20)",
  },
  {
    slug: "me",
    name: "Mechanical Engineering",
    shortName: "ME",
    icon: "⚙️",
    tagline: "Machines • Design • Power",
    description:
      "Machines, manufacturing, and mechanics. For students who enjoy understanding how things are built and how they work.",
    accent: "#fb923c",
    border: "rgba(249,115,22,0.34)",
    glow: "rgba(249,115,22,0.20)",
  },
];

/* ------------------------------------------------------------
   SEMESTER 3 SUBJECTS (branch flow)
   Single source of truth for Semester 3. Each branch has its
   own subject list — edit an array here and every page picks
   it up automatically (SemesterPage, SubjectSelection,
   LastMinuteResources, NotesLibrary).
   ------------------------------------------------------------ */

const SEMESTER_3_SUBJECTS = [
  {
    code: "DCS-301",
    name: "Programming in C",
    icon: "💻",
    description:
      "Master the core of C — variables, loops, arrays, functions, and pointers. The foundation of software development.",
  },
  {
    code: "DEC-302",
    name: "Digital Electronics",
    icon: "🔌",
    description:
      "Logic gates, flip-flops, combinational and sequential circuits — the building blocks behind every digital device.",
  },
  {
    code: "DCS-303",
    name: "IT Awareness",
    icon: "🌐",
    description:
      "Computer fundamentals, internet concepts, and essential IT literacy to stay confident in a digital world.",
  },
  {
    code: "DCS-305",
    name: "Operating System",
    icon: "🖥️",
    description:
      "Processes, scheduling, memory management, and file systems — how modern operating systems really work.",
  },
  {
    code: "DCS-306",
    name: "Applications of Computer Software & Hardware",
    icon: "🧰",
    description:
      "Practical application of software and hardware in everyday tasks — installation, configuration, and troubleshooting.",
  },
];

const SEMESTER_3_ME_SUBJECTS = [
  {
    code: "DME-302",
    name: "Thermodynamics",
    icon: "🌡️",
    description:
      "Heat, work, and energy — the laws that power every engine, turbine, and thermal system around you.",
  },
  {
    code: "DME-303",
    name: "Hydraulics & Hydraulic Machines",
    icon: "🌊",
    description:
      "Fluid pressure, flow, and turbines or pumps — how liquids are harnessed to do real mechanical work.",
  },
  {
    code: "DME-304",
    name: "Material Science",
    icon: "🔬",
    description:
      "Structure, properties, and behaviour of metals and alloys — choosing the right material for the right job.",
  },
  {
    code: "DME-305",
    name: "Manufacturing Process",
    icon: "🏭",
    description:
      "Casting, welding, machining, and forming — turning raw material into finished components step by step.",
  },
  {
    code: "DME-306",
    name: "Production & Operation Management",
    icon: "📦",
    description:
      "Planning, scheduling, and controlling production — running a workshop or plant efficiently and profitably.",
  },
];

/* ------------------------------------------------------------
   SUBJECTS BY SEMESTER (branch flow)
   Keyed by semester id, then branch slug.
   Only Semester 3 exists today. Semesters 4–6 will be added
   here when their content is ready — no code changes needed.
   ------------------------------------------------------------ */

export const SUBJECTS_BY_SEMESTER = {
  3: {
    cs: SEMESTER_3_SUBJECTS,
    me: SEMESTER_3_ME_SUBJECTS,
  },
};

/* ------------------------------------------------------------
   DEFAULT (NON-BRANCH) SUBJECTS
   Shared by SemesterPage and LastMinuteResources so every page
   uses the exact same lists instead of duplicating them.
   ------------------------------------------------------------ */

export const DEFAULT_SUBJECTS_BY_SEMESTER = {
  1: [
    "Applied Chemistry (DCH-101)",
    "Engineering Mechanics (DME-201)",
    "Basic Electrical Engineering (DEE-201)",
    "Applied Mathematics (DMA-201)",
    "Essential Language & Communication (DGS-201)",
    "Environmental Science (DCE-201)",
  ],
  2: [
    "Programming in C",
    "Digital Electronics",
    "Applied Mathematics II",
    "Workshop Practice",
    "Engineering Drawing",
    "Computer Fundamentals",
  ],
};

/* ============================================================
   HELPERS
   ============================================================ */

/** Find a branch by its url slug. */
export const getBranchBySlug = (slug) =>
  BRANCHES.find((b) => b.slug === slug);

/** Subjects for a branch in a given semester (falls back to the semester's CS list). */
export const getBranchSubjects = (semesterId, branchSlug) =>
  SUBJECTS_BY_SEMESTER[semesterId]?.[branchSlug] ||
  SUBJECTS_BY_SEMESTER[semesterId]?.cs ||
  [];

/** Full display strings for a branch's subjects (matches DB values). */
export const getBranchSubjectNames = (semesterId, branchSlug) =>
  getBranchSubjects(semesterId, branchSlug).map(formatSubjectName);

/** Full display strings for EVERY branch's subjects in a semester (used by
    global library filters like the Notes Library subject dropdown). */
export const getAllBranchSubjectNames = (semesterId) => {
  const names = new Set(
    Object.values(SUBJECTS_BY_SEMESTER[semesterId] || {})
      .flat()
      .map(formatSubjectName),
  );
  return [...names];
};

/** Full display string used across the site (matches DB values). */
export const formatSubjectName = (subject) =>
  `${subject.name} (${subject.code})`;
