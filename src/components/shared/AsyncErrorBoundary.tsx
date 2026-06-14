import type { ReactNode } from 'react'
import { Component } from 'react'

interface AsyncErrorBoundaryProps {
  children: ReactNode
  resetKey: number
  fallback: (error: Error) => ReactNode
}

interface AsyncErrorBoundaryState {
  error: Error | null
}

export class AsyncErrorBoundary extends Component<AsyncErrorBoundaryProps, AsyncErrorBoundaryState> {
  state: AsyncErrorBoundaryState = {
    error: null
  }

  static getDerivedStateFromError(error: Error): AsyncErrorBoundaryState {
    return { error }
  }

  componentDidUpdate(previousProps: AsyncErrorBoundaryProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null })
    }
  }

  render() {
    if (this.state.error) {
      return this.props.fallback(this.state.error)
    }

    return this.props.children
  }
}
