import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

const scrollToMock = vi.fn()

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  configurable: true,
  value: scrollToMock,
})

afterEach(() => {
  scrollToMock.mockClear()
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})
