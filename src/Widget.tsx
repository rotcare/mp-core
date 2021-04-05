// 定义抽象节点
// someComp: WidgetType<{ a: string }>
export type WidgetType<P extends {}> = (props: P) => any;

// 渲染抽象节点
// <Widget render={props.someComp} a="hello" />
export function Widget<P extends {}>(props: { render: WidgetType<P> } & P) {
    return undefined as any;
}