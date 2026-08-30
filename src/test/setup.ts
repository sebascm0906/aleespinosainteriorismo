import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'

Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
  configurable: true,
  value: vi.fn(),
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})
