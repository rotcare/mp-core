import * as React from './FakeReact';
import { toAst } from './toAst';
import { strict } from 'assert';
import './native_components';
import { Widget, WidgetType } from './Widget';

describe('toAst_var', () => {
    it('ref from default scope', () => {
        class MyCompModel {
            public readonly someProp1: string;
        }
        function MyComp(props: MyCompModel) {
            return <wx-view>{ props.someProp1 }</wx-view>
        }
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: 'wx-view', props: null, children:[{ scope: 'default', segments: [ 'someProp1' ] }]}, ast);
    })
    it('ref from multiple scopes', () => {
        class SomeLayoutModel {
            // 动态传入的 Widget
            header: WidgetType<{ title: string }>
        }
        function SomeLayout(props: SomeLayoutModel) {
            // 用 <Widget /> 渲染动态传入的 Widget
            return <wx-view>before{<Widget render={props.header} title="hello"/>}after</wx-view>;
        }
        class MyCompModel {
            prefix: string;
        }
        function MyComp(props: MyCompModel) {
            return <SomeLayout header={
                // 用 lambda 定义 inline widget
                (headerProps) => <wx-view>{props.prefix}:{headerProps.title}</wx-view>
            }/>
        }
        const ast1 = toAst(MyComp, 'default');
        const ast2 = toAst(ast1.props.header, 'headerProps');
        strict.deepEqual({ tag: 'wx-view', props: null, children:[
            { scope: 'default', segments: [ 'prefix' ] }, 
            ':', 
            { scope: 'headerProps', segments: [ 'title' ] }
        ]}, ast2);
    })
});