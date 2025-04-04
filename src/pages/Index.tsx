
import React from 'react';
import AuthScreen from '@/components/auth/AuthScreen';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <AuthScreen 
        onAuthSuccess={handleAuthSuccess} 
        appName="ShabdShiksha" 
      />
    </div>
  );
};

export default Index;
