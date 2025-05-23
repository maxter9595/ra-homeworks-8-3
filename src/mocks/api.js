const users = {
  vasya: {
    id: '1',
    login: 'vasya',
    name: 'Vasya',
    password: 'password',
    avatar: 'https://i.pravatar.cc/40'
  }
};

const news = [
  {
    id: '1',
    title: 'First News',
    content: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
  },
  {
    id: '2',
    title: 'Second News',
    content: 'Another quick example text to build on the card title.'
  }
];

const tokens = new Map();

export const mockAuth = async ({ login, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users[login];
      if (!user || user.password !== password) {
        return reject(new Error('Invalid credentials'));
      }
      
      const token = Math.random().toString(36).substring(2);
      tokens.set(token, user);
      resolve({ token });
    }, 500);
  });
};

export const mockGetProfile = async (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = tokens.get(token);
      if (!user) {
        return reject({ response: { status: 401 } });
      }
      
      resolve({
        id: user.id,
        login: user.login,
        name: user.name,
        avatar: user.avatar
      });
    }, 300);
  });
};

export const mockGetNews = async (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!tokens.has(token)) {
        return reject({ response: { status: 401 } });
      }
      resolve([...news]);
    }, 400);
  });
};
