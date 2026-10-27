import React, { Component, ErrorInfo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';

import Landing from '@/pages/Landing';
import AboutPage from '@/pages/AboutPage';
import NewsPage from '@/pages/NewsPage';
import InvestorsPage from '@/pages/InvestorsPage';
import ContactPage from '@/pages/ContactPage';
import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class RootErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NeurusAGi RootErrorBoundary caught error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-void flex items-center justify-center p-6 text-white font-grotesk">
          <div className="glass-strong p-8 rounded-2xl border border-teal-neural/20 max-w-md text-center space-y-4">
            <h2 className="text-xl font-bold text-white">Renderer Recovery</h2>
            <p className="text-xs text-white/50">{this.state.error?.message || 'A transient WebGL render error occurred.'}</p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="btn-primary py-2 px-4 text-xs"
            >
              Reinitialize
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <RootErrorBoundary>
      <BrowserRouter>
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#0a0d12",
              border: "1px solid rgba(12, 207, 176, 0.2)",
              color: "#e2faf8",
              fontFamily: "Space Grotesk, sans-serif",
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsPage />} />
          <Route path="/investors" element={<InvestorsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </RootErrorBoundary>
  );
}
