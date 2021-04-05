declare global {
    namespace JSX {
        interface IntrinsicElements {
            'wx-view': { 
                'hover-class'?: string,
                children?: any
            }
        }
    }
}

export const WARNING = 'only use this in unit test';