import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData instance and append the credentials
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('https://script.google.com/macros/s/AKfycbzxc6iyZ-OnFdDehGan4hpseNnH29oJfUIZLJBr3ISLqczkRFnPCFtesHokMijkxMLbsA/exec', {
        method: 'POST',
        body: formData, // send the form data directly
      });

      const data = await response.json();
      if (data.success) {
        onLoginSuccess();
      } else {
        setErrorMessage(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
