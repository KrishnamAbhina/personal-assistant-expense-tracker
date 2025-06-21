import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode'; // ✅ CORRECT

import bg from './img/bg.png';
import { MainLayout } from './styles/layouts';
import Orb from './components/orb/orb';
import Navigation from './components/navigation/navigation';
import Dashboard from './components/dashboard/dashboard';
import Income from './components/income/income';
import Expenses from './components/expenses/expenses';
import LoginPage from './components/login/LoginPage';
import RegisterPage from './components/login/RegisterPage';
import ViewTransactions from './components/viewtransactions';

function App() {
  const [active, setActive] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ Correct usage
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token); // ✅ Correct usage
    setUser(decoded);
    setIsAuthenticated(true);
    setActive(1);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <ViewTransactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => <Orb />, []);

  if (!isAuthenticated) {
    return (
      <AppStyled bg={bg} className="App">
        {orbMemo}
        {isRegistering ? (
          <RegisterPage onSwitch={() => setIsRegistering(false)} />
        ) : (
          <LoginPage
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setIsRegistering(true)}
          />
        )}
      </AppStyled>
    );
  }

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation
          active={active}
          setActive={setActive}
          onSignOut={handleSignOut}
          user={user} // ✅ Pass decoded user
        />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
