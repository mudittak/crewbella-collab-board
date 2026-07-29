function PostCard({ post, onDelete }) {
  const formattedDate = new Date(post.createdAt).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className="post-card">
      <div className="post-header">
        <div className="author-info">
          <div className="avatar">
            {post.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3>{post.name}</h3>
            <span>{formattedDate}</span>
          </div>
        </div>

        <button
          className="delete-button"
          onClick={() => onDelete(post._id)}
          title="Delete post"
        >
          ×
        </button>
      </div>

      <p className="post-message">{post.message}</p>
    </article>
  );
}

export default PostCard;