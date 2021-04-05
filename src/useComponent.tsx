export function useComponent(importFrom: string): (props: any) => any {
    return new Component(importFrom) as any;
}

export class Component {
    constructor(public readonly importFrom: string) {
    }
}
