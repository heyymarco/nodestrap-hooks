export type IdentifierSpecialType  = '&' | '*'
export type IdentifierParamType    = '['
export type IdentifierNamedType    = '' | '#' | '.' | ':' | '::'
export type IdentifierType         = IdentifierSpecialType | IdentifierParamType | IdentifierNamedType
export type IdentifierName         = string & {}
export type IdentifierAttrName     = IdentifierName
export type IdentifierAttrOperator = '=' | '~=' | '|=' | '^=' | '$=' | '*='
export type IdentifierAttrValue    = string & {}
export type IdentifierAttrOptions  = 'i' | 'I' | 's' | 'S'
export type IdentifierAttrParam    = | readonly[IdentifierAttrName                                                                    ]
                                     | readonly[IdentifierAttrName, IdentifierAttrOperator, IdentifierAttrValue                       ]
                                     | readonly[IdentifierAttrName, IdentifierAttrOperator, IdentifierAttrValue, IdentifierAttrOptions]
export type IdentifierParams       = IdentifierAttrParam | SelectorList | string
export type Identifier             = | readonly [IdentifierSpecialType       /* no_name */  /* no_param */                                ]
                                     | readonly [IdentifierParamType  , null /* no_name */, IdentifierAttrParam                           ]
                                     | readonly [IdentifierNamedType  , IdentifierName      /* no_param */                                ]
                                     | readonly [':'                  , IdentifierName    , Exclude<IdentifierParams, IdentifierAttrParam>]
export type Combinator             = ' ' | '>' | '~' | '+'
export type Selector               = (Identifier|Combinator)[]
export type SelectorList           = Selector[]



const whitespaceList               = [' ', '\n', '\r', '\t', '\f', '\v'];
const specialPseudoClassList       = ['is', 'where', 'not'];



export const parseSelectors = (expression: string): SelectorList|null => {
    const expressionLength = expression.length;
    let pos = 0;
    
    
    
    const isEof = (): boolean => {
        return (pos >= expressionLength);
    };
    const skipWhitespace = (): void => {
        while (!isEof() && whitespaceList.includes(expression[pos])) pos++;
    };
    const eatSeparator = (): boolean => {
        if (expression[pos] !== ',') return false;
        pos++; return true; // move forward & return true
    };
    
    const parseIdentifierType = (): IdentifierType => {
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
    const parseIdentifier = (): Identifier|null => {
        const originPos = pos;
        
        const type = parseIdentifierType();
        if ((type === '&') || (type === '*')) {
            return [
                type,
            ];
        }
        else if (type === '[') {
            const attrParams = parseAttrParams();
            if (!attrParams) { pos = originPos; return null; } // syntax error: missing attrParams => revert changes & return null
            
            return [
                type,
                null,
                attrParams,
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
            const currentPos = pos;         // 1. backup
            const test = parseIdentifier(); // 2. destructive test
            pos = currentPos;               // 3. restore
            
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
                // the next identifier must be separated by combinator:
                const combinator = parseCombinator();
                if (!combinator) break; // no more next identifier
                selector.push(combinator);
            } // if
            
            skipWhitespace();
            
            const identifier = parseIdentifier();
            if (!identifier) { pos = originPos; return null; } // syntax error: missing identifier => revert changes & return null
            selector.push(identifier);
            
            let nextIdentifier : Identifier|null
            do {
                nextIdentifier = parseIdentifier();
                if (nextIdentifier) selector.push(nextIdentifier);
            }
            while(nextIdentifier);
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
                if (!eatSeparator()) break; // no more next selector
                
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
    const parseIdentifierAttrOperator = (): IdentifierAttrOperator|null => {
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
    const parseIdentifierAttrOptions = (): IdentifierAttrOptions|null => {
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
    const parseAttrParams = (): IdentifierAttrParam|null => {
        const originPos = pos;
        
        // if (!eatOpeningSquareBracket()) return null; // already eaten by `parseIdentifierType()`
        
        skipWhitespace();
        
        const name = parseIdentifierName();
        if (!name) { pos = originPos; return null; } // syntax error: missing name => revert changes & return null
        
        skipWhitespace();
        
        const operator = parseIdentifierAttrOperator();
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
            
            const options = parseIdentifierAttrOptions();
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



export const isWildParams = (identifierParams: IdentifierParams): identifierParams is string => {
    return (typeof(identifierParams) === 'string');
};
export const isSelectors = (identifierParams: IdentifierParams): identifierParams is SelectorList => {
    return (
        !isWildParams(identifierParams)
        &&
        identifierParams.some((part) => (typeof(part) !== 'string')) // contains at least 1 non-string (or Identifier, or readonly [])
    );
};
export const isIdentifierAttrParam = (identifierParams: IdentifierParams): identifierParams is IdentifierAttrParam => {
    return (
        !isWildParams(identifierParams)
        &&
        !identifierParams.some((part) => (typeof(part) !== 'string')) // NOT contains at least 1 non-string (or Identifier, or readonly [])
    );
};
const identifierParamsToString = (identifierParams: IdentifierParams|null|undefined): string => {
    if ((identifierParams === null) || (identifierParams === undefined)) return '';
    
    if (isWildParams(identifierParams)) return `(${identifierParams})`;
    
    if (isSelectors(identifierParams)) {
        return `(${
            identifierParams
            .map((selector): string => selectorToString(selector))
            .join(', ')
        })`;
    }
    else { // if isIdentifierAttrParam(identifierParams)
        const [
            name,
            operator,
            value,
            options,
        ] = identifierParams;
        
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



export const isCombinator = (part: Identifier|Combinator): part is Combinator => {
    return (typeof(part) === 'string');
};
export const isIdentifier = (part: Identifier|Combinator): part is Identifier => {
    return (typeof(part) !== 'string');
};
export const selectorToString = (selector: Selector): string => {
    return (
        selector
        .map((part): string => {
            if (isCombinator(part)) return part;
            
            const [
                identifierType,
                identifierName = '',
                identifierParams,
            ] = part; // isIdentifier(part)
            
            if (identifierType === '[') {
                return identifierParamsToString(identifierParams);
            }
            else {
                return `${identifierType}${identifierName}${identifierParamsToString(identifierParams)}`;
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



export const isSelector = (test: Identifier|Selector): test is Selector => {
    /*
        Identifier : always starts_with IdentifierType (string)
        Selector   : may separated by Combinator (string) but cannot starts_with Combinator (string)
    */
    return (typeof(test[0]) !== 'string'); // check the type of the first element
};
export type MapIdentifiersCallback = (identifier: Identifier) => Identifier|Selector
export const mapIdentifiers = (selectors: SelectorList, callbackFn: MapIdentifiersCallback): SelectorList => {
    return (
        selectors
        .map((selector) =>
            selector
            .map((part): Selector => {
                if (isCombinator(part)) return [part];
                
                
                
                let replacement = callbackFn(part); // isIdentifier(part)
                
                
                
                if (replacement === part) { // if not replaced by `callbackFn` (same by reference)
                    const [
                        , // skip: identifierType,
                        , // skip: identifierName = '',
                        identifierParams,
                    ] = part; // isIdentifier(part)
                    
                    if (identifierParams && isSelectors(identifierParams)) {
                        const oldSelectors = identifierParams;
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
                        
                        replacement = [...part.slice(2), newSelectors] as unknown as Identifier;
                    } // if
                } // if
                
                
                
                return isSelector(replacement) ? replacement : [replacement];
            })
            .flat()
        )
    );
};