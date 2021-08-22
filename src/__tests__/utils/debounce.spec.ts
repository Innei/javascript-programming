import { debounce } from '~/utils/debounce'
jest.useFakeTimers()
describe('utils/debounce', () => {
  it('should debounce', () => {
    const func = jest.fn()
    const debouncedFunc = debounce(func, 500)

    // Execute for the first time
    debouncedFunc()

    // Move on the timer
    jest.advanceTimersByTime(250)
    // try to execute a 2nd time
    debouncedFunc()

    // Fast-forward time
    jest.runAllTimers()

    expect(func).toBeCalledTimes(1)
  })
})
