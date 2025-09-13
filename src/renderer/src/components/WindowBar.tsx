import styles from '../style/index.module.css'
import CompassCADLogoMonochrome from '../assets/icons/newlogo.svg'
import MenuIcon from '../assets/icons/menu.svg'
// Window buttons
import Minimize from '../assets/icons/minimize.svg'
import Maximize from '../assets/icons/maximize.svg'
import Close from '../assets/icons/close.svg'
import RestoreDown from '../assets/icons/restoredown.svg'
import { useEffect, useRef, useState } from 'react'
import { GraphicsRenderer } from '@renderer/engine/Engine'
import { getRendererIfAvailable } from '@renderer/exports'
import { openModal } from './ModalProvider'

function TestComponent() {
    const [counterthingy, setcounterthingy] = useState<number>(0);
    const upCounter = () => setcounterthingy(counterthingy + 1);
    return (
        <>
            <span>Let's count! Now, it's {counterthingy}</span>
            <button onClick={upCounter}>Count up</button>
        </>
    )
}

export default function WindowBar() {
    const [isMaximized, setMaximized] = useState<boolean>(false);
    const [zoom, setZoom] = useState<number>(1);
    const renderer = useRef<GraphicsRenderer>(null);
    window.electron.ipcRenderer.on('isMaximized', (_event, isMaximized: boolean) => {
        console.log(`[windowbar] isMaximized: ${isMaximized}`);
        setMaximized(isMaximized);
    })
    useEffect(() => {
        renderer.current = getRendererIfAvailable();
        if (renderer.current) {
            renderer.current.onZoomUpdate = () => {
                setZoom(renderer.current!.zoom);
            }
        }
    }, [])
    const openDemoModal = () => {
        openModal('Hello World', <TestComponent/>)
    }
    return (
        <>
            <div className={styles['window-bar']}>
                <div className={styles['window-bar-left']}>
                    {window.process.platform == 'darwin' && (
                        <div className={styles['window-bar-mac-buttons']}>
                            <button 
                                className={styles['window-bar-button-mac']}
                                onClick={() => window.electron.ipcRenderer.send('close')}
                            >
                                <div className={`${styles['mac-roundy']} ${styles['close']}`}></div>
                            </button>
                            <button 
                                className={styles['window-bar-button-mac']}
                                onClick={() => window.electron.ipcRenderer.send('minimize')}
                            >
                                <div className={`${styles['mac-roundy']} ${styles['minimize']}`}></div>
                            </button>
                            <button 
                                className={styles['window-bar-button-mac']}
                                onClick={() => window.electron.ipcRenderer.send('fullscreen')}
                            >
                                <div className={`${styles['mac-roundy']} ${styles['full']}`}></div>
                            </button>
                        </div>
                    )}
                    <button className={styles['window-bar-button']}>
                        <img src={CompassCADLogoMonochrome} />
                    </button>
                    <button className={styles['window-bar-button']} onClick={openDemoModal}>
                        <img src={MenuIcon} />
                    </button>
                    <span>{zoom.toFixed(2)}x</span>
                </div>
                <div className={styles['window-bar-dragger']}></div>
                {window.process.platform != 'darwin' && (
                    <div className={styles['window-bar-right']}>
                        <button
                            className={styles['window-bar-button']}
                            title="Minimize"
                            onClick={() => {
                                window.electron.ipcRenderer.send('minimize');
                            }}
                        >
                            <img src={Minimize} alt="Minimize" />
                        </button>
                        <button
                            className={styles['window-bar-button']}
                            title={isMaximized ? 'Restore Down' : 'Maximze'}
                            onClick={() => {
                                window.electron.ipcRenderer.send('maximize');
                            }}
                        >
                            <img src={isMaximized ? RestoreDown : Maximize} alt="Maximize" />
                        </button>
                        <button
                            className={styles['window-bar-button'] + ' ' + styles['window-close']}
                            title="Close"
                            onClick={() => {
                                window.electron.ipcRenderer.send('close');
                            }}
                        >
                            <img src={Close} alt="Close" />
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}