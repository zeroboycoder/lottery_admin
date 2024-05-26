import "./loading.css";

const Loading = () => (
  <div
    className="w-full flex justify-center items-center"
    style={{ height: "calc(100vh - 100px)" }}
  >
    <span className="loader"></span>
  </div>
);

export default Loading;
