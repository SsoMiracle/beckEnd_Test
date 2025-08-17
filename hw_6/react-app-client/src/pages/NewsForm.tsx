import { useState } from "react";
import { createNews } from "../api/newsApi";
import { useNavigate } from "react-router-dom";

const NewsForm = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      alert("Будь ласка, заповніть усі поля");
      return;
    }
    try {
      await createNews({ title, text, genre: "Other", isPrivate: false });
      navigate("/");
    } catch (err) {
      console.error("Error creating news:", err);
      alert("Помилка при створенні новини");
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
        />
        <textarea
          placeholder="Текст"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Створити</button>
      </form>
    </div>
  );
};

export default NewsForm;
