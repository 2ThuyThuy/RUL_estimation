import React from "react";
const DataItems = Array.from({ length: 55 }, (n, index) => {
  return {
    id: index,
    post: `Post ${index}`,
  };
});
const Test = () => {
  const [scroller, initScroller] = React.useState(0);
  const handleScroll = (event) => {
    const height = event.currentTarget.clientHeight;
    const barHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;
    initScroller(((scrollTop + height) / barHeight) * 100);
  };
  return (
    <>
      <div style={styles.progressBar}>
        <div style={{ ...styles.scrolled, width: `${scroller}%` }}></div>
      </div>
      <p className="centeredItem">
        <strong style={styles.text}>{scroller.toFixed(2)}%</strong>
      </p>
      <div style={styles.postBlock} onScroll={handleScroll}>
        <div style={styles.post}>
          {DataItems.map((post) => (
            <div style={styles.post} key={post.id}>
              {post.post}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
const styles = {
  postBlock: {
    width: 555,
    height: 410,
    margin: "0 auto",
    // overflowY: "auto",
    background: "rgb(202 216 255)",
    overflowX: "hidden",
  },
  post: {
    color: "#fff",
    fontSize: "22px",
    textAlign: "center",
    margin: "12px 20px",
    padding: "28px 28px",
    background: "#3f51b5",
    borderBottom: "1px solid white",
  },
  progressBar: {
    width: 555,
    height: 32,
    margin: "auto",
    backgroundColor: "#eeeeee",
  },
  scrolled: {
    height: "100%",
    backgroundColor: "#ffc107",
  },
  centeredItem: {
    textAlign: "center",
  },
};
export default Test;
