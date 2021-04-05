export function toAst<T extends { render(): any }>(widgetClass: { new (): T }) {
    return widgetClass.prototype.render.call(new Proxy({}, {
        get(target, p, receiver) {
            return { var: p };
        }
    }));
}