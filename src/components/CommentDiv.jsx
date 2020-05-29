import React, { useContext, useEffect } from "react";
import CommentBox from "./CommentBox";
import Context from "./Context";
import Comments from "./Comments";

function CommentDiv() {
  const ctx = useContext(Context);

  const getComments = () => {
    fetch("/api/comments", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) =>
        ctx.dispatch({ type: "setCommentList", payload: data.comments })
      );
  };

  useEffect(() => {
    getComments();
    const interval = setInterval(() => getComments(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <React.Fragment>
      <h1>Comment Box</h1>
      <div id="comment-div">
        <CommentBox />
        <div id="comment-list">
          {ctx.commentList.length !== 0 ? (
            ctx.commentList.map((comment, index) => (
              <Comments key={comment._id} comment={comment} index={index} />
            ))
          ) : (
            <h2>No comments yet.Please write one...</h2>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export default CommentDiv;
