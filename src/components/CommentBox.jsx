import React, { useContext } from "react";
import Context from "./Context";

function CommentBox() {
  const ctx = useContext(Context);
  const postComment = (e) => {
    e.preventDefault();
    fetch("/api/postComment", {
      method: "Post",
      body: JSON.stringify(ctx.commentBoxData),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Save Unsuccessful");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        ctx.dispatch({ type: "addComment", payload: data.value });
        document.getElementById(
          "comment-list"
        ).scrollTop = document.getElementById("comment-list").scrollHeight;
      })
      .catch((err) => alert(err));
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    ctx.dispatch({ type: "setCommentBoxData", payload: { [name]: value } });
  };

  return (
    <form onSubmit={postComment} id="comment-box" onChange={handleChange}>
      <input type="text" name="name" placeholder="Type your name here..." />
      <textarea
        name="value"
        cols="30"
        rows="10"
        placeholder="Type your comment here..."
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default CommentBox;
