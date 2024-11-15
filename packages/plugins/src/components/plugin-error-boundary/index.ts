import { Component, ReactNode, ErrorInfo } from "react";

interface PluginErrorBoundaryProps {
  name: string;
  onError?: (name: string, error: Error) => void;
  children: ReactNode;
}

interface PluginErrorBoundaryState {
  hasError: boolean;
}

export class PluginErrorBoundary extends Component<
  PluginErrorBoundaryProps,
  PluginErrorBoundaryState
> {
  /**
   * @param {Object} props
   */
  constructor(props: PluginErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): PluginErrorBoundaryState {
    return { hasError: true };
  }

  /**
   * @param {Error} error Error object passed by React.
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const { name, onError } = this.props;
    if (onError) {
      onError(name, error);
    }
  }

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return null;
  }
}
