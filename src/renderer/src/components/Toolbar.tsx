import { useRef, useState } from 'react';
import styles from '../style/index.module.css'
import * as Types from '../engine/Types'
import { GraphicsRenderer } from '@renderer/engine/Engine';
import { getRendererIfAvailable } from '@renderer/exports';
import SelectIcon from '../assets/icons/navigate.svg'
import NavigateIcon from '../assets/icons/pan.svg'

interface ToolbarButtonProps {
    icon: string;
    title: string;
    keyName: string;
    keyCode: number;
    // To check if the tool is selected
    isActive: boolean;
    onAction?: () => void;
}

function ToolbarButton(props: ToolbarButtonProps) {
    console.log('[ToolbarButton] am I active?', props.isActive)
    return (
        <>
            <div 
                className={`${styles['toolbar-button']}${props.isActive ? ` ${styles['button-active']}` : ''}`}
                title={props.title + ' ' + `(${props.keyName})`}
                onClick={props.onAction}
            >
                <img src={props.icon} />
            </div>
        </>
    )
}

export default function Toolbar() {
    const [modeState, setModeState] = useState<number>(Types.default.NavigationTypes.Select);
    const renderer = useRef<GraphicsRenderer | null>(getRendererIfAvailable() || null);
    if (renderer.current) {
        renderer.current.onModeChange = () => {
            setModeState(renderer.current!.mode)
        }
    }
    return (
        <>
            <div className={styles['workflow-toolbar']}>
                <ToolbarButton 
                    icon={SelectIcon}
                    title='Select'
                    keyName='q'
                    keyCode={Types.default.KeyCodes.Q}
                    isActive={modeState == Types.default.NavigationTypes.Select}
                />
                <ToolbarButton 
                    icon={NavigateIcon}
                    title='Navigate'
                    keyName='w'
                    keyCode={Types.default.KeyCodes.W}
                    isActive={modeState == Types.default.NavigationTypes.Navigate}
                />
            </div>
        </>
    )
}