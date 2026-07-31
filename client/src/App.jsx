// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import Header from "./components/Header";
// import PostForm from "./components/PostForm";
// import PostCard from "./components/PostCard";
// import "./App.css";

// const API_URL = "http://localhost:5000/api/posts";

// const socket = io("http://localhost:5000");

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ==========================================
//   // SOCKET.IO REAL-TIME UPDATES
//   // ==========================================
//   useEffect(() => {
//     // Receive newly created posts from OTHER users
//     const handlePostCreated = (newPost) => {
//       setPosts((currentPosts) => {
//         const alreadyExists = currentPosts.some(
//           (post) => post._id === newPost._id
//         );

//         if (alreadyExists) {
//           return currentPosts;
//         }

//         return [newPost, ...currentPosts];
//       });
//     };

//     // Receive deleted posts from OTHER users
//     const handlePostDeleted = (postId) => {
//       setPosts((currentPosts) =>
//         currentPosts.filter(
//           (post) => post._id !== postId
//         )
//       );
//     };

//     socket.on(
//       "post-created",
//       handlePostCreated
//     );

//     socket.on(
//       "post-deleted",
//       handlePostDeleted
//     );

//     return () => {
//       socket.off(
//         "post-created",
//         handlePostCreated
//       );

//       socket.off(
//         "post-deleted",
//         handlePostDeleted
//       );
//     };
//   }, []);

//   // ==========================================
//   // FETCH POSTS FROM DATABASE
//   // ==========================================
//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       setLoading(true);

//       const response = await fetch(API_URL);

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.message ||
//             "Failed to fetch posts"
//         );
//       }

//       setPosts(result.data);
//       setError("");
//     } catch (error) {
//       console.error(
//         "Fetch posts error:",
//         error
//       );

//       setError(
//         "Unable to load posts. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // CREATE POST
//   // ==========================================
//   const handlePostCreated = (newPost) => {
//     setPosts((currentPosts) => {
//       const alreadyExists = currentPosts.some(
//         (post) => post._id === newPost._id
//       );

//       if (alreadyExists) {
//         return currentPosts;
//       }

//       return [newPost, ...currentPosts];
//     });
//   };

//   // ==========================================
//   // DELETE POST
//   // ==========================================
//   const handleDelete = async (postId) => {
//     try {
//       const response = await fetch(
//         `${API_URL}/${postId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.message ||
//             "Failed to delete post"
//         );
//       }

//       // Immediately remove from current browser
//       setPosts((currentPosts) =>
//         currentPosts.filter(
//           (post) => post._id !== postId
//         )
//       );

//       // Socket.IO will remove it
//       // from other connected browsers
//     } catch (error) {
//       console.error(
//         "Delete post error:",
//         error
//       );

//       alert(
//         "Unable to delete this post."
//       );
//     }
//   };

//   // ==========================================
//   // UI
//   // ==========================================
//   return (
//     <div className="app">
//       <Header />

//       <main className="main-content">

//         {/* HERO */}
//         <div className="hero">
//           <span className="eyebrow">
//             A SPACE FOR EVERYONE
//           </span>

//           <h2>
//             Ideas are better
//             <br />
//             <em>when shared.</em>
//           </h2>

//           <p>
//             A simple collaborative board
//             where teams, communities, and
//             friends can share thoughts
//             in real time.
//           </p>
//         </div>

//         {/* CREATE POST */}
//         <PostForm
//           onPostCreated={
//             handlePostCreated
//           }
//         />

//         {/* COMMUNITY BOARD */}
//         <section className="board-section">

//           <div className="board-heading">
//             <div>
//               <div className="section-label">
//                 THE COMMUNITY BOARD
//               </div>

//               <h2>
//                 Latest notes
//               </h2>
//             </div>

//             <span className="post-count">
//               {posts.length}{" "}
//               {posts.length === 1
//                 ? "note"
//                 : "notes"}
//             </span>
//           </div>

//           {/* LOADING */}
//           {loading && (
//             <div className="state-message">
//               Loading your community...
//             </div>
//           )}

//           {/* ERROR */}
//           {!loading && error && (
//             <div className="state-message error-message">
//               {error}
//             </div>
//           )}

//           {/* EMPTY */}
//           {!loading &&
//             !error &&
//             posts.length === 0 && (
//               <div className="empty-state">
//                 <div className="empty-icon">
//                   ✦
//                 </div>

//                 <h3>
//                   The board is waiting
//                   for you.
//                 </h3>

//                 <p>
//                   Be the first person
//                   to share something
//                   with the community.
//                 </p>
//               </div>
//             )}

//           {/* POSTS */}
//           {!loading &&
//             !error &&
//             posts.length > 0 && (
//               <div className="posts-list">
//                 {posts.map((post) => (
//                   <PostCard
//                     key={post._id}
//                     post={post}
//                     onDelete={
//                       handleDelete
//                     }
//                   />
//                 ))}
//               </div>
//             )}

//         </section>
//       </main>

//       {/* FOOTER */}
//       <footer className="footer">
//         <span>
//           COLLABBOARD
//         </span>

//         <span>
//           Built for collaboration.
//         </span>
//       </footer>
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Header from "./components/Header";
import PostForm from "./components/PostForm";
import PostCard from "./components/PostCard";
import "./App.css";

// Use env variable if set (local dev), otherwise fall back to relative path (production - same domain)
const BASE_URL = import.meta.env.VITE_API_URL || "";
const API_URL = `${BASE_URL}/api/posts`;
const socket = io(BASE_URL || undefined);

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const handlePostCreated = (newPost) => {
      setPosts((currentPosts) => {
        if (currentPosts.some((post) => post._id === newPost._id)) {
          return currentPosts;
        }
        return [newPost, ...currentPosts];
      });
    };

    const handlePostDeleted = (postId) => {
      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId)
      );
    };

    socket.on("post-created", handlePostCreated);
    socket.on("post-deleted", handlePostDeleted);

    return () => {
      socket.off("post-created", handlePostCreated);
      socket.off("post-deleted", handlePostDeleted);
    };
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch posts");
      }

      setPosts(result.data);
      setError("");
    } catch (error) {
      console.error("Fetch posts error:", error);
      setError("Unable to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts((currentPosts) => {
      if (currentPosts.some((post) => post._id === newPost._id)) {
        return currentPosts;
      }
      return [newPost, ...currentPosts];
    });
  };

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete post");
      }

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Delete post error:", error);
      alert("Unable to delete this post.");
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="hero">
          <span className="eyebrow">A SPACE FOR EVERYONE</span>

          <h2>
            Ideas are better
            <br />
            <em>when shared.</em>
          </h2>

          <p>
            A simple collaborative board where teams, communities, and friends
            can share thoughts in real time.
          </p>
        </div>

        <PostForm onPostCreated={handlePostCreated} />

        <section className="board-section">
          <div className="board-heading">
            <div>
              <div className="section-label">THE COMMUNITY BOARD</div>
              <h2>Latest notes</h2>
            </div>

            <span className="post-count">
              {posts.length} {posts.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {loading && (
            <div className="state-message">
              Loading your community...
            </div>
          )}

          {!loading && error && (
            <div className="state-message error-message">
              {error}
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">✦</div>
              <h3>The board is waiting for you.</h3>
              <p>
                Be the first person to share something with the community.
              </p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="posts-list">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <span>COLLABBOARD</span>
        <span>Built for collaboration.</span>
      </footer>
    </div>
  );
}

export default App;