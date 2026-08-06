import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [loadingDynamic, setLoadingDynamic] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const fetchedRef = useRef(false);
  const mountedRef = useRef(true);

  const [rect, setRect] = useState(null);

  // True while the dropdown should be visible (typed query or pending results).
  // Declared before the scroll-anchor effect below so it is never in the
  // temporal dead zone when that effect's dependency array is evaluated.
  const isOpen = Boolean(query.trim() || results);

  // Track unmount so an in-flight fetch never sets state afterwards.
  useEffect(() => () => { mountedRef.current = false; }, []);

  // The dropdown is rendered as a fixed-position portal anchored to the input,
  // so it can never be clipped by the hero's overflow:hidden and always floats
  // above the fixed navbar. The anchor refreshes while the dropdown is open.
  const refreshRect = useCallback(() => {
    const r = inputRef.current?.getBoundingClientRect();
    if (r) {
      setRect({
        top: Math.max(8, r.bottom + 10),
        left: r.left,
        width: r.width,
      });
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onMove = () => refreshRect();
    window.addEventListener("scroll", onMove, { passive: true });
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove);
      window.removeEventListener("resize", onMove);
    };
  }, [isOpen, refreshRect]);

  /* -------- lazy Supabase fetch (once per session, on first focus) --------
     Static content answers instantly. Jobs and uploaded study materials are
     fetched only when the student actually interacts with the search, so the
     homepage makes zero extra network requests until search is used. */
  const ensureDynamicData = () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setLoadingDynamic(true);

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
      if (cancelled || !mountedRef.current) return;
      setJobs(j);
      setMaterials(m);
      setLoadingDynamic(false);
    });
  };

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
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target) &&
        !(dropdownRef.current && dropdownRef.current.contains(e.target))
      ) {
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
          onChange={(e) => {
            setQuery(e.target.value);
            refreshRect();
          }}
          onFocus={(e) => {
            ensureDynamicData();
            refreshRect();
            if (e.target.value.trim()) setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          aria-label="Search the entire website"
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
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

      {isOpen &&
        createPortal(
        <div
          ref={dropdownRef}
          className="global-search-dropdown"
          style={{
            "--gs-top": rect ? `${rect.top}px` : undefined,
            "--gs-left": rect ? `${rect.left}px` : undefined,
            "--gs-width": rect ? `${rect.width}px` : undefined,
          }}
        >
          {!results && (
            <p className="gs-hint">
              {loadingDynamic ? "Loading latest resources…" : "Searching…"}
            </p>
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
        </div>,
        document.body,
      )}
    </div>
  );
}
