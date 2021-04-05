// in the headere of tsx file
// import { React } from '@rotcare/mp-core'
export function createElement(tag: any, props: Record<string, any>, ...children: any) {
    return { tag, props, children };
}