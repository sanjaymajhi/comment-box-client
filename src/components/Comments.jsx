import React from "react";

function Comments(props) {
  const upvote = (e) => {
    const target = e.target;
    const total = Number(target.childNodes[0].textContent);
    fetch("/api/" + props.comment._id + "/upvote", {
      method: "put",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("server error");
        }
      })
      .then(() => (target.childNodes[0].textContent = total + 1))
      .catch((err) => alert(err));
  };

  const downvote = (e) => {
    const target = e.target;
    const total = Number(target.childNodes[0].textContent);
    fetch("/api/" + props.comment._id + "/downvote", { method: "put" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("server error");
        }
      })
      .then(() => (target.childNodes[0].textContent = total + 1))
      .catch((err) => alert(err));
  };

  return (
    <div id="comment-single">
      <div>
        <strong>{props.index + 1}.</strong>
      </div>
      <div>
        <strong>{props.comment.name}</strong>
        <br />
        <span id="small-font">{props.comment.value}</span>
      </div>
      <div>
        <strong onClick={upvote}>
          <i className="material-icons" style={{ color: "green" }}>
            thumb_up
          </i>
          &emsp;<span id="small-font">{props.comment.upvotes} upvotes</span>
        </strong>
        <br />
        <strong onClick={downvote}>
          <i className="material-icons" style={{ color: "red" }}>
            thumb_down
          </i>
          &emsp;<span id="small-font">{props.comment.downvotes} downvotes</span>
        </strong>
      </div>
    </div>
  );
}

export default Comments;
