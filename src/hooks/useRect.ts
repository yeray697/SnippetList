//Source: https://gist.github.com/morajabi/523d7a642d8c0a2f71fcfa0d8b3d2846
import { useLayoutEffect, useCallback, useState, MutableRefObject } from 'react'

interface Rect {
  base: {
    bottom: number,
    height: number,
    left: number,
    right: number,
    top: number,
    width: number
  },
  scrollWidth: number,
  scrollHeight: number,
  clientWidth: number,
  clientHeight: number
}

const getRect = (element: HTMLElement | null) : Rect=> {
  if (!element) {
    return {
      base: {bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0,}, scrollWidth: 0, scrollHeight: 0, clientWidth: 0, clientHeight: 0
    }
  }
  const aux = element.getBoundingClientRect();


  return {base: {bottom: aux.bottom, height: aux.height, left: aux.left,right: aux.right,top: aux.top,width: aux.width,}
    ,scrollWidth: element.scrollWidth, scrollHeight: element.scrollHeight, clientWidth: element.clientWidth, clientHeight: element.clientHeight
  }
}

const useRect = (ref: MutableRefObject<HTMLElement>) => {
  const [rect, setRect] = useState(getRect(ref ? ref.current : null))

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