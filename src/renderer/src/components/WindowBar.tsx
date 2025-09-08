import styles from '../style/index.module.css'

export default function WindowBar() {
    return (
        <div className={styles['window-bar']}>
            <div className={styles['window-bar-button']} id="minimize"></div>
        </div>
    )
}