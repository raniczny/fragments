export interface OnWindowResizeHandler {
    handleWindowResize(): void
}

export class WindowResizeHandler {
    private readonly handlers: OnWindowResizeHandler[]

    private constructor(handlers: OnWindowResizeHandler[]) {
        this.handlers = handlers
        this.registerResizeEventListener()
    }

    private registerResizeEventListener() {
        window.addEventListener('resize', () => {
            this.onWindowResize()
        })
    }

    private onWindowResize() {
        this.handlers.forEach(handler => {
            handler.handleWindowResize()
        })
    }

    static init(handlers: OnWindowResizeHandler[]) {
        new WindowResizeHandler(handlers)
    }
}