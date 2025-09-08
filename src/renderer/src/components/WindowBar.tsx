import styles from '../style/index.module.css'

export default function WindowBar() {
    return (
        <div className={styles['window-bar']}>
            <div className={styles['window-bar-left']}>a</div>
            <div className={styles['window-bar-dragger']}></div>
            <div className={styles['window-bar-right']}>s</div>
        </div>
    )
}