import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { confirmDelete } from "../utils/deleteConfirm";

export default function CommentsSection() {
  const { role } = useAuth() || {};
  const isAdmin = role === "owner" || role === "faculty";

  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const userId =
    localStorage.getItem("commentUser") ||
    Math.random().toString(36).substring(2);

  localStorage.setItem("commentUser", userId);

  const fetchComments = async () => {
    const { data } = await supabase
      .from("notes_comments")
      .select("*")
      .order("created_at", { ascending: false });

    setComments(data || []);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const submitComment = async () => {
    if (!name || !text) return;

    await supabase.from("notes_comments").insert([
      {
        name,
        comment: text,
        rating,
        likes: 0,
        liked_by: [],
      },
    ]);

    setName("");
    setText("");
    setRating(5);

    fetchComments();
  };

  const likeComment = async (comment) => {
    if (comment.liked_by?.includes(userId)) return;

    const updatedLikes = (comment.likes || 0) + 1;

    const updatedUsers = [...(comment.liked_by || []), userId];

    await supabase
      .from("notes_comments")
      .update({
        likes: updatedLikes,
        liked_by: updatedUsers,
      })
      .eq("id", comment.id);

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

        <button className="btn-primary" onClick={submitComment}>
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
          <motion.div
            key={c.id}
            whileHover={{ y: -4 }}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
