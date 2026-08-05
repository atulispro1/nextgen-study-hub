import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { supabase } from "../supabase";
import {
  STATIC_INDEX,
  GROUP_ORDER,
  GROUP_LABELS,
  GROUP_ICONS,
  searchEntries,
  buildMaterialEntries,
  buildJobEntries,
} from "../data/searchIndex";

const MAX_PER_GROUP = 6;
const MAX_TOTAL = 28;

/**
 * GlobalSearch — live site-wide search with a grouped results dropdown.
 * Static content is indexed locally (instant, zero network). Jobs and
 * uploaded study materials are fetched from Supabase once, lazily, the first
 * time the user focuses the input, then cached in memory for the session.
 */
export default function GlobalSearch() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null); // grouped: { group: [entries] }
  const [jobs, setJobs] = useState(null); // null = not fetched yet
  const [materials, setMaterials] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const fetchedRef = useRef(false);

  /* -------- lazy Supabase fetch (once per session) -------- */
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    let cancelled = false;

    const loadJobs = supabase
      .from("jobs")
      .select("*")
      .limit(100)
      .then(({ data }) => (cancelled ? null : data || []))
      .catch(() => (cancelled ? null : []));

    const loadMaterials = supabase
      .from("materials")
      .select("*")
      .limit(200)
      .then(({ data }) => (cancelled ? null : data || []))
      .catch(() => (cancelled ? null : []));

    Promise.all([loadJobs, loadMaterials]).then(([j, m]) => {
      if (cancelled) return;
      setJobs(j);
      setMaterials(m);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* -------- full entry list (static + fetched) -------- */
  const allEntries = useMemo(() => {
    const dynamic = [
      ...buildMaterialEntries(materials),
      ...buildJobEntries(jobs),
    ];
    return [...STATIC_INDEX, ...dynamic];
  }, [materials, jobs]);

  /* -------- debounced search --------
     Clears results via a ref-guarded timeout so no setState runs
     synchronously inside the effect body (keeps the lint happy and avoids
     cascading renders when the query is cleared). */
  useEffect(() => {
    const q = query.trim();
    const timer = setTimeout(() => {
      if (!q) {
        setResults(null);
        setActiveIndex(-1);
        return;
      }

      const flat = searchEntries(allEntries, q);

      // Group while preserving order + cap per group / total.
      const grouped = {};
      let total = 0;
      for (const entry of flat) {
        if (total >= MAX_TOTAL) break;
        if (!grouped[entry.group]) grouped[entry.group] = [];
        if (grouped[entry.group].length >= MAX_PER_GROUP) continue;
        grouped[entry.group].push(entry);
        total++;
      }

      setResults(grouped);
      setActiveIndex(-1);
    }, 250);

    return () => clearTimeout(timer);
  }, [query, allEntries]);

  /* -------- click outside closes -------- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setQuery("");
        setResults(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------- flat list for keyboard navigation -------- */
  const flatResults = useMemo(() => {
    if (!results) return [];
    return GROUP_ORDER.flatMap((g) => results[g] || []);
  }, [results]);

  const goTo = (entry) => {
    setQuery("");
    setResults(null);
    setActiveIndex(-1);

    if (entry.toolSection) {
      navigate("/student-tools");
      setTimeout(() => {
        document
          .getElementById(entry.toolSection)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 250);
    } else if (entry.href) {
      navigate(entry.href);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setQuery("");
      setResults(null);
      inputRef.current?.blur();
      return;
    }

    if (!results || flatResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % flatResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex(
        (i) => (i - 1 + flatResults.length) % flatResults.length,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = flatResults[activeIndex] || flatResults[0];
      if (entry) goTo(entry);
    }
  };

  const hasResults = results && Object.keys(results).length > 0;

  return (
    <div className="global-search" ref={wrapperRef}>
      <div className="global-search-input-wrap">
        <Search size={20} className="global-search-icon" aria-hidden="true" />

        <input
          ref={inputRef}
          className="global-search-input"
          type="text"
          placeholder="Search notes, subjects, semesters, blogs, tools, jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={(e) => {
            if (e.target.value.trim()) setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Search the entire website"
          autoComplete="off"
          role="combobox"
          aria-expanded={Boolean(hasResults)}
        />

        {query && (
          <button
            className="global-search-clear"
            onClick={() => {
              setQuery("");
              setResults(null);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {(results || query.trim()) && (
        <div className="global-search-dropdown">
          {!results && (
            <p className="gs-hint">Searching…</p>
          )}

          {hasResults ? (
            <>
              <div className="gs-scroll">
                {GROUP_ORDER.map((group) => {
                  const items = results[group];
                  if (!items || items.length === 0) return null;

                  const startIndex = GROUP_ORDER
                    .slice(0, GROUP_ORDER.indexOf(group))
                    .reduce((acc, g) => acc + (results[g]?.length || 0), 0);

                  return (
                    <div className="gs-group" key={group}>
                      <p className="gs-group-title">
                        {GROUP_ICONS[group]} {GROUP_LABELS[group]}
                      </p>

                      {items.map((entry, i) => {
                        const flatIdx = startIndex + i;
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            className={`gs-result${
                              flatIdx === activeIndex ? " gs-result--active" : ""
                            }`}
                            onMouseEnter={() => setActiveIndex(flatIdx)}
                            onClick={() => goTo(entry)}
                          >
                            <span className="gs-result-icon" aria-hidden="true">
                              {entry.icon}
                            </span>
                            <span className="gs-result-body">
                              <span className="gs-result-title">
                                {entry.title}
                              </span>
                              {entry.meta && (
                                <span className="gs-result-meta">
                                  {entry.meta}
                                </span>
                              )}
                              {entry.description && (
                                <span className="gs-result-desc">
                                  {entry.description}
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <p className="gs-footer">
                ↑↓ to navigate · Enter to open · Esc to close
              </p>
            </>
          ) : (
            <p className="gs-empty">
              <span className="gs-empty-icon">🔍</span>
              No results found. Try another keyword.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
