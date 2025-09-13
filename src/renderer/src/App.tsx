import { useEffect, useRef } from 'react'
import WindowBar from './components/WindowBar'
import { GraphicsRenderer, InitializeInstance } from './engine/Engine'
import { getRendererIfAvailable, setRendererInstance } from './exports'
import style from './style/index.module.css'

function App(): React.JSX.Element {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<GraphicsRenderer>(null);
  const startRendererInstance = () => {
    if (canvas.current) {
      console.log('[main] canvas is available and ready')
      setRendererInstance(new GraphicsRenderer(canvas.current, window.innerWidth, window.innerHeight))
      renderer.current = getRendererIfAvailable();
      console.log('[main] renderer instance now:', renderer.current)
      if (renderer.current) {
        console.log('[main] starting instance now')
        InitializeInstance(renderer.current);
      } else {
        console.log('[main] render unavailable, not starting')
      }
    }
  }
  const resize = () => {
    if (canvas.current && renderer.current) {
      const dpi = window.devicePixelRatio;
      const width = window.innerWidth * devicePixelRatio;
      const height = window.innerHeight * devicePixelRatio;
      console.log(`[main] log info, dpi:${dpi}, w:${width}, h:${height}`)
      renderer.current.displayWidth = width;
      renderer.current.displayHeight = height;
      canvas.current.width = width;
      canvas.current.height = height;
      renderer.current.context?.scale(dpi, dpi)
      canvas.current.style.height = window.innerHeight + 'px';
      canvas.current.style.width = window.innerWidth + 'px';
    }
  }
  useEffect(() => {
    startRendererInstance();
    resize();
  }, [])
  return (
    <>
      <WindowBar/>
      <div className={style['canvas-container']}>
        <canvas
          width={window.innerWidth}
          height={window.innerHeight}
          ref={canvas}
        />
      </div>
    </>
  )
}

export default App
