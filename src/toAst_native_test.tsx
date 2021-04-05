import * as React from './FakeReact';
import { toAst } from './toAst';
import { strict } from 'assert';
import './native_components';

describe('toAst_native', () => {
    it('barebone', () => {
        function MyComp() {
            return <wx-view />
        }
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: 'wx-view', props: null, children: []}, ast);
    })
    it('with children text', () => {
        function MyComp() {
            return <wx-view>hello</wx-view>
        }
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: 'wx-view', props: null, children: ['hello']}, ast);
    });
    it('with children mixed', () => {
        function MyComp() {
            return <wx-view>before{<wx-view/>}after</wx-view>
        }
        const ast = toAst(MyComp, 'default');
        console.log(ast);
        strict.deepEqual({ tag: 'wx-view', props: null, children: ['before', { tag: 'wx-view', props: null, children: [] }, 'after']}, ast);
    });
    it('with static attr', () => {
        function MyComp() {
            return <wx-view hover-class="abc">hello</wx-view>
        }
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: 'wx-view', props: { 'hover-class': 'abc'}, children: ['hello']}, ast);
    })
});