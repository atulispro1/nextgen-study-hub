import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useAuth } from "../context/AuthContext";
import { confirmDelete } from "../utils/deleteConfirm";
import Swal from "sweetalert2";
import {
  canSubmitWithCooldown,
  clampRating,
  isAdminRole,
  normalizeTextInput,
} from "../utils/security";

// Shared query so the mount effect and refresh calls use one definition.
const fetchAllComments = async () => {
  const { data } = await supabase
    .from("notes_comments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);
  return data || [];
};

export default function CommentsSection() {
  const { role, profileReady } = useAuth() || {};
  const isAdmin = profileReady && isAdminRole(role);

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  // Tracks comments that currently have a like update in flight so a rapid
  // double-click cannot like the same comment twice (client-side race).
  const [likingIds, setLikingIds] = useState(() => new Set());

  // Read/write the anonymous commenter id inside a lazy state initializer so
  // storage access never runs during render (and never crashes the page when
  // storage is unavailable, e.g. private browsing mode).
  const [userId] = useState(() => {
    try {
      const existing = localStorage.getItem("commentUser");
      if (existing) return existing;

      const generated = Math.random().toString(36).substring(2);
      localStorage.setItem("commentUser", generated);
      return generated;
    } catch {
      return Math.random().toString(36).substring(2);
    }
  });

  const fetchComments = async () => {
    setComments(await fetchAllComments());
  };

  useEffect(() => {
    // Fetch on mount. setComments only runs after the promise resolves, so no
    // setState happens synchronously inside this effect.
    let ignore = false;
    fetchAllComments().then((data) => {
      if (!ignore) setComments(data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const submitComment = async () => {
    const safeName = normalizeTextInput(name, 60);
    const safeText = normalizeTextInput(text, 500);

    if (!safeName || !safeText) return;
    if (!canSubmitWithCooldown("notes_comments_cooldown", 15000)) {
      Swal.fire({
        icon: "info",
        title: "Slow down",
        text: "Please wait a few seconds before posting again.",
      });
      return;
    }
    if (submitting) return; // Prevent double-submit / duplicate comments

    setSubmitting(true);

    const { error } = await supabase.from("notes_comments").insert([
      {
        name: safeName,
        comment: safeText,
        rating: clampRating(rating),
        likes: 0,
        liked_by: [],
      },
    ]);

    setSubmitting(false);

    if (error) {
      console.error("Comment insert failed:", error);
      Swal.fire({
        icon: "error",
        title: "Post failed",
        text: "Failed to post your comment. Please try again.",
      });
      return;
    }

    setName("");
    setText("");
    setRating(5);

    fetchComments();
  };

  const likeComment = async (comment) => {
    if (comment.liked_by?.includes(userId)) return;
    if (likingIds.has(comment.id)) return; // like already in flight

    const updatedLikes = (comment.likes || 0) + 1;
    const updatedUsers = [...(comment.liked_by || []), userId];

    setLikingIds((prev) => new Set(prev).add(comment.id));

    try {
      const { error } = await supabase
        .from("notes_comments")
        .update({
          likes: updatedLikes,
          liked_by: updatedUsers,
        })
        .eq("id", comment.id);

      if (error) {
        console.error("Like update failed:", error);
      }
    } finally {
      setLikingIds((prev) => {
        const next = new Set(prev);
        next.delete(comment.id);
        return next;
      });
    }

    fetchComments();
  };

  const deleteComment = async (id) => {
    confirmDelete(async () => {
      await supabase.from("notes_comments").delete().eq("id", id);
      fetchComments();
    });
  };

  return (
    <section style={{ marginTop: "80px" }}>
      <div
        className="glass"
        style={{
          padding: "20px",
          textAlign: "center",
          margin: "70px 0 40px 0",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontWeight: "700",
            background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Student Feedback
        </h2>

        <p style={{ opacity: 0.7, marginTop: "6px", fontSize: "14px" }}>
          Share your thoughts about these notes and help other students.
        </p>
      </div>
      {/* COMMENT FORM */}

      <div
        className="glass"
        style={{
          padding: "30px",
          maxWidth: "650px",
          margin: "auto",
          marginBottom: "50px",
        }}
      >
        <h3 style={{ marginBottom: "20px" }}>Leave a Comment</h3>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "15px",
          }}
        />

        <textarea
          placeholder="Write your feedback..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            minHeight: "100px",
            marginBottom: "15px",
          }}
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          <option value="5">⭐ 5</option>
          <option value="4">⭐ 4</option>
          <option value="3">⭐ 3</option>
          <option value="2">⭐ 2</option>
          <option value="1">⭐ 1</option>
        </select>
        <br />

        <button
          className="btn-primary"
          onClick={submitComment}
          disabled={submitting}
        >
          Submit Comment
        </button>
      </div>

      {/* COMMENTS LIST */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
        }}
      >
        {comments.map((c) => (
          <div 
            key={c.id}
            className="glass"
            style={{
              padding: "22px",
              borderRadius: "14px",
            }}
            >
          
            {/* HEADER */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <h4 style={{ margin: 0 }}>{c.name}</h4>

              <span style={{ fontSize: "14px" }}>{"⭐".repeat(c.rating)}</span>
            </div>

            {/* COMMENT */}

            <p
              style={{
                fontSize: "14px",
                opacity: 0.9,
                marginBottom: "15px",
              }}
            >
              {c.comment}
            </p>

            {/* ACTIONS */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => likeComment(c)}
                style={{
                  background: "#6366f1",
                  border: "none",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                👍 {c.likes}
              </button>

              {isAdmin && (
                <button
                  onClick={() => deleteComment(c.id)}
                  style={{
                    background: "crimson",
                    border: "none",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
