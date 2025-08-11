import { useNavigate } from "react-router-dom";
import "./NewsCard.css";

interface Props {
  item: {
    id: string;
    title: string;
    text: string;
  };
}

const NewsCard = ({ item }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="news-card" onClick={() => navigate(`/news/${item.id}`)}>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </div>
  );
};

export default NewsCard;
