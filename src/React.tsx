// in the headere of tsx file
// import { React } from '@rotcare/mp-core'
export const React = {
    createElement(tag: any, attrs: Record<string, any>, children: any) {
        return { type: 'native', tag, attrs, children };
    }
}