import { ModelEvent } from "./ModelEvent";
import { ModelProp } from "./ModelProp";

type IfEquals<X, Y, A=X, B=never> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? A : B;

type WritableKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, P>
}[keyof T];
      
type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P>
}[keyof T];

export function defineWidget<T>(modelClass: {new (): T}, impl: (model: T & {
    bindProp<K extends WritableKeys<T>>(key: K): ModelProp<T[K]>,
    bindEvent<K extends WritableKeys<T>>(key: K): ModelEvent<T[K]>
}) => any): (props: Pick<T, ReadonlyKeys<T>>) => any {
    return impl as any;
}