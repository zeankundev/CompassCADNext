import { GraphicsRenderer } from "./engine/Engine";
var renderer: GraphicsRenderer | null = null;
const setRendererInstance = (rendererInstance: GraphicsRenderer) => {
    renderer = rendererInstance;
}
const getRendererIfAvailable = (): GraphicsRenderer | null => {
    if (renderer) 
        return renderer;
    else
        return null;
}
export { renderer, setRendererInstance, getRendererIfAvailable };