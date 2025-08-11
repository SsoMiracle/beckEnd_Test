import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById, deleteNews } from "../api/newsApi";

interface NewsItem {
  id: number | string;
  title: string;
  text: string;
  createDate?: string | Date;
}

const NewsView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getNewsById(id)
      .then((res) => {
        setNews(res.data);
      })
      .catch((err) => {
        console.error("Помилка при загрузці:", err);
        navigate("/"); 
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Ви впевнені, що хочете видалити цю новину?")) return;
    try {
      await deleteNews(id);
      navigate("/");
    } catch (err) {
      console.error("Помилка при видаленні:", err);
      alert("Не вдалося видалити новину.");
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Завантаження...</div>;
  if (!news) return <div style={{ padding: 20 }}>Новина не знайдена</div>;

  const dateStr = news.createDate ? new Date(news.createDate).toLocaleString() : "";

  return (
    <div style={{ padding: "2rem", maxWidth: 800 }}>
      <h1>{news.title}</h1>
      <div style={{ color: "#666", marginBottom: 12 }}>{dateStr}</div>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{news.text}</p>

      <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
        <button onClick={() => navigate(`/edit/${id}`)}>Редагувати</button>
        <button onClick={handleDelete} style={{ background: "#e55353", color: "#fff" }}>
          Видалити
        </button>
        <button onClick={() => navigate("/")}>⬅ Повернутися</button>
      </div>
    </div>
  );
};

export default NewsView;
