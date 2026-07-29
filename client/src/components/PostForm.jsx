import { useState } from "react";

function PostForm({ onPostCreated })  {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !message.trim()) {
      setError("Please enter your name and message.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            message: message.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create post"
        );
      }
      onPostCreated(result.data);

        //setMessage("");
      // Socket.IO will update all connected clients
      setMessage("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="composer-card">
      <div className="section-label">
        CREATE A NOTE
      </div>

      <h2>Share something with everyone.</h2>

      <p className="composer-description">
        Leave a thought, idea, announcement, or message
        for the community.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your name</label>

          <input
            type="text"
            placeholder="e.g. Mudit"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label>Your message</label>

          <textarea
            placeholder="What's on your mind?"
            value={message}
            onChange={(event) =>
              setMessage(event.target.value)
            }
            maxLength={500}
            rows={4}
          />
        </div>

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="form-footer">
          <span>{message.length}/500</span>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Publishing..."
              : "Publish Note →"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostForm;