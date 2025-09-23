"use client";
import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize fallback UI per component
      return (
        this.props.fallback ?? (
          <div className="p-6 bg-red-100 text-red-700 rounded">
            <h2 className="font-bold text-lg">Something went wrong.</h2>
            <p>Please refresh the page or try again later.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
