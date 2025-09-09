import styles from '../style/index.module.css'
import Minimize from '../assets/icons/minimize.svg'
import Maximize from '../assets/icons/maximize.svg'
import Close from '../assets/icons/close.svg'
import RestoreDown from '../assets/icons/restoredown.svg'
import { useState } from 'react'

export default function WindowBar() {
    const [isMaximized, setMaximized] = useState<boolean>(false);
    window.electron.ipcRenderer.on('isMaximized', (_event, isMaximized: boolean) => {
        console.log(`[windowbar] isMaximized: ${isMaximized}`);
        setMaximized(isMaximized);
    })
    return (
        <div className={styles['window-bar']}>
            <div className={styles['window-bar-left']}>a</div>
            <div className={styles['window-bar-dragger']}></div>
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
                    title="Maximize"
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
        </div>
    )
}