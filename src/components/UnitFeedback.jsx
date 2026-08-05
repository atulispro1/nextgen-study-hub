import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Heart, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import {
  canSubmitWithCooldown,
  clampRating,
  normalizeTextInput,
} from "../utils/security";
import Swal from "sweetalert2";


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

  const computeStats = useCallback((all) => {
    const likes = all.filter((f) => f.rating_type === "like").length;
    const hearts = all.filter((f) => f.rating_type === "heart").length;
    const unlikes = all.filter((f) => f.rating_type === "unlike").length;

    const starValues = all.map((f) => f.star_rating).filter((s) => s !== null);

    const avgStars =
      starValues.length > 0
        ? (starValues.reduce((a, b) => a + b, 0) / starValues.length).toFixed(1)
        : 0;

    return { likes, hearts, unlikes, avgStars };
  }, []);

  const applyFeedback = useCallback(
    (all) => {
      setFeedbacks(all);
      setStats(computeStats(all));
    },
    [computeStats],
  );

  const getFeedback = useCallback(async () => {
    const { data } = await supabase
      .from("unit_feedback")
      .select("*")
      .eq("subject_id", unitId)
      .order("created_at", { ascending: false });

    return data || [];
  }, [unitId]);

  // Fetch on mount / when the unit changes. setState runs inside .then so it
  // never triggers react-hooks/set-state-in-effect.
  useEffect(() => {
    let ignore = false;

    getFeedback().then((all) => {
      if (!ignore) applyFeedback(all);
    });

    return () => {
      ignore = true;
    };
  }, [getFeedback, applyFeedback]);

  const handleDeleteComment = async (commentId) => {
    await supabase.from("unit_feedback").delete().eq("id", commentId);

    applyFeedback(await getFeedback());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const safeName = normalizeTextInput(name, 60);
    const safeComment = normalizeTextInput(comment, 500);

    if (!safeName || !safeComment) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete form",
        text: "Please fill all fields.",
      });
      return;
    }
    if (!canSubmitWithCooldown(`unit_feedback_${unitId}`, 15000)) {
      Swal.fire({
        icon: "info",
        title: "Slow down",
        text: "Please wait a few seconds before posting again.",
      });
      return;
    }

    await supabase.from("unit_feedback").insert([
      {
        subject_id: unitId,
        name: safeName,
        comment: safeComment,
        rating_type: ratingType,
        star_rating: clampRating(starRating, 0, 5),
      },
    ]);

    setName("");
    setComment("");
    setRatingType(null);
    setStarRating(0);

    applyFeedback(await getFeedback());
  };

  return (
    <div
      className="glass"
      style={{
        padding: "30px",
        marginTop: "60px",
        maxWidth: "900px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
        💬 Student Discussion
      </h2>

      <p
        style={{
          opacity: 0.7,
          marginBottom: "25px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        Ask doubts, share feedback, or help other students.
      </p>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "20px",
          fontSize: "14px",
        }}
      >
        <span>
          ⭐ Avg Rating: <strong>{stats.avgStars}</strong>
        </span>
        <span>👍 {stats.likes}</span>
        <span>❤️ {stats.hearts}</span>
        <span>👎 {stats.unlikes}</span>
      </div>

      {/* Star Rating */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "10px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <div className="fade-in"
            key={star}
      
            style={{ cursor: "pointer" }}
            onClick={() => setStarRating(star)}
            >
          
            <Star
              size={20}
              color={star <= starRating ? "#facc15" : "gray"}
              fill={star <= starRating ? "#facc15" : "none"}
            />
          </div>
        ))}
      </div>

      {/* Reaction Buttons */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
        <div className="fade-in"> 
          <Heart
            color={ratingType === "heart" ? "red" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => setRatingType("heart")}
          />
        </div>

        <div className="fade-in">
          <ThumbsUp
            color={ratingType === "like" ? "green" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => setRatingType("like")}
          />
        </div>

        <div className="fade-in">
          <ThumbsDown
            color={ratingType === "unlike" ? "crimson" : "gray"}
            style={{ cursor: "pointer" }}
            onClick={() => setRatingType("unlike")}
          />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "12px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />

        <button className="btn-primary">Submit</button>
      </form>

      {/* Comments */}
      <h4 style={{ marginTop: "30px", marginBottom: "15px" }}>
        Student Comments
      </h4>
      <div style={{ marginTop: "20px" }}>
        {feedbacks.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "14px",
              borderRadius: "10px",
              marginBottom: "12px",
              background: "rgba(255,255,255,0.04)",
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
            <p
              style={{
                marginTop: "6px",
                opacity: 0.85,
                lineHeight: "1.6",
                fontSize: "14px",
              }}
            >
              {item.comment}
            </p>
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
