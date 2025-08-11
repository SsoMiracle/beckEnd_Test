import { useEffect, useState } from 'react';
import { getAllNews } from '../api/newsApi';
import { useNavigate } from 'react-router-dom';
import NewsCard from '../components/NewsCard';

interface NewsItem {
  id: string;
  title: string;
  text: string;
}

const Home = () => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllNews()
      .then((res) => setNewsList(res.data))
      .catch((err) => console.error('Error news launch:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Новини</h1>
      <button onClick={() => navigate('/create')}>➕ Додати новину</button>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {newsList.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
