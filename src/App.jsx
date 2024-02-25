import { useState, useEffect } from "react";
import axios from "axios";
import SubredditInput from "./SubredditInput";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);

  const fetchSubredditPosts = async (subreddit) => {
    const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=10`;
    try {
      const response = await axios.get(url);
      setPosts(response.data.data.children.map((post) => post.data));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      setPosts([]);
    }
  };

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage on component mount
    const loadedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(loadedFavorites);
  }, []);

  const addToFavorites = (post) => {
    const newFavorites = [...favorites, post.id];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (postId) => {
    const newFavorites = favorites.filter(
      (favoriteId) => favoriteId !== postId
    );
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div>
      <SubredditInput onSubredditChange={fetchSubredditPosts} />
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            Score: {post.score}, Title: {post.title} -
            <a
              href={`https://www.reddit.com${post.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Comments
            </a>
            {favorites.includes(post.id) ? (
              <button disabled>Added to Favorites</button>
            ) : (
              <button onClick={() => addToFavorites(post)}>
                Add to Favorites
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="favorites-section">
        <h2>My Favorite Posts</h2>
        <ul className="favorites-list">
          {favorites.map((postId) => (
            <li key={postId}>
              Post ID: {postId}
              <button onClick={() => removeFromFavorites(postId)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
