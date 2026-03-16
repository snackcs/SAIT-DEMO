'use client'

import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // В продакшне здесь должен быть Sentry или аналог
    console.error('[ErrorBoundary]', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-2xl bg-[#FEF2F2] p-8 text-center">
            <p className="text-sm font-semibold text-red-600">Что-то пошло не так</p>
            <p className="text-xs text-red-400">
              {this.state.error?.message ?? 'Неизвестная ошибка'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
            >
              Попробовать снова
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
