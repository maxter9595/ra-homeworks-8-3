import Layout from './components/Layout';
import AuthForm from './components/AuthForm';
import NewsFeed from './components/NewsFeed';
import useAuth from './hooks/useAuth';

function App() {
  const { token, user, login, logout, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Layout>
      {!token ? (
        <AuthForm onLogin={login} />
      ) : (
        <NewsFeed token={token} onLogout={logout} user={user} />
      )}
    </Layout>
  );
}

export default App;