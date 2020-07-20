module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        jquery: true,
        es6: true,
    },
    extends: ['plugin:vue/recommended', 'eslint:recommended'],

    // add your custom rules here
    rules: {
        "vue/max-attributes-per-line": [2, {
            "singleline": 10,
            "multiline": {
                "max": 1,
                "allowFirstLine": false
            }
        }],
        "vue/name-property-casing": ["error", "PascalCase"],
        // 设置了 setter ，必须相应设置 getter ，反之不必须
        'accessor-pairs': 2,
        'arrow-spacing': [2, {
            'before': true,
            'after': true
        }],
        // 代码块花括号前后的空格规则
        'block-spacing': [2, 'always'],
        // if else 的花括号换行规则
        'brace-style': [2, '1tbs', {
            'allowSingleLine': true
        }],
        // 变量名必须使用驼峰式
        'camelcase': [0, {
            'properties': 'always'
        }],
        // 对象的最后一项后面是否写逗号
        'comma-dangle': [2, 'never'],
        // 逗号前后是否有空格
        'comma-spacing': [2, {
            'before': false,
            'after': true
        }],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        'curly': [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'eol-last': 2,
        // 必须使用 === 和 !== ，和 null 对比时除外
        'eqeqeq': [0, 'allow-null'],
        // for 循环不得因方向错误造成死循环
        'for-direction': 2,
        'generator-star-spacing': [2, {
            'before': true,
            'after': true
        }],
        'handle-callback-err': [2, '^(err|error)$'],
        'indent': [2, 2, {
            'SwitchCase': 1
        }],
        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [2, {
            'beforeColon': false,
            'afterColon': true
        }],
        // 关键字前后必须有空格
        'keyword-spacing': [2, {
            'before': true,
            'after': true
        }],
        // 限制单行代码的长度
        'max-len': 0,
        // 限制单个文件最大行数
        'max-lines': 0,
        // 三元表达式的换行规则
        'multiline-ternary': 0,
        'new-cap': [2, {
            'newIsCap': true,
            'capIsNew': false
        }],
        'new-parens': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        'no-console': 'off',
        'no-class-assign': 2,
        'no-cond-assign': 2,
        // 禁止对 const 定义重新赋值
        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        // 函数参数禁止重名
        'no-dupe-args': 2,
        // 类方法禁止重名
        'no-dupe-class-members': 2,
        // 禁止对象出现重名键值
        'no-dupe-keys': 2,
        // 禁止 switch 中出现相同的 case
        'no-duplicate-case': 2,
        // 禁止重复 import
        'no-duplicate-imports': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        // 禁止使用 eval
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [2, {
            'allowLoop': false,
            'allowSwitch': false
        }],
        'no-lone-blocks': 2,
        // 禁止混用空格和 tab 来做缩进，必须统一
        'no-mixed-spaces-and-tabs': 2,
        // 禁止使用连续的空格
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        // 连续空行的数量限制
        'no-multiple-empty-lines': [2, {
            'max': 2 // 文件内最多连续 2 个
        }],
        // 禁止使用 process.env.NODE_ENV
        'no-process-env': 0,
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 2,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        // 禁止重复声明
        'no-redeclare': 2,
        // 禁止在正则表达式中出现连续空格
        'no-regex-spaces': 2,
        // 禁止在return中赋值
        'no-return-assign': [2, 'except-parens'],
        // 禁止在 return 中使用 await
        'no-return-await': 2,
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        // 禁止行尾空格
        'no-trailing-spaces': 2,
        // 禁止访问未定义的变量或方法
        'no-undef': 2,
        // 禁止将 undefined 赋值给变量
        'no-undef-init': 2,
        // 禁止出现难以理解的多行代码
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        // 禁止不必要的三元表达式
        'no-unneeded-ternary': [2, {
            'defaultAssignment': false
        }],
        // 禁止出现不可到达的代码，如在 return、throw 之后的代码
        'no-unreachable': 2,
        // 禁止在finally块中出现 return、throw、break、continue
        'no-unsafe-finally': 2,
        // 禁止定义不使用的变量
        'no-unused-vars': [2, {
            'vars': 'all', // 变量定义必须被使用
            'args': 'none' // 对于函数形参不检测
        }],
        // 禁止不必要的 call 和 apply
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        // 禁止 with
        'no-with': 2,
        'one-var': [2, {
            'initialized': 'never'
        }],
        'operator-linebreak': [2, 'after', {
            'overrides': {
                '?': 'before',
                ':': 'before'
            }
        }],
        'padded-blocks': [2, 'never'],
        'quotes': [2, 'single', {
            'avoidEscape': true,
            'allowTemplateLiterals': true
        }],
        'semi': [2, 'never'],
        'semi-spacing': [2, {
            'before': false,
            'after': true
        }],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [2, 'never'],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [2, {
            'words': true,
            'nonwords': false
        }],
        'spaced-comment': [2, 'always', {
            'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
        }],
        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        // 禁止Yoda格式的判断条件，如 if (true === a)，应使用 if (a === true)
        'yoda': [2, 'never'],
        'prefer-const': 2,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'object-curly-spacing': [2, 'always', {
            objectsInObjects: false
        }],
        // 数组方括号前后的空格使用规则
        // @off 不关心
        'array-bracket-spacing': [2, 'never']
    }
}