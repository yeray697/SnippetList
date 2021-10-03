//Source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { useLayoutEffect, useCallback, useState, MutableRefObject } from 'react'

const getRect = (element: HTMLElement | null) => {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    } as DOMRect
  }

  return element.getBoundingClientRect()
}

const useRect = (ref: MutableRefObject<HTMLElement>) => {
  const [rect, setRect] = useState<DOMRect>(getRect(ref ? ref.current : null))

  const handleResize = useCallback(() => {
    if (!ref.current) return
    setRect(getRect(ref.current))
  }, [ref])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => handleResize())
      resizeObserver.observe(element)

      return () => {
        if (!resizeObserver) {
          return
        }

        resizeObserver.disconnect()
        //resizeObserver = null
      }
    } else {
      // Browser support, remove freely
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [ ref, handleResize])

  return rect
}

export default useRect