import * as React from './FakeReact';
import { toAst } from './toAst';
import { strict } from 'assert';
import './native_components';
import { Widget, WidgetType } from './Widget';
import { defineWidget } from './defineWidget';

describe('toAst_props', () => {
    it('ref from default scope', () => {
        class MyCompModel {
            public readonly someProp1: string;
        }
        const MyComp = defineWidget(MyCompModel, props => <wx-view>{ props.someProp1 }</wx-view>)
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: 'wx-view', props: null, children:[{ scope: 'default', segments: [ 'someProp1' ] }]}, ast);
    })
    it('ref from multiple scopes', () => {
        class SomeLayoutModel {
            // 动态传入的 Widget
            public readonly header: WidgetType<{ title: string }>
        }
        const SomeLayout = defineWidget(SomeLayoutModel, props => {
            // 用 <Widget /> 渲染动态传入的 Widget
            return <wx-view>before{<Widget render={props.header} title="hello"/>}after</wx-view>;
        })
        class MyCompModel {
            public readonly prefix: string;
        }
        const MyComp = defineWidget(MyCompModel, props => {
            return <SomeLayout header={
                // 用 lambda 定义 inline widget
                (headerProps) => <wx-view>{props.prefix}:{headerProps.title}</wx-view>
            }/>
        })
        const ast1 = toAst(MyComp, 'default');
        const ast2 = toAst(ast1.props.header, 'headerProps');
        strict.deepEqual({ tag: 'wx-view', props: null, children:[
            { scope: 'default', segments: [ 'prefix' ] }, 
            ':', 
            { scope: 'headerProps', segments: [ 'title' ] }
        ]}, ast2);
    })
});