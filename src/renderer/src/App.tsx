import { useEffect, useRef } from 'react'
import WindowBar from './components/WindowBar'
import { GraphicsRenderer, InitializeInstance } from './engine/Engine'
import { getRendererIfAvailable, setRendererInstance } from './exports'
import style from './style/index.module.css'
import { ModalProvider } from './components/ModalProvider'

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
      const physicalWidth = window.innerWidth * dpi;
      const physicalHeight = (window.innerHeight - 40) * dpi;
      canvas.current.width = physicalWidth;
      canvas.current.height = physicalHeight;
      canvas.current.style.width = window.innerWidth + 'px';
      canvas.current.style.height = window.innerHeight - 40 + 'px';
      renderer.current.displayWidth = window.innerWidth;
      renderer.current.displayHeight = window.innerHeight;
      renderer.current.scaleForHighDPI(dpi);
    }
  }
  useEffect(() => {
    startRendererInstance();
    resize();
  }, [])
  window.onresize = () => {
    resize();
  }
  return (
    <>
      <ModalProvider />
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
