import * as React from './FakeReact';
import { toAst } from './toAst';
import { strict } from 'assert';
import './native_components';
import { ModelProp } from './ModelProp';
import { ModelEvent } from './ModelEvent';
import { defineWidget } from './defineWidget';

describe('toAst_model', () => {
    it('bindProp', () => {
        class InputModel {
            public readonly value: ModelProp<string>;
        }
        const Input = defineWidget(InputModel, (model) => {
            return undefined as any;
        })
        class MyCompModel {
            public someProp1: string;
            public someHandler() {
            }
        }
        const MyComp = defineWidget(MyCompModel, (model) => {
            return <Input value={model.bindProp('someProp1')} />
        })
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: Input, props: {value: { scope: 'default', bindProp: 'someProp1' }}, children:[]}, ast);
    })
    it('bindEvent', () => {
        class ButtonModel {
            public readonly tap: ModelEvent;
        }
        const Button = defineWidget(ButtonModel, (model) => {
            return undefined as any;
        })
        class MyCompModel {
            public someHandler() {
            }
        }
        const MyComp = defineWidget(MyCompModel, (model) => {
            return <Button tap={model.bindEvent('someHandler')} />
        })
        const ast = toAst(MyComp, 'default');
        strict.deepEqual({ tag: Button, props: {tap: { scope: 'default', bindEvent: 'someHandler' }}, children:[]}, ast);
    })
});