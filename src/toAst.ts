export function toAst(widget: (props?: any) => any, scope: string) {
    return widget(newScope(scope));
}

function newScope(scope: string, segments: string[] = []): any {
    return new Proxy({ scope, segments }, {
        get(target, p, receiver) {
            if (p === 'scope' || p === 'segments') {
                return Reflect.get(target, p);
            }
            return newScope(scope, [...segments, p as string]);
        }
    })
}