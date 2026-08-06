import { Component } from "react";

/**
 * Minimal error boundary: if a child crashes, render `fallback` (default:
 * nothing) instead of unmounting the whole React tree. Used around the
 * global search so a search failure can never take down the site.
 */
export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
