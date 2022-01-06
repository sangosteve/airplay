import React from 'react';
import {AuthProvider} from '../contexts/AuthProvider';
import Router from './Router';
export default function Providers() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
