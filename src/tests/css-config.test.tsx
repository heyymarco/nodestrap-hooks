import React from 'react';
import { render, screen } from '@testing-library/react';

// cssfn:
import {
    createCssConfig,
    usesPrefixedProps,
    usesSuffixedProps,
} from '../libs/css-config'           // cssfn core



const shallowEqual = (obj1: Record<string, any>, obj2: Record<string, any>) =>
    Object.keys(obj1).length === Object.keys(obj2).length &&
    Object.keys(obj1).every(key => obj1[key] === obj2[key]);



test('test usesPrefixedProps - 1', () => {
    const [cssProps] = createCssConfig(() => {
        return {
            background : 111,
            color      : 222,
            menuColor  : 333,
            menusColor : 444,
        };
    });
    const filtered = usesPrefixedProps(cssProps, 'menu');
    if (!shallowEqual(filtered, {
        color: 'var(--menuColor)',
    })) throw filtered;
});
test('test usesPrefixedProps - 2', () => {
    const [cssProps] = createCssConfig(() => {
        return {
            background : 111,
            color      : 222,
            menuColor  : 333,
            menusColor : 444,
        };
    });
    const filtered = usesPrefixedProps(cssProps, 'menu', false);
    if (!shallowEqual(filtered, {
        menuColor: 'var(--menuColor)',
    })) throw filtered;
});

test('test usesSuffixedProps - 1', () => {
    const [cssProps] = createCssConfig(() => {
        return {
            background   : 111,
            color        : 222,
            colorValid   : 333,
            colorInvalid : 444,
        };
    });
    const filtered = usesSuffixedProps(cssProps, 'valid');
    if (!shallowEqual(filtered, {
        color: 'var(--colorValid)',
    })) throw filtered;
});
test('test usesSuffixedProps - 2', () => {
    const [cssProps] = createCssConfig(() => {
        return {
            background   : 111,
            color        : 222,
            colorValid   : 333,
            colorInvalid : 444,
        };
    });
    const filtered = usesSuffixedProps(cssProps, 'valid', false);
    if (!shallowEqual(filtered, {
        colorValid: 'var(--colorValid)',
    })) throw filtered;
});