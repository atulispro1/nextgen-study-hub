import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Heart, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function UnitFeedback({ unitId, isAdmin }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [ratingType, setRatingType] = useState(null);
  const [starRating, setStarRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({
    likes: 0,
    hearts: 0,
    unlikes: 0,
    avgStars: 0,
  });

  const fetchFeedback = async () => {
    const { data } = await supabase
      .from("unit_feedback")
      .select("*")
      .eq("unit_id", unitId)
      .order("created_at", { ascending: false });

    const all = data || [];
    setFeedbacks(all);

    // Calculate stats
    const likes = all.filter((f) => f.rating_type === "like").length;
    const hearts = all.filter((f) => f.rating_type === "heart").length;
    const unlikes = all.filter((f) => f.rating_type === "unlike").length;

    const starValues = all.map((f) => f.star_rating).filter((s) => s !== null);

    const avgStars =
      starValues.length > 0
        ? (starValues.reduce((a, b) => a + b, 0) / starValues.length).toFixed(1)
        : 0;

    setStats({ likes, hearts, unlikes, avgStars });
  };

  useEffect(() => {
    fetchFeedback();
  }, [unitId]);

  const handleDeleteComment = async (commentId) => {
    await supabase.from("unit_feedback").delete().eq("id", commentId);

    fetchFeedback();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !comment) {
      alert("Please fill all fields");
      return;
    }

    await supabase.from("unit_feedback").insert([
      {
        unit_id: unitId,
        name,
        comment,
        rating_type: ratingType,
        star_rating: starRating,
      },
    ]);

    setName("");
    setComment("");
    setRatingType(null);
    setStarRating(0);

    fetchFeedback();
  };

  return (
    <div className="glass" style={{ padding: "25px", marginTop: "25px" }}>
      <h4 style={{ marginBottom: "15px" }}>Rate & Comment</h4>

      {/* Stats */}
      <div style={{ marginBottom: "15px", fontSize: "14px" }}>
        ⭐ Avg Rating: <strong>{stats.avgStars}</strong> | 👍 {stats.likes} | ❤️{" "}
        {stats.hearts} | 👎 {stats.unlikes}
      </div>

      {/* Star Rating */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            whileTap={{ scale: 1.4 }}
            style={{ cursor: "pointer" }}
            onClick={() => setStarRating(star)}
          >
            <Star
              size={20}
              color={star <= starRating ? "#facc15" : "gray"}
              fill={star <= starRating ? "#facc15" : "none"}
            />
          </motion.div>
        ))}
      </div>

      {/* Reaction Buttons */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
        <motion.div whileTap={{ scale: 1.3 }}>
          <Heart
            color={ratingType === "heart" ? "red" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => setRatingType("heart")}
          />
        </motion.div>

        <motion.div whileTap={{ scale: 1.3 }}>
          <ThumbsUp
            color={ratingType === "like" ? "green" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => setRatingType("like")}
          />
        </motion.div>

        <motion.div whileTap={{ scale: 1.3 }}>
          <ThumbsDown
            color={ratingType === "unlike" ? "crimson" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => setRatingType("unlike")}
          />
        </motion.div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button className="btn-primary">Submit</button>
      </form>

      {/* Comments */}
      <div style={{ marginTop: "20px" }}>
        {feedbacks.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "12px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              position: "relative",
            }}
          >
            <strong>{item.name}</strong> {item.rating_type === "heart" && "❤️"}
            {item.rating_type === "like" && "👍"}
            {item.rating_type === "unlike" && "👎"}
            {item.star_rating && (
              <span style={{ marginLeft: "6px" }}>
                {"⭐".repeat(item.star_rating)}
              </span>
            )}
            <p style={{ marginTop: "5px", opacity: 0.8 }}>{item.comment}</p>
            {/* 🔐 ADMIN DELETE BUTTON */}
            {isAdmin && (
              <button
                onClick={() => handleDeleteComment(item.id)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "crimson",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
