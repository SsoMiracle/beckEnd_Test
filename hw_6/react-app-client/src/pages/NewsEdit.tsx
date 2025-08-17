import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, updateNews } from "../api/newsApi";

const NewsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getNewsById(id)
      .then((res) => {
        const data = res.data;
        setTitle(data.title || "");
        setText(data.text || "");
      })
      .catch((err) => {
        console.error("Ошибка загрузки новости:", err);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }
    try {
      await updateNews(String(id), {
        title,
        text,
        genre: "Other",
        isPrivate: false,
      });
      navigate(`/news/${id}`);
    } catch (err) {
      console.error("Error updating:", err);
      alert("Не вдалося зберегти зміни.");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Завантаження...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Редагувати новину</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          maxWidth: 600,
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок"
          required
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Текст"
          rows={8}
          required
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Зберегти</button>
          <button type="button" onClick={() => navigate(-1)}>
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsEdit;
