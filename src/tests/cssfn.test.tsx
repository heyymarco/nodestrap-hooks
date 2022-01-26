import React from 'react';
import { render, screen } from '@testing-library/react';

// cssfn:
import {
    // createStyle,
    createSheet,
    style,
    layout,
    // children,
    mainComposition,
    imports,
    composition,
    globalDef,
    // variants,
    // createCssfnStyle,
    // global,
    // Style,
    // atRoot,
    // vars,
    rules,
    rule,
    states,
    // nestedRule,
    // atGlobal,
    // fontFace,
    keyframes,
    atGlobal,
    fallbacks,
    // Styles,
    // isHover,
}                           from '../libs/cssfn'           // cssfn core



test('combine rule to parent - 1', () => {
    const sheet = createSheet(() => [
        mainComposition(
            style({
                ...rule(['.arrive', '.arrived', '.arriving'], {
                    color: 'red',
                }),
            }),
        )
    ], 'mySaltSaltSalt');
    const rendered = sheet.toString();
    if (!rendered.startsWith('.csluex:is(.arrive, .arrived, .arriving)')) throw Error(rendered);
});

test('combine rule to parent - 2', () => {
    const selectorIsArriving = ['.arrive'                                                                                ,
                            ':hover:not(.disabled):not(.disable):not(:disabled):not(.arrived):not(.leave):not(.left)',
                            '.focused:not(.arrived):not(.leave):not(.left)'                                          ,
                            '.focus:not(.arrived):not(.leave):not(.left)'                                            ,
                            ':focus:not(.disabled):not(.disable):not(:disabled):not(.blur):not(.blurred):not(.arrived):not(.leave):not(.left)'];
    
    const sheet = createSheet(() => [
        mainComposition(
            style({
                ...rule(selectorIsArriving, {
                    color: 'red',
                }),
            }),
        )
    ], 'mySaltSaltSalt');
    const rendered = sheet.toString();
    if (!rendered.startsWith(`.csluex:is(${selectorIsArriving.join(', ')})`)) throw Error(rendered);
});