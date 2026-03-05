import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center space-y-6">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20">
                        <AlertTriangle size={32} className="text-red-400" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-white">Something went wrong</h3>
                        <p className="text-navy-400 text-sm max-w-sm">
                            An unexpected error occurred in this section. Please try refreshing.
                        </p>
                        {this.state.error && (
                            <code className="block text-xs text-red-400 bg-red-500/10 rounded-lg px-3 py-2 mt-2 max-w-sm mx-auto overflow-auto">
                                {this.state.error.message}
                            </code>
                        )}
                    </div>
                    <button
                        onClick={() => this.setState({ hasError: false, error: null })}
                        className="btn-primary px-6 py-2.5 flex items-center gap-2 text-sm"
                    >
                        <RefreshCw size={16} />
                        <span>Try Again</span>
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
