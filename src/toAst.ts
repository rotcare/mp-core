export function toAst(widget: (props?: any, model?: any) => any, scope: string) {
    return widget(newScope(scope));
}

function newScope(scope: string, segments: string[] = []): any {
    return new Proxy({ scope, segments }, {
        get(target, p, receiver) {
            if (p === 'scope' || p === 'segments') {
                return Reflect.get(target, p);
            }
            switch(p) {
                case 'bindProp': 
                    return (bindProp: string) => {
                        return { scope, bindProp }
                    }
                case 'bindEvent':
                    return (bindEvent: string) => {
                        return { scope, bindEvent }
                    }
            }
            return newScope(scope, [...segments, p as string]);
        }
    })
}