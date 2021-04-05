import { React } from './React';
import { toAst } from './toAst';
import { strict } from 'assert';

describe('toAst', () => {
    it('native', () => {
        class MyComp {
            public render() {
                return <view>hello</view>
            }
        }
        const ast = toAst(MyComp);
        strict.deepEqual({ type: 'native', tag: 'view', attrs: null, children: 'hello'}, ast);
    });
});