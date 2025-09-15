import React from 'react'
import styles from '../style/index.module.css'
import { VectorType } from '@renderer/engine/Engine'

interface MenuProviderProps {
    children: React.ReactNode;
    offset?: VectorType;
}

interface MenuContextProps {
    icon?: string,
    title: string,
    onAction?: () => void
}

export function MenuContext(props: MenuContextProps) {
    return (
        <div className={styles['menu-context']}>
            <img src={props.icon}></img>
            <span>{props.title}</span>
        </div>
    )
}

export function MenuProvider(props: MenuProviderProps) {
    return (
        <>
            <div 
                className={styles['menu-provider']}
                style={{
                    left: (props.offset?.x ? props.offset?.x : 0) + 'px',
                    top: (props.offset?.y ? props.offset?.y : 0) + 'px',
                }}
            >
                {props.children}
            </div>
        </>
    )
}