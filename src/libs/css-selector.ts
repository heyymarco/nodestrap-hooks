export type ParentSelector        = '&'
export type UniversalSelector     = '*'
export type UnnamedSelector       = ParentSelector | UniversalSelector

export type AttrSelector          = '['

export type ElementSelector       = ''
export type IdSelector            = '#'
export type ClassSelector         = '.'
export type PseudoClassSelector   = ':'
export type PseudoElementSelector = '::'
export type NamedSelector         = ElementSelector | IdSelector | ClassSelector | PseudoClassSelector | PseudoElementSelector

export type SelectorType          = UnnamedSelector | AttrSelector | NamedSelector
export type SelectorName          = string & {}

export type AttrSelectorName      = SelectorName
export type AttrSelectorOperator  = '=' | '~=' | '|=' | '^=' | '$=' | '*='
export type AttrSelectorValue     = string & {}
export type AttrSelectorOptions   = 'i' | 'I' | 's' | 'S'
export type AttrSelectorParams    = | readonly[AttrSelectorName                                                              ]
                                    | readonly[AttrSelectorName, AttrSelectorOperator, AttrSelectorValue                     ]
                                    | readonly[AttrSelectorName, AttrSelectorOperator, AttrSelectorValue, AttrSelectorOptions]

export type SelectorParams        = AttrSelectorParams | SelectorList | string
export type SimpleSelector        = | readonly [UnnamedSelector            /* no_name */  /* no_param */                             ]
                                    | readonly [AttrSelector        , null /* no_name */, AttrSelectorParams                         ]
                                    | readonly [NamedSelector       , SelectorName        /* no_param */                             ]
                                    | readonly [PseudoClassSelector , SelectorName      , Exclude<SelectorParams, AttrSelectorParams>]

export type Combinator            = ' ' | '>' | '~' | '+'
export type Selector              = (SimpleSelector|Combinator)[]
export type SelectorList          = Selector[]



const whitespaceList                  = [' ', '\n', '\r', '\t', '\f', '\v'];
const specialPseudoClassList          = ['is', 'not', 'where', 'has'];



export const parseSelectors = (expression: string): SelectorList|null => {
    const expressionLength = expression.length;
    let pos = 0;
    
    
    
    const isEof = (): boolean => {
        return (pos >= expressionLength);
    };
    const skipWhitespace = (): void => {
        while (!isEof() && whitespaceList.includes(expression[pos])) pos++;
    };
    const eatComma = (): boolean => {
        if (expression[pos] !== ',') return false;
        pos++; return true; // move forward & return true
    };
    
    const parseSelectorType = (): SelectorType => {
        const char = expression[pos];
        switch (char) {
            case '&':
            case '*':
            case '[':
            case '#':
            case '.':
                pos++; return char;
            case ':':
                pos++;
                if (expression[pos] === ':') { pos++; return '::'; }
                return ':';
            
            default:
                return '';
        } // switch
    }
    const isValidIdentifierChar = (): boolean => {
        const char = expression[pos];
        if ((char >= 'a') && (char <= 'z')) return true;
        if ((char >= 'A') && (char <= 'Z')) return true;
        if ((char >= '0') && (char <= '9')) return true;
        if (char === '-') return true;
        if (char === '_') return true;
        return false;
    };
    const parseIdentifierName = (): string|null => {
        const originPos = pos;
        
        while (!isEof() && isValidIdentifierChar()) pos++; // move forward until out of valid chars
        if (pos === originPos) { pos = originPos; return null; } // pos not moved => nothing to parse => revert changes & return null
        
        return expression.substring(originPos, pos);
    };
    const parseSimpleSelector = (): SimpleSelector|null => {
        const originPos = pos;
        
        const type = parseSelectorType();
        if ((type === '&') || (type === '*')) {
            return [
                type,
            ];
        }
        else if (type === '[') {
            const attrSelectorParams = parseAttrSelectorParams();
            if (!attrSelectorParams) { pos = originPos; return null; } // syntax error: missing attrSelectorParams => revert changes & return null
            
            return [
                type,
                null,
                attrSelectorParams,
            ];
        }
        else {
            const name = parseIdentifierName();
            if (!name) { pos = originPos; return null; } // syntax error: missing name => revert changes & return null
            
            if (type !== ':') {
                return [
                    type,
                    name,
                ];
            } // if
            else { // pseudo class
                if (specialPseudoClassList.includes(name)) {
                    const selectorParams = parseSelectorParams();
                    if (!selectorParams) { pos = originPos; return null; } // syntax error: missing required selector parameter(s) => revert changes & return null
                    return [
                        type,
                        name,
                        selectorParams,
                    ];
                }
                else {
                    const wildParams = parseWildParams();
                    if (wildParams === null) {
                        return [
                            type,
                            name,
                        ];
                    }
                    else {
                        return [
                            type,
                            name,
                            wildParams,
                        ];
                    } // if
                } // if
            } // if
        } // if
    };
    const parseCombinator = (): Combinator|null => {
        const originPos = pos;
        
        skipWhitespace();
        
        const char = expression[pos];
        if (char === '>') { pos++; return '>'; }
        if (char === '~') { pos++; return '~'; }
        if (char === '+') { pos++; return '+'; }
        if (pos > originPos) {
            const currentPos = pos;             // 1. backup
            const test = parseSimpleSelector(); // 2. destructive test
            pos = currentPos;                   // 3. restore
            
            if (test) return ' ';
        } // if
        return null;
    };
    const parseSelector = (): Selector|null => {
        const originPos = pos;
        
        const selector : Selector = [];
        
        while (!isEof()) {
            // skipWhitespace(); // already included in `parseCombinator()`, do not `skipWhitespace()` here => causing descendant_combinator (space) unrecognized
            
            if (selector.length) {
                // the next simpleSelector must be separated by combinator:
                const combinator = parseCombinator();
                if (!combinator) break; // no more next simpleSelector
                selector.push(combinator);
            } // if
            
            skipWhitespace();
            
            const simpleSelector = parseSimpleSelector();
            if (!simpleSelector) { pos = originPos; return null; } // syntax error: missing simpleSelector => revert changes & return null
            selector.push(simpleSelector);
            
            let nextSequence : SimpleSelector|null
            do {
                nextSequence = parseSimpleSelector();
                if (nextSequence) selector.push(nextSequence);
            }
            while(nextSequence);
        } // while
        
        return selector;
    };
    
    const eatOpeningBracket = (): boolean => {
        if (expression[pos] !== '(') return false;
        pos++; return true; // move forward & return true
    };
    const eatClosingBracket = (): boolean => {
        if (expression[pos] !== ')') return false;
        pos++; return true; // move forward & return true
    };
    const eatClosingSquareBracket = (): boolean => {
        if (expression[pos] !== ']') return false;
        pos++; return true; // move forward & return true
    };
    const eatNonBracket = (): boolean => {
        const originPos = pos;
        
        while (!isEof() && (expression[pos] !== '(') && (expression[pos] !== ')')) pos++;
        if (pos === originPos) return false; // pos not moved => nothing to eat => false
        
        return true;
    };
    const parseSelectors = (): SelectorList|null => {
        const originPos = pos;
        
        const selectors : SelectorList = [];
        
        while (!isEof()) {
            skipWhitespace();
            
            if (selectors.length) {
                // the next selector must be separated by comma:
                if (!eatComma()) break; // no more next selector
                
                skipWhitespace();
            } // if
            
            const selector = parseSelector();
            if (!selector) { pos = originPos; return null; } // syntax error: missing selector => revert changes & return null
            selectors.push(selector);
        } // while
        
        return selectors;
    };
    const parseWildParams = (): string|null => {
        const originPos = pos;
        
        if (!eatOpeningBracket()) return null;
        
        while (!isEof()) {
            let eaten = eatNonBracket();
            
            const nestedWildParams = parseWildParams();
            if (nestedWildParams !== null) {
                eaten = true;
                eatNonBracket();
            } // if
            
            if (!eaten) break;
        } // while
        
        if (!eatClosingBracket()) { pos = originPos; return null; } // revert changes & return null
        
        return expression.substring(originPos + 1, pos - 1);
    };
    const parseSelectorParams = (): SelectorList|null => {
        const originPos = pos;
        
        if (!eatOpeningBracket()) return null;
        
        const selectors = parseSelectors();
        
        if (!eatClosingBracket()) { pos = originPos; return null; } // revert changes & return null
        
        return selectors ?? []; // null => empty selector => empty array
    };
    const parseAttrSelectorOperator = (): AttrSelectorOperator|null => {
        const originPos = pos;
        
        const char = expression[pos];
        switch (char) {
            case '=':
                pos++; return char;
            
            case '~':
            case '|':
            case '^':
            case '$':
            case '*':
                pos++;
                if (expression[pos] !== '=') { pos = originPos; return null; } // syntax error: missing `=` => revert changes & return null
                pos++;
                return `${char}=`;
            
            default:
                return null;
        } // switch
    };
    const parseAttrSelectorOptions = (): AttrSelectorOptions|null => {
        const char = expression[pos];
        switch (char) {
            case 'i':
            case 'I':
                pos++; return 'i';
            
            case 's':
            case 'S':
                pos++; return 's';
            
            default:
                return null;
        } // switch
    }
    const parseNudeString = (): string|null => {
        const originPos = pos;
        
        while (!isEof() && isValidIdentifierChar()) pos++; // move forward until out of valid chars
        if (pos === originPos) { pos = originPos; return null; } // pos not moved => nothing to parse => revert changes & return null
        
        return expression.substring(originPos, pos);
    };
    const eatTypeQuote = (quotChar: "'" | '"'): boolean => {
        if (expression[pos] !== quotChar) return false;
        pos++; return true; // move forward & return true
    };
    const isValidStringChar = (quotChar: "'" | '"'): boolean => {
        const char = expression[pos];
        if (char === quotChar) {
            return ((pos >= 1) && (expression[pos - 1] === '\\')); // looking for previously escape char
        }
        else if (char === '\\') {
            return ((pos + 1) < expressionLength);
        }
        else {
            return true;
        } // if
    };
    const parseQuoteString = (quotChar: "'" | '"'): string|null => {
        const originPos = pos;
        
        if (!eatTypeQuote(quotChar)) return null; // must starts with quote
        
        while (!isEof() && isValidStringChar(quotChar)) pos++; // move forward until out of valid chars
        
        if (!eatTypeQuote(quotChar)) { pos = originPos; return null; } // syntax error: missing quote => revert changes & return null
        
        const value = expression.substring(originPos + 1, pos - 1);
        if (quotChar === "'") {
            return value.replaceAll(/(?<!\\)'/g, "\\'");
        }
        else {
            return value.replaceAll(/(?<!\\)"/g, '\\"');
        } // if
    };
    const parseString = (): string|null => {
        return (
            parseQuoteString("'")
            ??
            parseQuoteString('"')
            ??
            parseNudeString()
        );
    }
    const parseAttrSelectorParams = (): AttrSelectorParams|null => {
        const originPos = pos;
        
        // if (!eatOpeningSquareBracket()) return null; // already eaten by `parseSelectorType()`
        
        skipWhitespace();
        
        const name = parseIdentifierName();
        if (!name) { pos = originPos; return null; } // syntax error: missing name => revert changes & return null
        
        skipWhitespace();
        
        const operator = parseAttrSelectorOperator();
        if (!operator) {
            if (!eatClosingSquareBracket()) { pos = originPos; return null; } // syntax error: missing `]` => revert changes & return null
            
            return [
                name,
            ];
        }
        else {
            skipWhitespace();
            
            const value = parseString();
            if (!value) { pos = originPos; return null; } // syntax error: missing value => revert changes & return null
            
            skipWhitespace();
            
            const options = parseAttrSelectorOptions();
            if (options) {
                skipWhitespace();
            } // if
            
            if (!eatClosingSquareBracket()) { pos = originPos; return null; } // syntax error: missing `]` => revert changes & return null
            
            if (!options) {
                return [
                    name,
                    operator,
                    value,
                ];
            }
            else {
                return [
                    name,
                    operator,
                    value,
                    options,
                ];
            } // if
        } // if
    };
    
    
    
    const allSelectors = parseSelectors();
    if (!isEof()) return null; // syntax error: not all expression are valid selector
    return allSelectors;
};



export const isWildParams = (selectorParams: SelectorParams): selectorParams is string => {
    return (typeof(selectorParams) === 'string');
};
export const isSelectors = (selectorParams: SelectorParams): selectorParams is SelectorList => {
    return (
        !isWildParams(selectorParams)
        &&
        selectorParams.some((part) => (typeof(part) !== 'string')) // contains at least 1 non-string (or SimpleSelector = readonly [])
    );
};
export const isAttrSelectorParams = (selectorParams: SelectorParams): selectorParams is AttrSelectorParams => {
    return (
        !isWildParams(selectorParams)
        &&
        !selectorParams.some((part) => (typeof(part) !== 'string')) // NOT contains at least 1 non-string (or SimpleSelector = readonly [])
    );
};
const selectorParamsToString = (selectorParams: SelectorParams|null|undefined): string => {
    if ((selectorParams === null) || (selectorParams === undefined)) return '';
    
    if (isWildParams(selectorParams)) return `(${selectorParams})`;
    
    if (isSelectors(selectorParams)) {
        return `(${
            selectorParams
            .map((selector): string => selectorToString(selector))
            .join(', ')
        })`;
    }
    else { // if isAttrSelectorParams(selectorParams)
        const [
            name,
            operator,
            value,
            options,
        ] = selectorParams;
        
        if (options) {
            return `[${name}${operator}"${value}" ${options}]`;
        }
        else if (value) {
            return `[${name}${operator}"${value}"]`;
        }
        else {
            return `[${name}]`;
        } // if
    } // if
};



export const isCombinator = (part: SimpleSelector|Combinator): part is Combinator => {
    return (typeof(part) === 'string');
};
export const isSimpleSelector = (part: SimpleSelector|Combinator): part is SimpleSelector => {
    return (typeof(part) !== 'string');
};
export const selectorToString = (selector: Selector): string => {
    return (
        selector
        .map((part): string => {
            if (isCombinator(part)) return part;
            
            const [
                selectorType,
                selectorName = '',
                selectorParams,
            ] = part; // isSimpleSelector(part)
            
            if (selectorType === '[') {
                return selectorParamsToString(selectorParams);
            }
            else {
                return `${selectorType}${selectorName}${selectorParamsToString(selectorParams)}`;
            } // if
        })
        .join('')
    );
};
export const selectorsToString = (selectors: SelectorList): string => {
    return (
        selectors
        .map(selectorToString)
        .join(', ')
    );
}



export const isSelector = (test: SimpleSelector|Selector): test is Selector => {
    /*
        SimpleSelector : always starts_with SelectorType (string)
        Selector       : may separated by Combinator (string) but cannot starts_with Combinator (string)
    */
    return (typeof(test[0]) !== 'string'); // check the type of the first element
};
export type MapSelectorCallback = (selector: SimpleSelector) => SimpleSelector|Selector
export const mapSelectors = (selectors: SelectorList, callbackFn: MapSelectorCallback): SelectorList => {
    return (
        selectors
        .map((selector) =>
            selector
            .map((part): Selector => {
                if (isCombinator(part)) return [part];
                
                
                
                let replacement = callbackFn(part); // isSimpleSelector(part)
                
                
                
                if (replacement === part) { // if not replaced by `callbackFn` (same by reference)
                    const [
                        , // skip: selectorType,
                        , // skip: selectorName,
                        selectorParams,
                    ] = part; // isSimpleSelector(part)
                    
                    if (selectorParams && isSelectors(selectorParams)) {
                        const oldSelectors = selectorParams;
                        const newSelectors = (
                            oldSelectors
                            .map((selector): Selector =>
                                selector
                                .map((part): Selector => {
                                    if (isCombinator(part)) return [part];
                                    
                                    const replacement = callbackFn(part);
                                    return isSelector(replacement) ? replacement : [replacement];
                                })
                                .flat()
                            )
                        );
                        
                        replacement = [...part.slice(2), newSelectors] as unknown as SimpleSelector;
                    } // if
                } // if
                
                
                
                return isSelector(replacement) ? replacement : [replacement];
            })
            .flat()
        )
    );
};