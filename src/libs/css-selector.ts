export type IdentifierSpecialType = '&' | '*'
export type IdentifierNamedType   = '' | '#' | '.' | ':' | '::'
export type IdentifierType        = IdentifierSpecialType | IdentifierNamedType
export type IdentifierName        = string & {}
export type IdentifierParams      = Selector[] | string
export type Identifier            = | readonly [IdentifierSpecialType]
                                    | readonly [IdentifierNamedType  , IdentifierName]
                                    | readonly [IdentifierNamedType  , IdentifierName, IdentifierParams]
export type Combinator            = ' ' | '>' | '~' | '+'
export type Selector              = (Identifier|Combinator)[]



const whitespaceList              = [' ', '\n', '\r', '\t', '\f', '\v'];
const specialPseudoClassList      = ['is', 'where', 'not'];



export const parseSelectors = (expression: string): Selector[]|null => {
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
        if (char === '&') { pos++; return '&'; }
        if (char === '*') { pos++; return '*'; }
        if (char === '#') { pos++; return '#'; }
        if (char === '.') { pos++; return '.'; }
        if (char === ':') {
            pos++;
            if (expression[pos] === ':') { pos++; return '::'; }
            return ':'
        } // if
        return '';
    }
    const isValidIdentifierChar = (char: string): boolean => {
        if ((char >= 'a') && (char <= 'z')) return true;
        if ((char >= 'A') && (char <= 'Z')) return true;
        if ((char >= '0') && (char <= '9')) return true;
        if (char === '-') return true;
        if (char === '_') return true;
        return false;
    };
    const parseIdentifierName = (): string|null => {
        const originPos = pos;
        
        while (!isEof() && isValidIdentifierChar(expression[pos])) pos++; // move forward until out of valid chars
        if (pos === originPos) return null; // pos not moved => nothing to parse => null
        
        return expression.substring(originPos, pos);
    };
    const parseIdentifier = (): Identifier|null => {
        const originPos = pos;
        
        const type = parseIdentifierType();
        if ((type !== '&') && (type !== '*')) {
            const name = parseIdentifierName();
            if (!name) { pos = originPos; return null; } // revert changes & return null
            
            if (type === ':') { // pseudo class
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
                    if (wildParams !== null) return [
                        type,
                        name,
                        wildParams,
                    ];
                } // if
            } // if
            
            return [
                type,
                name,
            ];
        } // if
        
        return [
            type,
        ];
    };
    const parseCombinator = (): Combinator|null => {
        const originPos = pos;
        
        skipWhitespace();
        
        const char = expression[pos];
        if (char === '>') { pos++; return '>'; }
        if (char === '~') { pos++; return '~'; }
        if (char === '+') { pos++; return '+'; }
        if (pos > originPos) {
            const currentPos = pos;  // 1. backup
            if (parseIdentifier()) { // 2. destructive test
                pos = currentPos;    // 3. restore
                return ' ';
            } // if
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
    const eatNonBracket = (): boolean => {
        const originPos = pos;
        
        while (!isEof() && (expression[pos] !== '(') && (expression[pos] !== ')')) pos++;
        if (pos === originPos) return false; // pos not moved => nothing to eat => false
        
        return true;
    };
    const parseSelectors = (): Selector[]|null => {
        const originPos = pos;
        
        const selectors : Selector[] = [];
        
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
    const parseSelectorParams = (): Selector[]|null => {
        const originPos = pos;
        
        if (!eatOpeningBracket()) return null;
        
        const selectors = parseSelectors();
        
        if (!eatClosingBracket()) { pos = originPos; return null; } // revert changes & return null
        
        return selectors ?? []; // null => empty selector => empty array
    };
    
    
    
    const allSelectors = parseSelectors();
    if (!isEof()) return null; // syntax error: not all expression are valid selector
    return allSelectors;
};
const identifierParamsToString = (identifierParams: IdentifierParams|null|undefined): string => {
    if ((identifierParams === null) || (identifierParams === undefined)) return '';
    
    if (typeof(identifierParams) === 'string') return `(${identifierParams})`;
    
    return `(${
        identifierParams
        .map((selector) => selectorToString(selector))
        .join(', ')
    })`;
};
export const selectorToString = (selector: Selector): string => {
    return (
        selector
        .map((part) => {
            if (typeof(part) === 'string') return part; // combinator
            
            const [
                identifierType,
                identifierName = '',
                identifierParams,
            ] = part;
            
            return `${identifierType}${identifierName}${identifierParamsToString(identifierParams)}`;
        })
        .join('')
    );
};
export const splitSelectors = (expression: string): string[]|null => {
    const selectors = parseSelectors(expression);
    if (!selectors) return null;
    
    return (
        selectors
        .map((selector) => selectorToString(selector))
    );
};