export function toAst<T extends { render(): any }>(componentClass: { new (): T }) {
    return componentClass.prototype.render.call(new Proxy({}, {
        get(target, p, receiver) {
            return { var: p };
        }
    }));
}