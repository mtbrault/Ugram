module.exports = {
	extends: "eslint:recommended",
	rules: {
		/**
		 * Possible Errors
		 * These rules relate to possible syntax or logic errors in JavaScript code.
		 */
		/* ✓ enforce "for" loop update clause moving the counter in the right direction. */
		// "for-direction": "error",

		/* ✓ enforce `return` statements in getters. */
		/* { allowImplicit: false } */
		// "getter-return": ["error", { allowImplicit: true }],

		/* ✓ disallow using an async function as a Promise executor. */
		// "no-async-promise-executor": "error",

		/*   disallow `await` inside of loops. */
		"no-await-in-loop": "error",

		/* ✓ disallow comparing against -0. */
		// "no-compare-neg-zero": "error",

		/* ✓ disallow assignment operators in conditional expressions. */
		/* "except-parens" (default),  "always" */
		// "no-cond-assign": ["error", "always"],

		/*   disallow the use of `console`. */
		/* { allow: ["warn", "error", "log", ...methods] } */
		"no-console": "warn",

		/* ✓ disallow constant expressions in conditions. */
		/* { checkLoops: true } */
		// "no-constant-condition": ["error", { checkLoops: false }],

		/* ✓ disallow control characters in regular expressions. */
		// "no-control-regex": "error",

		/* ✓ disallow the use of `debugger`. */
		// "no-debugger": "error",

		/* ✓ disallow duplicate arguments in `function` definitions. */
		// "no-dupe-args": "error",

		/* ✓ disallow duplicate conditions in if-else-if chains. */
		// "no-dupe-else-if": "error",

		/* ✓ disallow duplicate keys in object literals. */
		// "no-dupe-keys": "error",

		/* ✓ disallow duplicate case labels. */
		// "no-duplicate-case": "error",

		/* ✓ disallow empty block statements. */
		/* { "allowEmptyCatch": false } */
		// "no-empty": ["error", { "allowEmptyCatch": true }],

		/* ✓ disallow empty character classes in regular expressions. */
		// "no-empty-character-class": "error",

		/* ✓ disallow reassigning exceptions in `catch` clauses. */
		// "no-ex-assign": "error",

		/* ✓ disallow unnecessary boolean casts. */
		// "no-extra-boolean-cast": "error",

		/*   disallow unnecessary parentheses. */
		/* "all" (default) | "functions" */
		/* only for the "all" option : {
				"conditionalAssign": true, allows extra parentheses around assignments in conditional test expressions.
				"returnAssign": true, allows extra parentheses around assignments in return statements.
				"nestedBinaryExpressions": false, allows extra parentheses in nested binary expressions.
				"ignoreJSX": "none(default)|all|multi-line|single-line", allows extra parentheses around no/all/multi-line/single-line JSX components.
				"enforceForArrowConditionals": false, allows extra parentheses around ternary expressions which are the body of an arrow function.
				"enforceForSequenceExpressions": false, allows extra parentheses around sequence expressions.
				"enforceForNewInMemberExpressions": false, allows extra parentheses around new expressions in member expressions.
		} */
		// "no-extra-parens": "error",

		/* ✓ disallow unnecessary semicolons. */
		// "no-extra-semi": "error",

		/* ✓ disallow reassigning `function` declarations. */
		// "no-func-assign": "error",

		/*   disallow assigning to imported bindings. */
		"no-import-assign": "error",

		/* ✓ disallow variable or `function` declarations in nested blocks. */
		/* "functions" (default) | "both" */
		// "no-inner-declarations": "error",

		/* ✓ disallow invalid regular expression strings in `RegExp` constructors. */
		/* see doc for params */
		// "no-invalid-regexp": "error",

		/* ✓ disallow irregular whitespace. */
		/* {
			"skipStrings": true, (default) allows any whitespace characters in string literals.
			"skipComments": false, allows any whitespace characters in comments.
			"skipRegExps": false, allows any whitespace characters in regular expression literals.
			"skipTemplates": false, allows any whitespace characters in template literals.
		} */
		// "no-irregular-whitespace": "error",

		/* ✓ disallow characters which are made with multiple code points in character class syntax. */
		// "no-misleading-character-class": "error",

		/* ✓ disallow calling global object properties as functions. */
		// "no-obj-calls": "error",

		/* ✓ disallow calling some `Object.prototype` methods directly on objects. */
		// "no-prototype-builtins": "error",

		/* ✓ disallow multiple spaces in regular expressions. */
		// "no-regex-spaces": "error",

		/*   disallow returning values from setters. */
		"no-setter-return": "error",

		/* ✓ disallow sparse arrays. */
		// "no-sparse-arrays": "error",

		/*   disallow template literal placeholder syntax in regular strings. */
		"no-template-curly-in-string": "error",

		/* ✓ disallow confusing multiline expressions. */
		// "no-unexpected-multiline": "error",

		/* ✓ disallow unreachable code after `return`, `throw`, `continue`, and `break` statements. */
		// "no-unreachable": "error",

		/* ✓ disallow control flow statements in `finally` blocks. */
		// "no-unsafe-finally": "error",

		/* ✓ disallow negating the left operand of relational operators. */
		/* { "enforceForOrderingRelations": false } (default) allows negation of the left-hand side of ordering relational operators */
		"no-unsafe-negation": ["error", { enforceForOrderingRelations: true }],

		/*   disallow useless backreferences in regular expressions. Only from ESlint 7 */
		// "no-useless-backreference": "error",

		/*   disallow assignments that can lead to race conditions due to usage of `await` or `yield`. */
		// "require-atomic-updates": "error",

		/* ✓ require calls to `isNaN()` when checking for `NaN`. */
		/* see docs */
		// "use-isnan": "error",

		/* ✓ enforce comparing `typeof` expressions against valid strings. */
		/* "requireStringLiterals": true requires typeof expressions to only be compared to string literals or other typeof expressions */
		"valid-typeof": ["error", { "requireStringLiterals": true }],

		/**
		 * Best Practices
		 * These rules relate to better ways of doing things to help you avoid problems.
		 */
		/*   enforce getter and setter pairs in objects and classes. */
		/* {
			"enforceForClassMembers": false,  additionally applies this rule to class getters/setters.
			"getWithoutSet": false, will warn for getters without setters.
			"setWithoutGet": true, will warn for setters without getters.
		} */
		"accessor-pairs": [
			"error",
			{
				enforceForClassMembers: true,
				getWithoutSet: false,
				setWithoutGet: true
			}
		],

		/*   enforce `return` statements in callbacks of array methods. */
		/* "allowImplicit": false (default), allows implicitly returning undefined with a return statement containing no expression. */
		"array-callback-return": "error",

		/*   enforce the use of variables within the scope they are defined. no need if using no-var */
		// "block-scoped-var": "error",

		/*   enforce that class methods utilize `this`. */
		/* exceptMethods: ["method1", ...methods] array of method names for which you would like to ignore warnings. */
		"class-methods-use-this": "error",

		/*   enforce a maximum cyclomatic complexity allowed in a program. */
		/* { max: 20 } (default)*/
		"complexity": "warn",

		/*   require `return` statements to either always or never specify values. */
		/* "treatUndefinedAsUnspecified": false (default) always either specify values or return undefined implicitly only. */
		"consistent-return": ["error", { treatUndefinedAsUnspecified: true }],

		/*   enforce consistent brace style for all control statements. */
		/* "all (default) | multi | multi-line | multi-or-nest", "consistent" (if using a multi*) */
		"curly": "error",

		/*   require `default` cases in `switch` statements. */
		/* optionally include a `// no default` after the last case if there is no default */
		/* { commentPattern: /^no default$/i } */
		"default-case": "error",

		/*   enforce default clauses in switch statements to be last. Only from ESlint 7 */
		// "default-case-last": "error",

		/*   enforce default parameters to be last. */
		"default-param-last": "error",

		/*   enforce consistent newlines before and after dots. */
		/* "object" (default), the dot in a member expression should be on the same line as the object portion. */
		/* "property", the dot in a member expression should be on the same line as the property portion. */
		"dot-location": ["error", "property"],

		/*   enforce dot notation whenever possible. */
		/* see docs */
		"dot-notation": "error",

		/*   require the use of `===` and `!==`. */
		/* see docs */
		"eqeqeq": "error",

		/*   require grouped accessor pairs in object literals and classes. */
		/* "anyOrder (default) | getBeforeSet | setBeforeGet" */
		"grouped-accessor-pairs": ["error", "getBeforeSet"],

		/*   require `for-in` loops to include an `if` statement. */
		"guard-for-in": "error",

		/*   enforce a maximum number of classes per file. */
		/* This rule has a numeric option (defaulted to 1) to specify the maximum number of classes. */
		// "max-classes-per-file": ["error", 1],

		/*   disallow the use of `alert`, `confirm`, and `prompt`. */
		"no-alert": "error",

		/*   disallow the use of `arguments.caller` or `arguments.callee`. */
		"no-caller": "error",

		/* ✓ disallow lexical declarations in case clauses. */
		// "no-case-declarations": "error",

		/*   disallow returning value from constructor. */
		"no-constructor-return": "error",

		/*   disallow division operators explicitly at the beginning of regular expressions. */
		// "no-div-regex": "error",

		/*   disallow `else` blocks after `return` statements in `if` statements. */
		/* allowElseIf: true (default), allows else if blocks after a return */
		"no-else-return": ["error", { allowElseIf: false }],

		/*   disallow empty functions. */
		/* see docs */
		// "no-empty-function": "error",

		/* ✓ disallow empty destructuring patterns. */
		// "no-empty-pattern": "error",

		/*   disallow `null` comparisons without type-checking operators. */
		"no-eq-null": "error",

		/*   disallow the use of `eval()`. */
		/* { "allowIndirect": false } */
		"no-eval": "error",

		/*   disallow extending native types. */
		/* { "exceptions": ["Object", ...types] } */
		"no-extend-native": "error",

		/*   disallow unnecessary calls to `.bind()`. */
		"no-extra-bind": "error",

		/*   disallow unnecessary labels. */
		"no-extra-label": "error",

		/* ✓ disallow fallthrough of `case` statements. */
		/* { "commentPattern": /falls?\s?through/i } */
		// "no-fallthrough": "error",

		/*   disallow leading or trailing decimal points in numeric literals. */
		"no-floating-decimal": "error",

		/* ✓ disallow assignments to native objects or read-only global variables. */
		/* { "exceptions": ["Object", ...exeptions] } default [] */
		// "no-global-assign": "error",

		/*   disallow shorthand type conversions. */
		/* "boolean" (true by default) - When this is true, this rule warns shorter type conversions for boolean type. */
		/* "number" (true by default) - When this is true, this rule warns shorter type conversions for number type. */
		/* "string" (true by default) - When this is true, this rule warns shorter type conversions for string type. */
		/* "allow" (empty by default) - Each entry in this array can be one of ~, !!, + or * that are to be allowed. */
		"no-implicit-coercion": [
			"error",
			{
				"boolean": false,
				"number": true,
				"string": true,
			}
		],

		/*   disallow declarations in the global scope. */
		/* "lexicalBindings" to true if you want this rule to check const, let and class declarations as well. */
		"no-implicit-globals": "error",

		/*   disallow the use of `eval()`-like methods. */
		"no-implied-eval": "error",

		/*   disallow `this` keywords outside of classes or class-like objects. */
		/* "capIsConstructor": false (default true) disables the assumption that a function which name starts with an uppercase is a constructor. */
		// "no-invalid-this": "error",

		/*   disallow the use of the `__iterator__` property. */
		"no-iterator": "error",

		/*   disallow labeled statements. */
		/* "allowLoop" (default is false) If this option was set true, this rule ignores labels which are sticking to loop statements. */
		/* "allowSwitch" (default is false) If this option was set true, this rule ignores labels which are sticking to switch statements. */
		"no-labels": "error",

		/*   disallow unnecessary nested blocks. */
		"no-lone-blocks": "error",

		/*   disallow function declarations that contain unsafe references inside loop statements. */
		"no-loop-func": "error",

		/*   disallow magic numbers. */
		/* see doc */
		// "no-magic-numbers": "error",

		/*   disallow multiple spaces. */
		/* "ignoreEOLComments": true (defaults to false) ignores multiple spaces before comments that occur at the end of lines */
		/* "exceptions": { "Property": true } ("Property" is the only node specified by default) specifies nodes to ignore */
		"no-multi-spaces": "error",

		/*   disallow multiline strings. */
		"no-multi-str": "error",

		/*   disallow `new` operators outside of assignments or comparisons. */
		"no-new": "error",

		/*   disallow `new` operators with the `Function` object. */
		"no-new-func": "error",

		/*   disallow `new` operators with the `String`, `Number`, and `Boolean` objects. */
		"no-new-wrappers": "error",

		/* ✓ disallow octal literals. */
		// "no-octal": "error",

		/*   disallow octal escape sequences in string literals. */
		"no-octal-escape": "error",

		/*   disallow reassigning `function` parameters. */
		/* see docs */
		// "no-param-reassign": "error",

		/*   disallow the use of the `__proto__` property. */
		"no-proto": "error",

		/* ✓ disallow variable redeclaration. */
		/* "builtinGlobals" option will check for redeclaration of built-in globals in global scope. */
		// "no-redeclare": "error",

		/*   disallow certain properties on certain objects. */
		/* see docs */
		// "no-restricted-properties": "error",

		/*   disallow assignment operators in `return` statements. */
		/* "except-parens (default) | always" */
		"no-return-assign": ["error", "always"],

		/*   disallow unnecessary `return await`. */
		"no-return-await": "error",

		/*   disallow `javascript:` urls. */
		"no-script-url": "error",

		/* ✓ disallow assignments where both sides are exactly the same. */
		/* "props" if this is true, no-self-assign rule warns self-assignments of properties. Default is true */
		"no-self-assign": ["error", { props: true }],

		/*   disallow comparisons where both sides are exactly the same. */
		"no-self-compare": "error",

		/*   disallow comma operators. */
		"no-sequences": "error",

		/*   disallow throwing literals as exceptions. */
		"no-throw-literal": "error",

		/*   disallow unmodified loop conditions. */
		"no-unmodified-loop-condition": "error",

		/*   disallow unused expressions. */
		/* allowShortCircuit set to true will allow you to use short circuit evaluations in your expressions (Default: false). */
		/* allowTernary set to true will enable you to use ternary operators in your expressions similarly to short circuit evaluations (Default: false). */
		/* allowTaggedTemplates set to true will enable you to use tagged template literals in your expressions (Default: false). */
		"no-unused-expressions": [
			"error",
			{
				"allowShortCircuit": true,
				"allowTernary": false,
				"allowTaggedTemplates": false,
			}
		],

		/* ✓ disallow unused labels. */
		// "no-unused-labels": "error",

		/*   disallow unnecessary calls to `.call()` and `.apply()`. */
		"no-useless-call": "error",

		/* ✓ disallow unnecessary `catch` clauses. */
		// "no-useless-catch": "error",

		/*   disallow unnecessary concatenation of literals or template literals. */
		"no-useless-concat": "error",

		/* ✓ disallow unnecessary escape characters. */
		// "no-useless-escape": "error",

		/*   disallow redundant return statements. */
		"no-useless-return": "error",

		/*   disallow `void` operators. */
		"no-void": "error",

		/*   disallow specified warning terms in comments. */
		/* "terms": optional array of terms to match. Defaults to ["todo", "fixme", "xxx"]. Terms are matched case-insensitive and as whole words */
		/* "location": "start | anywhere" optional string that configures where in your comments to check for matches. Defaults to "start". */
		"no-warning-comments": "warn",

		/* ✓ disallow `with` statements. */
		// "no-with": "error",

		/*   enforce using named capture group in regular expression. */
		// "prefer-named-capture-group": "error",

		/*   require using Error objects as Promise rejection reasons. */
		/* allowEmptyReject: true (false by default) allows calls to Promise.reject() with no arguments. */
		"prefer-promise-reject-errors": ["error", { allowEmptyReject: true }],

		/*   disallow use of the `RegExp` constructor in favor of regular expression literals. */
		"prefer-regex-literals": "error",

		/*   enforce the consistent use of the radix argument when using `parseInt()`. */
		/* "always" enforces providing a radix (default) */
		/* "as-needed" disallows providing the 10 radix */
		"radix": "error",

		/*   disallow async functions which have no `await` expression. */
		// "require-await": "error",

		/*   enforce the use of `u` flag on RegExp. */
		// "require-unicode-regexp": "error",

		/*   require `var` declarations be placed at the top of their containing scope. */
		// "vars-on-top": "error",

		/*   require parentheses around immediate `function` invocations. */
		/* "outside (default) | inside | any" */
		/* "functionPrototypeMethods": true additionally enforces wrapping function expressions invoked using .call and .apply. The default is false. */
		"wrap-iife": ["error", "inside"],

		/*   require or disallow "Yoda" conditions. */
		/* see docs */
		"yoda": "error",


		/**
		 * Strict Mode
		 * These rules relate to strict mode directives
		 */
		/*   require or disallow strict mode directives. */
		/* see docs */
		// "strict": "error",


		/**
		 * Variables
		 * These rules relate to variable declarations.
		 */
		/*   require or disallow initialization in variable declarations. */
		/* The rule takes two options:
		/* - A string which must be either "always" (the default), to enforce initialization at declaration, or "never" to disallow initialization during declaration. */
		/*   This rule applies to var, let, and const variables, however "never" is ignored for const variables, as unassigned consts generate a parse error. */
		/* - An object that further controls the behavior of this rule. Currently, the only available parameter is ignoreForLoopInit, */
		/*   which indicates if initialization at declaration is allowed in for loops when "never" is set, since it is a very typical use case. */
		// "init-declarations": "error",

		/* ✓ disallow deleting variables. */
		// "no-delete-var": "error",

		/*   disallow labels that share a name with a variable. */
		"no-label-var": "error",

		/*   disallow specified global variables. */
		/* params: globals to restrict */
		"no-restricted-globals": ["error", "event"],

		/*   disallow variable declarations from shadowing variables declared in the outer scope. */
		/* This rule takes one option, an object, with properties "builtinGlobals", "hoist" and "allow" */
		/* builtinGlobals option is false by default. If it is true, the rule prevents shadowing of built-in global variables: Object, Array, Number, and so on. */
		/* The hoist option has three settings: */
		/* - "functions" (by default) reports shadowing before the outer functions are defined. */
		/* - "all" reports all shadowing before the outer variables/functions are defined. */
		/* - "never" never report shadowing before the outer variables/functions are defined. */
		/* The allow option is an array of identifier names for which shadowing is allowed. For example, "resolve", "reject", "done", "cb" */
		"no-shadow": ["error", { "builtinGlobals": true }],

		/* ✓ disallow identifiers from shadowing restricted names. */
		// "no-shadow-restricted-names": "error",

		/* ✓ disallow the use of undeclared variables unless mentioned in /*global * / comments. */
		/* typeof set to true will warn for variables used inside typeof check (Default false). */
		// "no-undef": "error",

		/*   disallow initializing variables to `undefined`. */
		"no-undef-init": "error",

		/*   disallow the use of `undefined` as an identifier. */
		// "no-undefined": "error",

		/* ✓ disallow unused variables. */
		/* In environments outside of CommonJS or ECMAScript modules, you may use var to create a global variable that may be used by other scripts. */
		/* You can use the /* exported variableName * / comment block to indicate that this variable is being exported and therefore should not be considered unused. */
		/* Note that /* exported * / has no effect for any of the following: */
		/* - when the environment is node or commonjs */
		/* - when parserOptions.sourceType is module */
		/* - when ecmaFeatures.globalReturn is true */
		/* The line comment // exported variableName will not work as exported is not line-specific. */
		/* This rule takes one argument which can be a string or an object. The string settings are the same as those of the vars property */
		/* By default this rule is enabled with "all" option for variables and "after-used" for arguments. ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }] */
		/* The vars option has two settings: */
		/* - all checks all variables for usage, including those in the global scope. This is the default setting. */
		/* - local checks only that locally-declared variables are used but will allow global variables to be unused. */
		/* The varsIgnorePattern option specifies exceptions not to check for usage: variables whose names match a regexp pattern. */
		/* The args option has three settings: */
		/* - "after-used" unused positional arguments that occur before the last used argument will not be checked, but all named arguments and all positional arguments after the last used argument will be checked. */
		/* - "all" named arguments must be used. */
		/* - "none" do not check arguments. */
		/* The ignoreRestSiblings option (default: false). Using a Rest Property it is possible to "omit" properties from an object, but by default the sibling properties are marked as "unused". */
		/* With this option enabled the rest property's siblings are ignored. */
		/* The argsIgnorePattern option specifies exceptions not to check for usage: arguments whose names match a regexp pattern. */
		/* The caughtErrors option is used for catch block arguments validation. It has two settings: */
		/* - "none" do not check error objects. This is the default setting. */
		/* - "all" all named arguments must be used. */
		/* The caughtErrorsIgnorePattern option specifies exceptions not to check for usage: catch arguments whose names match a regexp pattern. */
		"no-unused-vars": [
			"error",
			{
				"vars": "all",
				"args": "after-used",
				"ignoreRestSiblings": true,
				"argsIgnorePattern": "^_",
				"caughtErrors": "all",
				"caughtErrorsIgnorePattern": "^_",
			}
		],

		/*   disallow the use of variables before they are defined. */
		/* "functions" (boolean) - The flag which shows whether or not this rule checks function declarations. If this is true, this rule warns every reference to a function before the function declaration. */
		/* Otherwise, ignores those references. Function declarations are hoisted, so it's safe. Default is true. */
		/* "classes" (boolean) - The flag which shows whether or not this rule checks class declarations of upper scopes. If this is true, this rule warns every reference to a class before the class declaration. */
		/* Otherwise, ignores those references if the declaration is in upper function scopes. Class declarations are not hoisted, so it might be danger. Default is true. */
		/* "variables" (boolean) - This flag determines whether or not the rule checks variable declarations in upper scopes. If this is true, the rule warns every reference to a variable before the variable declaration.
		/* Otherwise, the rule ignores a reference if the declaration is in an upper scope, while still reporting the reference if it's in the same scope as the declaration. Default is true. */
		/* This rule accepts "nofunc" string as an option. "nofunc" is the same as { "functions": false, "classes": true }. */
		// "no-use-before-define": "error",


		/**
		 * Node.js and CommonJS
		 * These rules relate to code running in Node.js, or in browsers with CommonJS.
		 */
		/*   require `return` statements after callbacks. */
		/* The rule takes a single option, an array of possible callback names which may include object methods. The default callback names are callback, cb, next */
		// "callback-return": "error",

		/*   require `require()` calls to be placed at top-level module scope. */
		// "global-require": "error",

		/*   require error handling in callbacks. */
		/* The rule takes a single string option: the name of the error parameter (or regexp with ^). The default is "err" */
		"handle-callback-err": "warn",

		/*   disallow use of the `Buffer()` constructor. */
		"no-buffer-constructor": "error",

		/*   disallow `require` calls to be mixed with regular variable declarations. */
		/* default { "grouping": false, "allowCall": false } */
		"no-mixed-requires": ["error", { "grouping": true, "allowCall": true }],

		/*   disallow `new` operators with calls to `require`. */
		"no-new-require": "error",

		/*   disallow string concatenation with `__dirname` and `__filename`. */
		"no-path-concat": "error",

		/*   disallow the use of `process.env`. */
		// "no-process-env": "error",

		/*   disallow the use of `process.exit()`. */
		// "no-process-exit": "error",

		/*   disallow specified modules when loaded by `require`. */
		/* The rule takes one or more strings as options: the names of restricted modules. */
		// "no-restricted-modules": "error",

		/*   disallow synchronous methods. */
		/* { allowAtRootLevel: false }, determines whether synchronous methods should be allowed at the top level of a file, outside of any functions. */
		// "no-sync": "error",


		/**
		 * Stylistic Issues
		 * These rules relate to style guidelines, and are therefore quite subjective.
		 */
		/*   enforce linebreaks after opening and before closing array brackets. */
		/* either string option or object option (Requires line breaks if any of properties is satisfied. Otherwise, disallows line breaks) */
		/* "never | always | consistent" */
		/* "multiline": true (default) requires line breaks if there are line breaks inside elements or between elements. */
		/* "minItems": null (default) requires line breaks if the number of elements is at least the given integer. If this is 0, this condition will act the same as the option "always". */
		"array-bracket-newline": ["error", "consistent"],

		/*   enforce consistent spacing inside array brackets. */
		/* This rule has a string option and an object option */
		/* "never (default) | always" */
		/* "singleValue" requires one or more spaces or newlines inside brackets of array literals that contain a single element
		/* "objectsInArrays" requires one or more spaces or newlines between brackets of array literals and braces of their object literal elements
		/* "arraysInArrays" requires one or more spaces or newlines between brackets of array literals and brackets of their array literal elements */
		"array-bracket-spacing": ["error", "never"],

		/*   enforce line breaks after each array element. */
		/* either string option or object option */
		/* "always (default) | never | consistent" */
		/* "multiline": <boolean> requires line breaks if there are line breaks inside elements. */
		/* "minItems": <number> requires line breaks if the number of elements is at least the given integer. If this is 0, this condition will act the same as the option "always" */
		"array-element-newline": ["error", "consistent"],

		/*   disallow or enforce spaces inside of blocks after opening block and before closing block. */
		/* "always (default) | never" */
		"block-spacing": "error",

		/*   enforce consistent brace style for blocks. */
		/* "1tbs (default) | stroustrup | allman" */
		/* "allowSingleLine": true (default false) allows the opening and closing braces for a block to be on the same line */
		"brace-style": ["error", "1tbs"],

		/*   enforce camelcase naming convention. */
		/* "properties": "always | never" */
		/* "ingnoreDesctructuring": bool */
		/* "ingnoreImports": bool */
		"camelcase": ["error", { "properties": "always", "ignoreDestructuring": false, "ignoreImports": false }],

		/*   enforce or disallow capitalization of the first letter of a comment. */
		/* "always | never" */
		/* ignorePattern: string representing a regular expression pattern of words that should be ignored by this rule. */
		/* ignoreInlineComments: the rule will not report on comments in the middle of code. By default, this is false. */
		/* ignoreConsecutiveComments: the rule will not report on a comment which violates the rule, as long as the comment immediately follows another comment. By default, this is false. */
		"capitalized-comments": ["warn", "always"],

		/*   require or disallow trailing commas. */
		/* either string option or object option */
		/* "never (default) | always | always-multiline | only-multiline" */
		/* { "arrays": "never", "objects": "never", "imports": "never", "exports": "never", "functions": "never" } */
		"comma-dangle": ["error", "always-multiline"],

		/*   enforce consistent spacing before and after commas. */
		/* { before: false, after: true } */
		"comma-spacing": ["error", { "before": false, "after": true }],

		/*   enforce consistent comma style. */
		/* see docs */
		"comma-style": ["error", "last"],

		/*   enforce consistent spacing inside computed property brackets. */
		/* "never (default) | always" */
		/* { "enforceForClassMembers": false } */
		"computed-property-spacing": ["error", "never"],

		/*   enforce consistent naming when capturing the current execution context. */
		/* designated alias names for this (default "that") */
		// "consistent-this": "error",

		/*   require or disallow newline at the end of files. */
		/* "always (default) | never" */
		"eol-last": "error",

		/*   require or disallow spacing between function identifiers and their invocations. */
		/* "never (default) | always" */
		/* in always mode : { allowNewLines: false } */
		"func-call-spacing": ["error", "never"],

		/*   require function names to match the name of the variable or property to which they are assigned. */
		/* optional string of "always" or "never" (default always if omitted) */
		/* { "considerPropertyDescriptor": false, includeCommonJSModuleExports: false } */
		"func-name-matching": ["error", { "considerPropertyDescriptor": true }],

		/*   require or disallow named `function` expressions. */
		/* "always" (default) | "as-needed" | "never" */
		/* { "generators": "always" | "as-needed" | "never" } */
		"func-names": ["error", "never"],

		/*   enforce the consistent use of either `function` declarations or expressions. */
		/* This rule has a string option: */
		/* - "expression" (default) requires the use of function expressions instead of function declarations */
		/* - "declaration" requires the use of function declarations instead of function expressions */
		/* This rule has an object option for an exception: { "allowArrowFunctions": false } allows the use of arrow functions (honoured only when using declaration) */
		// "func-style": "error",

		/*   enforce line breaks between arguments of a function call. */
		/* "always" (default) requires line breaks between arguments */
		/* "never" disallows line breaks between arguments */
		/* "consistent" requires consistent usage of line breaks between arguments */
		"function-call-argument-newline": ["error", "consistent"],

		/*   enforce consistent line breaks inside function parentheses. */
		/* "always" requires line breaks inside all function parentheses. */
		/* "never" disallows line breaks inside all function parentheses. */
		/* "multiline" (default) requires linebreaks inside function parentheses if any of the parameters/arguments have a line break between them. Otherwise, it disallows linebreaks. */
		/* "multiline-arguments" works like multiline but allows linebreaks inside function parentheses if there is only one parameter/argument. */
		/* "consistent" requires consistent usage of linebreaks for each pair of parentheses. */
		/* { "minItems": value } requires linebreaks inside function parentheses if the number of parameters/arguments is at least value. Otherwise, it disallows linebreaks. */
		"function-paren-newline": ["error", "consistent"],

		/*   disallow specified identifiers. */
		/* The rule takes one or more strings as options: the names of restricted identifiers. */
		// "id-blacklist": "error",

		/*   enforce minimum and maximum identifier lengths. */
		/* This rule has an object option: */
		/* "min" (default: 2) enforces a minimum identifier length */
		/* "max" (default: Infinity) enforces a maximum identifier length */
		/* "properties": always (default) enforces identifier length convention for property names */
		/* "properties": never ignores identifier length convention for property names */
		/* "exceptions" allows an array of specified identifier names */
		// "id-length": "error",

		/*   require identifiers to match a specified regular expression. */
		/* This rule has a string option for the specified regular expression. */
		// "id-match": "error",

		/*   enforce the location of arrow function bodies with implicit return. */
		/* "beside" (default) disallows a newline before an arrow function body. */
		/* "below" requires a newline before an arrow function body. */
		"implicit-arrow-linebreak": ["error", "beside"],

		/*   enforce consistent indentation. */
		/* This rule has a mixed option: */
		/* For example, for 2-space indentation: ["error", 2] */
		/* Or for tabbed indentation: ["error", "tab"] */
		/* see doc for full config */
		"indent": ["error", "tab"],

		/*   enforce the consistent use of either double or single quotes in JSX attributes. */
		/* "prefer-double" (default) enforces the use of double quotes for all JSX attribute values that don't contain a double quote.
		/* "prefer-single" enforces the use of single quotes for all JSX attribute values that don’t contain a single quote. */
		"jsx-quotes": "error",

		/*   enforce consistent spacing between keys and values in object literal properties. */
		/* see docs */
		"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],

		/*   enforce consistent spacing before and after keywords. */
		/* see docs */
		"keyword-spacing": "error",

		/*   enforce position of line comments. */
		/* see docs */
		// "line-comment-position": "error",

		/*   enforce consistent linebreak style. */
		/* "unix (default) | windows" */
		"linebreak-style": ["error", "unix"],

		/*   require empty lines around comments. */
		/* see docs */
		// "lines-around-comment": "error",

		/*   require or disallow an empty line between class members. */
		/* "always (default) | never" */
		/* { "exceptAfterSingleLine": false } */
		"lines-between-class-members": ["error", "always"],

		/*   enforce a maximum depth that blocks can be nested. */
		/* "max" (default 4) */
		"max-depth": "warn",

		/*   enforce a maximum line length. */
		/* see docs */
		"max-len": "error",

		/*   enforce a maximum number of lines per file. */
		/* "max" (default 300) enforces a maximum number of lines in a file
		/* "skipBlankLines": true ignore lines made up purely of whitespace.
		/* "skipComments": true ignore lines containing just comments */
		// "max-lines": "error",

		/*   enforce a maximum number of line of code in a function. */
		/* "max" (default 50) enforces a maximum number of lines in a function.
	 	/* "skipBlankLines" (default false) ignore lines made up purely of whitespace. */
		/* "skipComments" (default false) ignore lines containing just comments. */
		/* "IIFEs" (default false) include any code included in IIFEs. */
		/* Alternatively, you may specify a single integer for the max option */
		// "max-lines-per-function": "error",

		/*   enforce a maximum depth that callbacks can be nested. */
		/* "max" (default 10) or number */
		"max-nested-callbacks": ["warn", { "max": 4 }],

		/*   enforce a maximum number of parameters in function definitions. */
		"max-params": ["warn", { "max": 4 }],

		/*   enforce a maximum number of statements allowed in function blocks. */
		/* "max" (default 10) */
		/* "ignoreTopLevelFunctions": true ignores top-level functions */
		// "max-statements": "error",

		/*   enforce a maximum number of statements allowed per line. */
		/* The "max" object property is optional (default: 1). */
		"max-statements-per-line": "error",

		/*   enforce a particular style for multiline comments. */
		/* "starred-block" (default): Disallows consecutive line comments in favor of block comments. Additionally, requires block comments to have an aligned * character before each line. */
		/* "bare-block": Disallows consecutive line comments in favor of block comments, and disallows block comments from having a "*" character before each line. */
		/* "separate-lines": Disallows block comments in favor of consecutive line comments. */
		/* The rule always ignores directive comments such as /* eslint-disable * /. Additionally, unless the mode is "starred-block", the rule ignores JSDoc comments. */
		/* "multiline-comment-style": "error",

		/*   enforce newlines between operands of ternary expressions. */
		/* "always" (default) enforces newlines between the operands of a ternary expression. */
		/* "always-multiline" enforces newlines between the operands of a ternary expression if the expression spans multiple lines. */
		/* "never" disallows newlines between the operands of a ternary expression (enforcing that the entire ternary expression is on one line). */
		// "multiline-ternary": "error",

		/*   require constructor names to begin with a capital letter. */
		/* "newIsCap": true (default) requires all new operators to be called with uppercase-started functions.
		/* "newIsCap": false allows new operators to be called with lowercase-started or uppercase-started functions. */
		/* "capIsNew": true (default) requires all uppercase-started functions to be called with new operators. */
		/* "capIsNew": false allows uppercase-started functions to be called without new operators. */
		/* "newIsCapExceptions" allows specified lowercase-started function names to be called with the new operator. */
		/* "newIsCapExceptionPattern" allows any lowercase-started function names that match the specified regex pattern to be called with the new operator. */
		/* "capIsNewExceptions" allows specified uppercase-started function names to be called without the new operator. */
		/* "capIsNewExceptionPattern" allows any uppercase-started function names that match the specified regex pattern to be called without the new operator. */
		/* "properties": true (default) enables checks on object properties */
		/* "properties": false disables checks on object properties   */
		"new-cap": [
			"error",
			{
				"newIsCap": true,
				"capIsNew": true,
				"properties": true,
			}
		],

		/*   enforce or disallow parentheses when invoking a constructor with no arguments. */
		/* "always (default) | never" */
		"new-parens": "error",

		/*   require a newline after each call in a method chain. */
		/* "ignoreChainWithDepth" (default: 2) allows chains up to a specified depth. */
		// "newline-per-chained-call": "error",

		/*   disallow `Array` constructors. */
		"no-array-constructor": "error",

		/*   disallow bitwise operators. */
		/* "allow": Allows a list of bitwise operators to be used as exceptions. */
		/* "int32Hint": Allows the use of bitwise OR in |0 pattern for type casting. */
		// "no-bitwise": "error",

		/*   disallow `continue` statements. */
		// "no-continue": "error",

		/*   disallow inline comments after code. */
		// "no-inline-comments": "error",

		/*   disallow `if` statements as the only statement in `else` blocks. */
		"no-lonely-if": "error",

		/*   disallow mixed binary operators. */
		/* see docs */
		"no-mixed-operators": "error",

		/* ✓ disallow mixed spaces and tabs for indentation. */
		/* "smart-tabs" string allows mixed tabs and spaces when the spaces are used for alignment. */
		// "no-mixed-spaces-and-tabs": "error",

		/*   disallow use of chained assignment expressions. */
		"no-multi-assign": "error",

		/*   disallow multiple empty lines. */
		/* "max" (default: 2) enforces a maximum number of consecutive empty lines.
		/* "maxEOF" enforces a maximum number of consecutive empty lines at the end of files.
		/* "maxBOF" enforces a maximum number of consecutive empty lines at the beginning of files. */
		"no-multiple-empty-lines": [
			"error",
			{
				"max": 2,
				"maxEOF": 0,
			}
		],

		/*   disallow negated conditions. */
		// "no-negated-condition": "error",

		/*   disallow nested ternary expressions. */
		"no-nested-ternary": "error",

		/*   disallow `Object` constructors. */
		"no-new-object": "error",

		/*   disallow the unary operators `++` and `--`. */
		/* "allowForLoopAfterthoughts": true allows unary operators ++ and -- in the afterthought (final expression) of a for loop. */
		// "no-plusplus": "error",

		/*   disallow specified syntax. */
		/* see docs */
		"no-restricted-syntax": [
			"error",
			"WithStatement",
			{
				"selector": "ForInStatement",
				"message": "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
			}
		],

		/*   disallow all tabs. */
		/* allowIndentationTabs (default: false): If this is set to true, then the rule will not report tabs used for indentation */
		"no-tabs": ["error", { "allowIndentationTabs": true }],

		/*   disallow ternary operators. */
		// "no-ternary": "error",

		/*   disallow trailing whitespace at the end of lines. */
		/* "skipBlankLines": false (default) disallows trailing whitespace on empty lines
		/* "skipBlankLines": true allows trailing whitespace on empty lines
		/* "ignoreComments": false (default) disallows trailing whitespace in comment blocks
		/* "ignoreComments": true allows trailing whitespace in comment blocks */
		"no-trailing-spaces": "error",

		/*   disallow dangling underscores in identifiers. */
		/* "allow" allows specified identifiers to have dangling underscores */
		/* "allowAfterThis": false (default) disallows dangling underscores in members of the this object */
		/* "allowAfterSuper": false (default) disallows dangling underscores in members of the super object */
		/* "allowAfterThisConstructor": false (default) disallows dangling underscores in members of the this.constructor object */
		/* "enforceInMethodNames": false (default) allows dangling underscores in method names */
		// "no-underscore-dangle": "error",

		/*   disallow ternary operators when simpler alternatives exist. */
		/* "defaultAssignment": true (default) allows the conditional expression as a default assignment pattern */
		"no-unneeded-ternary": "error",

		/*   disallow whitespace before properties. */
		"no-whitespace-before-property": "error",

		/*   enforce the location of single-line statements. */
		/* see docs */
		// "nonblock-statement-body-position": "error",

		/*   enforce consistent line breaks inside braces. */
		/* see docs */
		// "object-curly-newline": "error",

		/*   enforce consistent spacing inside braces. */
		/* see docs */
		"object-curly-spacing": ["error", "always"],

		/*   enforce placing object properties on separate lines. */
		/* { allowAllPropertiesOnSameLine: false } */
		// "object-property-newline": "error",

		/*   enforce variables to be declared either together or separately in functions. */
		/* see docs */
		"one-var": ["error", "never"],

		/*   require or disallow newlines around variable declarations. */
		/* "initializations" (default) enforces a newline around variable initializations */
		/* "always" enforces a newline around variable declarations */
		"one-var-declaration-per-line": "error",

		/*   require or disallow assignment operator shorthand where possible. */
		/* "always (default) | never" */
		"operator-assignment": ["error", "always"],

		/*   enforce consistent linebreak style for operators. */
		/* "after | before | none", { "overrides": {} } */
		/* default: "after", { "overrides": { "?": "before", ":": "before" } } */
		"operator-linebreak": "error",

		/*   require or disallow padding within blocks. */
		/* see docs */
		"padded-blocks": ["error", "never"],

		/*   require or disallow padding lines between statements. */
		/* see docs */
		"padding-line-between-statements": [
			"error",
			{
				"blankLine": "always",
				"prev": "multiline-block-like",
				"next": "*",
			}
		],

		/*   disallow the use of `Math.pow` in favor of the `**` operator. */
		"prefer-exponentiation-operator": "error",

		/*   disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead.. */
		"prefer-object-spread": "error",

		/*   require quotes around object literal property names. */
		/* see docs */
		"quote-props": ["error", "as-needed"],

		/*   enforce the consistent use of either backticks, double, or single quotes. */
		/* see docs */
		"quotes": ["error", "double"],

		/*   require or disallow semicolons instead of ASI. */
		/* see docs */
		"semi": ["error", "always"],

		/*   enforce consistent spacing before and after semicolons. */
		/* see docs */
		"semi-spacing": [
			"error",
			{
				"before": false,
				"after": true,
			}
		],

		/*   enforce location of semicolons. */
		/* "last" (Default) enforces that semicolons are at the end of statements. */
		/* "first" enforces that semicolons are at the beginning of statements.  */
		"semi-style": ["error", "last"],

		/*   require object keys to be sorted. */
		/* see docs */
		// "sort-keys": "error",

		/*   require variables within the same declaration block to be sorted. */
		/* "ignoreCase": true (default false) ignores the case-sensitivity of the variables order */
		// "sort-vars": "error",

		/*   enforce consistent spacing before blocks. */
		/* see docs */
		"space-before-blocks": ["error", "always"],

		/*   enforce consistent spacing before `function` definition opening parenthesis. */
		/* always (default) requires a space followed by the ( of arguments. */
		/* never disallows any space followed by the ( of arguments. */
		/* can use object for granularity */
		"space-before-function-paren": [
			"error",
			{
				"anonymous": "always",
				"named": "never",
				"asyncArrow": "always"
			}
		],

		/*   enforce consistent spacing inside parentheses. */
		/* "never (default) | always" */
		"space-in-parens": ["error", "never"],

		/*   require spacing around infix operators. */
		/* Set the int32Hint option to true (default is false) to allow write a|0 without space. */
		"space-infix-ops": "error",

		/*   enforce consistent spacing before or after unary operators. */
		/* "words" (default true) applies to unary word operators such as: new, delete, typeof, void, yield */
		/* "nonwords" (default false) applies to unary operators such as: -, +, --, ++, !, !! */
		/* "overrides" specifies overwriting usage of spacing for each operator, word or non word. This is empty by default. */
		"space-unary-ops": "error",

		/*   enforce consistent spacing after the `//` or `/*` in a comment. */
		/* see docs */
		"spaced-comment": ["error", "always"],

		/*   enforce spacing around colons of switch statements. */
		/* "after": true (Default) requires one or more spaces after colons. */
		/* "before": false (Default) disallows before colons. */
		"switch-colon-spacing": [
			"error",
			{
				"after": true,
				"before": false
			}
		],

		/*   require or disallow spacing between template tags and their literals. */
		/* "never (default) | always" */
		"template-tag-spacing": ["error", "never"],

		/*   require or disallow Unicode byte order mark (BOM). */
		"unicode-bom": ["error", "never"],

		/*   require parenthesis around regex literals. */
		// "wrap-regex": "error",


		/**
		 * ECMAScript 6
		 * These rules relate to ES6, also known as ES2015.
		 */
		/*   require braces around arrow function bodies. */
		/* "always | as-needed (default) | never" */
		/* when "as-needed": requireReturnForObjectLiteral false by default. If set to true, it requires braces and an explicit return for object literals. */
		// "arrow-body-style": "error",

		/*   require parentheses around arrow function arguments. */
		/* "always (default) | as-needed" */
		/* when "as-needed": "requireForBlockBody": true modifies the as-needed rule in order to require parens if the function body is in an instructions block (surrounded by braces). */
		"arrow-parens": ["error", "as-needed"],

		/*   enforce consistent spacing before and after the arrow in arrow functions. */
		/* default : { "before": true, "after": true } */
		"arrow-spacing": [
			"error",
			{
				"before": true,
				"after": true
			}
		],

		/* ✓ require `super()` calls in constructors. */
		// "constructor-super": "error",

		/*   enforce consistent spacing around `*` operators in generator functions. */
		/* default : {"before": true, "after": false} */
		/* see docs */
		"generator-star-spacing": ["error", "both"],

		/* ✓ disallow reassigning class members. */
		// "no-class-assign": "error",

		/*   disallow arrow functions where they could be confused with comparisons. */
		/* allowParens is a boolean setting that can be true(default) or false */
		"no-confusing-arrow": "error",

		/* ✓ disallow reassigning `const` variables. */
		// "no-const-assign": "error",

		/* ✓ disallow duplicate class members. */
		// "no-dupe-class-members": "error",

		/*   disallow duplicate module imports. */
		/* includeExports: false (default) If re-exporting from an imported module, you should add the imports to the import-statement, and export that directly, not use export ... from. */
		// "no-duplicate-imports": "error",

		/* ✓ disallow `new` operators with the `Symbol` object. */
		// "no-new-symbol": "error",

		/*   disallow specified names in exports. Only in v7 */
		/* see docs */
		// "no-restricted-exports": "error",

		/*   disallow specified modules when loaded by `import`. */
		/* see docs */
		// "no-restricted-imports": "error",

		/* ✓ disallow `this`/`super` before calling `super()` in constructors. */
		// "no-this-before-super": "error",

		/*   disallow unnecessary computed property keys in objects and classes. */
		/* enforceForClassMembers set to true additionally applies this rule to class members (Default false). */
		"no-useless-computed-key": ["error", { "enforceForClassMembers": true }],

		/*   disallow unnecessary constructors. */
		"no-useless-constructor": "error",

		/*   disallow renaming import, export, and destructured assignments to the same name. */
		/* ignoreImport: false When set to true, this rule does not check imports */
		/* ignoreExport: false When set to true, this rule does not check exports */
		/* ignoreDestructuring: false When set to true, this rule does not check destructuring assignments */
		"no-useless-rename": "error",

		/*   require `let` or `const` instead of `var`. */
		"no-var": "error",

		/*   require or disallow method and property shorthand syntax for object literals. */
		/* see docs */
		"object-shorthand": ["error", "always"],

		/*   require using arrow functions for callbacks. */
		/* Default: { allowNamedFunctions: false, allowUnboundThis: true } */
		"prefer-arrow-callback": "error",

		/*   require `const` declarations for variables that are never reassigned after declared. */
		/* see docs */
		"prefer-const": [
			"error",
			{
				"destructuring": "any",
				"ignoreReadBeforeAssign": true
			}
		],

		/*   require destructuring from arrays and/or objects. */
		/* see docs */
		"prefer-destructuring": [
			"error",
			{
				"VariableDeclarator": {
					"array": false,
					"object": true
				},
				"AssignmentExpression": {
					"array": true,
					"object": false
				}
			}, {
	  			"enforceForRenamedProperties": false
			}
		],

		/*   disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals. */
		"prefer-numeric-literals": "error",

		/*   require rest parameters instead of `arguments`. */
		"prefer-rest-params": "error",

		/*   require spread operators instead of `.apply()`. */
		"prefer-spread": "error",

		/*   require template literals instead of string concatenation. */
		"prefer-template": "error",

		/* ✓ require generator functions to contain `yield`. */
		// "require-yield": "error",

		/*   enforce spacing between rest and spread operators and their expressions. */
		/* "never (default) | always" */
		"rest-spread-spacing": ["error", "never"],

		/*   enforce sorted import declarations within modules. */
		/* see docs */
		// "sort-imports": "error",

		/*   require symbol descriptions. */
		"symbol-description": "error",

		/*   require or disallow spacing around embedded expressions of template strings. */
		/* "never (default) | always" */
		"template-curly-spacing": "error",

		/*   require or disallow spacing around the `*` in `yield*` expressions. */
		/* see docs */
		"yield-star-spacing": ["error", "both"],

	}
};
