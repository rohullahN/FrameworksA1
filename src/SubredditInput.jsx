import { useState } from "react";
import PropTypes from "prop-types";
import "./SubredditInput.css";

const SubredditInput = ({ onSubredditChange }) => {
  const [subreddit, setSubreddit] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubredditChange(subreddit);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          placeholder="Enter subreddit name"
        />
        <button type="submit">Load Posts</button>
      </form>
    </div>
  );
};
SubredditInput.propTypes = {
  onSubredditChange: PropTypes.func.isRequired,
};

export default SubredditInput;
