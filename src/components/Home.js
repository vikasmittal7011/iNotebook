import { useNavigate } from "react-router-dom";
import Notes from "./Notes";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container">
      <Notes />
    </div>
  );
}

export default Home;
