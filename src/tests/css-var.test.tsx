import React from 'react';
import { render, screen } from '@testing-library/react';

// cssfn:
import {
    createCssVar,
    fallbacks,
} from '../libs/css-var'           // cssfn core


interface TestVars {
    optOne   : any
    optTwo   : any
    optThree : any
}
const [testRefs, testDecls] = createCssVar<TestVars>({ minify: false, prefix: 'pfx' });
test('test fallbacks', () => {
    const testVar = fallbacks(
        testRefs.optOne,
        testRefs.optTwo,
        testRefs.optThree,
    );
    if (testVar !== 'var(--pfx-optOne,var(--pfx-optTwo,var(--pfx-optThree)))') throw Error(testVar);
});
