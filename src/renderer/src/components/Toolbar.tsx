import { useEffect, useRef, useState } from 'react';
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
    return (
        <div 
            className={`${styles['toolbar-button']}${props.isActive ? ` ${styles['button-active']}` : ''}`}
            title={`${props.title} (${props.keyName})`}
            onClick={props.onAction}
        >
            <img width={18} src={props.icon} />
        </div>
    );
}

export default function Toolbar() {
    const [modeState, setModeState] = useState<number>(Types.default.NavigationTypes.Navigate);
    const renderer = useRef<GraphicsRenderer>(null);
    useEffect(() => {
        renderer.current = getRendererIfAvailable();
        if (renderer.current) {
            // Set initial mode state from renderer
            setModeState(renderer.current.mode || Types.default.NavigationTypes.Navigate);
            // Listen for mode changes
            renderer.current.onModeChange = () => {
                if (renderer.current) {
                    setModeState(renderer.current.mode || Types.default.NavigationTypes.Navigate);
                }
            };
        }

        return () => {
            // Cleanup listener on unmount
            if (renderer.current) {
                renderer.current.onModeChange = null;
            }
        };
    }, [])
    return (
        <>
            <div className={styles['workflow-toolbar']} onMouseDown={(e) => e.stopPropagation()}>
                <ToolbarButton 
                    icon={SelectIcon}
                    title='Select'
                    keyName='q'
                    keyCode={Types.default.KeyCodes.Q}
                    isActive={modeState == Types.default.NavigationTypes.Select}
                    onAction={() => renderer.current?.setMode(Types.default.NavigationTypes.Select)}
                />
                <ToolbarButton 
                    icon={NavigateIcon}
                    title='Navigate'
                    keyName='w'
                    keyCode={Types.default.KeyCodes.W}
                    isActive={modeState == Types.default.NavigationTypes.Navigate}
                    onAction={() => renderer.current?.setMode(Types.default.NavigationTypes.Navigate)}
                />
            </div>
        </>
    )
}