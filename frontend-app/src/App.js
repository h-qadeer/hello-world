import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:6700/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
	  <h1>Hello, Connecte to database</h1>
      <h3>{message}</h3>
    </div>
  );
}

export default App;
