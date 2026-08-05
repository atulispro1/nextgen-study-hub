/**
 * GLOBAL SEARCH INDEX
 * -------------------
 * Static, dependency-free index of everything searchable on the site:
 * subjects, branches, semesters, tools, blogs, articles and pages.
 *
 * Dynamic content (jobs + uploaded study materials) is NOT part of this
 * module — the GlobalSearch component fetches those once, lazily, and merges
 * them in via buildDynamicEntries(). The search function here works on any
 * array of entries, so static and dynamic entries use the same matcher.
 */

import {
  BRANCHES,
  SUBJECTS_BY_SEMESTER,
  DEFAULT_SUBJECTS_BY_SEMESTER,
  isBranchSemester,
  formatSubjectName,
} from "./semesterBranches";
import { allBlogs } from "./allBlogs";
import generatedArticles from "./generatedArticles.json";

/* ------------------------------------------------------------------ */
/* Entry shape:                                                        */
/* { id, title, description, icon, group, meta, href, keywords }       */
/* group ∈ materials | subjects | semesters | tools | blogs | jobs |   */
/*          pages                                                      */
/* ------------------------------------------------------------------ */

export const GROUP_ORDER = [
  "materials",
  "subjects",
  "semesters",
  "tools",
  "blogs",
  "jobs",
  "pages",
];

export const GROUP_LABELS = {
  materials: "Study Materials",
  subjects: "Subjects & Branches",
  semesters: "Semesters",
  tools: "Student Tools",
  blogs: "Blogs & Articles",
  jobs: "Jobs & Internships",
  pages: "Other Pages",
};

export const GROUP_ICONS = {
  materials: "📚",
  subjects: "📝",
  semesters: "🎓",
  tools: "🤖",
  blogs: "📰",
  jobs: "💼",
  pages: "📄",
};

/* ---------------------------- helpers ---------------------------- */

// Normalize for matching: lowercase, drop spaces/dashes/punctuation so that
// "DCS-301" ≈ "dcs301" and "semester 3" ≈ "semester3".
export const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .replace(/[-–—\s]+/g, "")
    .replace(/[^\w\u00c0-\uffff]/g, "");

// Split a raw query into lowercase tokens, keeping useful words.
const tokenize = (q) =>
  String(q || "")
    .toLowerCase()
    .split(/[\s,;]+/)
    .filter((t) => t.length > 0);

// Classic Levenshtein distance (capped) for lightweight typo tolerance.
function editDistance(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  let prev = Array(b.length + 1);
  for (let j = 0; j <= b.length; j++) prev[j] = j;
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(
        prev[j] + 1,
        cur[j - 1] + 1,
        prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    prev = cur;
  }
  return prev[b.length];
}

/**
 * Rank one entry against the query tokens.
 * Returns a score (0 = no match) — higher is a better match.
 */
function scoreEntry(entry, tokens) {
  const hay = normalize(
    `${entry.title} ${entry.description || ""} ${entry.meta || ""} ${(
      entry.keywords || []
    ).join(" ")}`,
  );
  const hayWords = new Set(
    normalize(`${entry.title} ${entry.keywords || []}`).match(/[a-z0-9]{3,}/g) ||
      [],
  );

  let score = 0;
  let anyFuzzy = false;

  for (const token of tokens) {
    if (hay.includes(token)) {
      score += token.length >= 3 ? 3 : 2;
    } else {
      // Typo tolerance: allow ≤1 edit on words ≥ 4 chars.
      if (token.length >= 4) {
        let fuzzy = false;
        for (const w of hayWords) {
          if (editDistance(token, w) <= 1) {
            fuzzy = true;
            break;
          }
        }
        if (fuzzy) {
          score += 1;
          anyFuzzy = true;
        } else {
          return 0; // every token must match somewhere
        }
      } else {
        return 0;
      }
    }
  }

  if (score === 0) return 0;

  const normTitle = normalize(entry.title);
  const normQuery = tokens.join("");

  if (normTitle === normQuery) score += 20;
  else if (normTitle.startsWith(normQuery)) score += 8;

  // Subjects / materials with codes get a small boost for exact code hits.
  if (entry.code && hay.includes(normalize(entry.code))) score += 2;

  return anyFuzzy ? score - 1 : score;
}

/** Search any entry array. Returns entries with score, sorted desc. */
export function searchEntries(entries, rawQuery) {
  const tokens = tokenize(rawQuery);
  if (!tokens.length) return [];

  const scored = [];
  for (const entry of entries) {
    const score = scoreEntry(entry, tokens);
    if (score > 0) scored.push({ ...entry, score });
  }

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return scored;
}

/* ----------------------- static index builder ----------------------- */

const TOOLS = [
  {
    title: "AI Question Solver",
    icon: "🤖",
    description: "Get step-by-step answers to any academic question",
    section: "ai-question",
    keywords: ["ai", "question", "solver", "answer", "solution"],
  },
  {
    title: "AI Assistant",
    icon: "✨",
    description: "Generate notes, assignments, explanations and viva questions",
    section: "ai",
    keywords: ["ai", "assistant", "notes", "assignment", "generate"],
  },
  {
    title: "AI Quiz Arena",
    icon: "🎯",
    description: "Practice with AI-generated MCQ quizzes",
    section: "quiz",
    keywords: ["quiz", "mcq", "practice", "test", "arena"],
  },
  {
    title: "GPA Calculator",
    icon: "📊",
    description: "Calculate your GPA and CGPA instantly",
    section: "gpa",
    keywords: ["gpa", "cgpa", "percentage", "calculator", "grades"],
  },
  {
    title: "Task Manager",
    icon: "✅",
    description: "Plan assignments, practicals and study tasks",
    section: "todo",
    keywords: ["todo", "task", "planner", "to-do", "list"],
  },
  {
    title: "Time Table Generator",
    icon: "🧠",
    description: "Build a full-day smart study schedule",
    section: "timetable",
    keywords: ["timetable", "schedule", "routine", "planner", "study plan"],
  },
  {
    title: "Pomodoro Timer",
    icon: "⏱️",
    description: "Focus with the Pomodoro study technique",
    section: "pomodoro",
    keywords: ["pomodoro", "timer", "focus", "break", "productivity"],
  },
];

const PAGES = [
  {
    title: "Notes Library",
    icon: "📚",
    description: "Browse all semester-wise notes and subjects",
    href: "/notes-library",
    keywords: ["notes", "library", "subjects", "study material"],
  },
  {
    title: "Last Minute Resources",
    icon: "⚡",
    description: "Quick revision resources right before exams",
    href: "/last-minute-resources",
    keywords: ["revision", "last minute", "exam", "crash"],
  },
  {
    title: "Jobs",
    icon: "💼",
    description: "Internships, fresher and remote job openings",
    href: "/jobs",
    keywords: ["jobs", "internship", "fresher", "career", "placement"],
  },
  {
    title: "Blog",
    icon: "📰",
    description: "Study tips, exam preparation and career guides",
    href: "/blog",
    keywords: ["blog", "tips", "study", "career"],
  },
  {
    title: "Articles",
    icon: "📰",
    description: "Latest published articles on NextGen Study Hub",
    href: "/articles",
    keywords: ["articles", "news", "latest"],
  },
  {
    title: "Student Tools",
    icon: "🛠️",
    description: "All productivity and AI tools in one place",
    href: "/student-tools",
    keywords: ["tools", "calculator", "ai", "productivity"],
  },
  {
    title: "About",
    icon: "ℹ️",
    description: "About NextGen Study Hub",
    href: "/about",
    keywords: ["about", "platform", "team"],
  },
  {
    title: "Contact Owner",
    icon: "📬",
    description: "Reach the platform owner",
    href: "/contact-owner",
    keywords: ["contact", "owner", "email", "message"],
  },
  {
    title: "Contact Faculty",
    icon: "👨‍🏫",
    description: "Connect with faculty members",
    href: "/contact-faculty",
    keywords: ["faculty", "teacher", "contact"],
  },
  {
    title: "Courses After 12th Science",
    icon: "🔬",
    description: "Engineering, medical and IT courses after 12th",
    href: "/courses-after-12th-science",
    keywords: ["courses", "science", "12th", "btech", "mbbs"],
  },
  {
    title: "Courses After 12th Commerce",
    icon: "💹",
    description: "BCom, BBA, CA and management courses after 12th",
    href: "/courses-after-12th-commerce",
    keywords: ["courses", "commerce", "12th", "bcom", "bba", "ca"],
  },
  {
    title: "Courses After 12th Arts",
    icon: "🎨",
    description: "Journalism, law, design and humanities courses",
    href: "/courses-after-12th-arts",
    keywords: ["courses", "arts", "12th", "journalism", "law"],
  },
  {
    title: "Privacy Policy",
    icon: "🔒",
    description: "How your data is handled",
    href: "/privacy-policy",
    keywords: ["privacy", "policy", "data"],
  },
  {
    title: "Terms & Conditions",
    icon: "📄",
    description: "Terms of use for the platform",
    href: "/terms",
    keywords: ["terms", "conditions", "rules"],
  },
];

const articleExcerpt = (post) => {
  const firstBlock = Array.isArray(post.body)
    ? post.body.find((b) => Array.isArray(b?.children))
    : null;
  const text = firstBlock?.children
    ?.map((c) => c?.text || "")
    .join(" ")
    .trim();
  return text ? `${text.slice(0, 90)}…` : "Read this article on NextGen Study Hub.";
};

/** Static entries — built once at module load. */
export const STATIC_INDEX = (() => {
  const entries = [];

  // Semester + branch subjects (Semester 3 branch flow)
  Object.entries(SUBJECTS_BY_SEMESTER).forEach(([sem, branches]) => {
    Object.entries(branches).forEach(([branchSlug, subs]) => {
      const branch = BRANCHES.find((b) => b.slug === branchSlug);
      subs.forEach((s) => {
        entries.push({
          id: `sub-${sem}-${branchSlug}-${s.code}`,
          title: s.name,
          description: s.description,
          icon: s.icon || "📘",
          group: "subjects",
          code: s.code,
          meta: `Semester ${sem} • ${branch?.name || branchSlug.toUpperCase()} • ${s.code}`,
          href: `/semester/${sem}/branch/${branchSlug}`,
          keywords: [
            s.code,
            `${s.name} (${s.code})`,
            `semester ${sem}`,
            branch?.name,
            branch?.shortName,
            branchSlug,
          ],
        });
      });
    });
  });

  // Default (non-branch) semester subjects — S1 & S2
  Object.entries(DEFAULT_SUBJECTS_BY_SEMESTER).forEach(([sem, names]) => {
    names.forEach((name) => {
      const codeMatch = name.match(/\(([^)]+)\)/);
      entries.push({
        id: `sub-${sem}-${name}`,
        title: name,
        description: `Semester ${sem} subject resources — notes, assignments and practicals`,
        icon: "📘",
        group: "subjects",
        code: codeMatch ? codeMatch[1] : "",
        meta: `Semester ${sem}`,
        href: `/semester/${sem}`,
        keywords: [name, `semester ${sem}`, codeMatch ? codeMatch[1] : ""],
      });
    });
  });

  // Branches
  BRANCHES.forEach((b) => {
    entries.push({
      id: `branch-${b.slug}`,
      title: b.name,
      description: b.tagline,
      icon: b.icon,
      group: "subjects",
      meta: `Semester 3 • ${b.shortName}`,
      href: `/semester/3/branch/${b.slug}`,
      keywords: [b.name, b.shortName, b.slug, "semester 3", "branch"],
    });
  });

  // Semesters
  [1, 2, 3, 4, 5, 6].forEach((sem) => {
    entries.push({
      id: `sem-${sem}`,
      title: `Semester ${sem}`,
      description: isBranchSemester(sem)
        ? "Choose your branch, then browse subjects and study materials"
        : "Semester-wise study materials and subjects",
      icon: "🎓",
      group: "semesters",
      meta: `Semester ${sem}`,
      href: isBranchSemester(sem)
        ? `/semester/${sem}/branch`
        : `/semester/${sem}`,
      keywords: [
        `semester ${sem}`,
        `sem${sem}`,
        `sem ${sem}`,
        `sem-${sem}`,
      ],
    });
  });

  // Student tools
  TOOLS.forEach((t) => {
    entries.push({
      id: `tool-${t.section}`,
      title: t.title,
      description: t.description,
      icon: t.icon,
      group: "tools",
      meta: "Student Tool",
      href: "/student-tools",
      toolSection: t.section,
      keywords: t.keywords,
    });
  });

  // Blogs
  allBlogs.forEach((b) => {
    entries.push({
      id: `blog-${b.slug}`,
      title: b.title,
      description: b.description,
      icon: "📰",
      group: "blogs",
      meta: `Blog • ${b.category}`,
      href: `/blog/${b.slug}`,
      keywords: [b.category, b.slug.replace(/-/g, " ")],
    });
  });

  // Articles
  generatedArticles.forEach((a) => {
    entries.push({
      id: `art-${a._id}`,
      title: a.title,
      description: articleExcerpt(a),
      icon: "📰",
      group: "blogs",
      meta: `Article${a.category ? ` • ${a.category}` : ""}`,
      href: `/articles/${a.slug?.current}`,
      keywords: [String(a.slug?.current || "").replace(/-/g, " ")],
    });
  });

  // Pages
  PAGES.forEach((p) => {
    entries.push({
      id: `page-${p.title}`,
      title: p.title,
      description: p.description,
      icon: p.icon,
      group: "pages",
      meta: "Page",
      href: p.href,
      keywords: p.keywords,
    });
  });

  return entries;
})();

/* ------------------- dynamic entries (jobs + materials) ------------------- */

export const CATEGORY_ICONS = {
  Notes: "📘",
  Assignments: "📝",
  Practicals: "🔧",
  "Lab Manual": "🧪",
  Syllabus: "📋",
  "Previous Year Papers": "📄",
  "Question Bank": "❓",
  "Important Questions": "⭐",
  MCQs: "✅",
  "MCQ": "✅",
  "Viva Questions": "🗣️",
};

// Find the branch (if any) that owns this subject in a semester.
const findBranchForSubject = (semester, subjectName) => {
  if (!isBranchSemester(semester)) return null;
  const branches = SUBJECTS_BY_SEMESTER[semester] || {};
  for (const slug of Object.keys(branches)) {
    if (
      branches[slug].some((s) => formatSubjectName(s) === subjectName)
    ) {
      return slug;
    }
  }
  return null;
};

/** Materials rows → search entries. */
export const buildMaterialEntries = (materials = []) =>
  materials
    .filter((m) => m?.subject || m?.unit_name)
    .map((m) => {
      const branchSlug = findBranchForSubject(m.semester, m.subject);
      const branch = BRANCHES.find((b) => b.slug === branchSlug);

      return {
        id: `mat-${m.id}`,
        title: m.unit_name || m.subject,
        description: `${m.category || m.note_type || "Study material"} for ${
          m.subject || "this subject"
        }`,
        icon: CATEGORY_ICONS[m.category] || "📚",
        group: "materials",
        meta: `Semester ${m.semester}${branch ? ` • ${branch.name}` : ""}${
          m.category ? ` • ${m.category}` : ""
        }`,
        href: branchSlug
          ? `/semester/${m.semester}/branch/${branchSlug}/${encodeURIComponent(
              m.category || "Notes",
            )}/${encodeURIComponent(m.subject)}`
          : `/semester/${m.semester}`,
        keywords: [
          m.subject,
          m.category,
          m.note_type,
          m.unit_name,
          `semester ${m.semester}`,
          branch?.shortName,
          branchSlug,
        ],
      };
    });

/** Jobs rows → search entries. */
export const buildJobEntries = (jobs = []) =>
  jobs
    .filter((j) => j?.title)
    .map((j) => ({
      id: `job-${j.id}`,
      title: j.title,
      description: j.company || "",
      icon: String(j.type || "").toLowerCase().includes("intern")
        ? "🎓"
        : "💼",
      group: "jobs",
      meta: [j.company, j.type, j.location].filter(Boolean).join(" • "),
      href: "/jobs",
      keywords: [
        j.company,
        j.location,
        j.type,
        j.badge,
        j.tag1,
        j.tag2,
        j.tag3,
        j.tag4,
        j.tag5,
        j.tag6,
      ],
    }));
