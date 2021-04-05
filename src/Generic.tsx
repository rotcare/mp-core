export function Generic<P extends {}>(props: { render: (props: P) => any } & P) {
    return undefined as any;
}