import { React } from './React';
import { toAst } from './toAst';
import { strict } from 'assert';
import { useNativeComponent } from './useNativeComponent';

describe('toAst', () => {
    it('native', () => {
        const View = useNativeComponent('view');
        class MyComp {
            public render() {
                return <View>hello</View>
            }
        }
        const ast = toAst(MyComp);
        strict.deepEqual({ tag: View, attrs: null, children: 'hello'}, ast);
    });
    it('with static attr', () => {
        const View = useNativeComponent('view');
        class MyComp {
            public render() {
                return <View title="abc">hello</View>
            }
        }
        const ast = toAst(MyComp);
        strict.deepEqual({ tag: View, attrs: { title: 'abc'}, children: 'hello'}, ast);
    })
});