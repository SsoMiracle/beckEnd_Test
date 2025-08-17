import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNews } from "../api/newsApi";

const NewsForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNews({ title, text, genre: "Other", isPrivate: false });
      navigate("/");
    } catch (err) {
      console.error("Error creating news:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Додати новину</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Текст новини"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default NewsForm;
