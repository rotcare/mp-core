export function useNativeComponent(tag: string): (props: any) => any {
    return new NativeComponent(tag) as any;
}

export class NativeComponent {
    constructor(public readonly tag: string) {
    }
}