// @ts-check
import eslint from '@eslint/js'
import angular from 'angular-eslint'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

// Import direction (CLAUDE.md → docs-angular): kit → library only; pages → library + kit; pages never import pages.
const LIBRARY_INTERNAL = {
    group: ['@banzamel/mineralui-angular/internal', '@banzamel/mineralui-angular/internal/*'],
    message: 'The docs use the public API only.',
}
const LIBRARY_DEEP = {
    regex: '^@banzamel/mineralui-angular/(theme|i18n|utils|icons|illustrations|[a-z]+/[a-z-]+)/.+',
    message: 'Deep imports are forbidden — import through the entry point.',
}

export default tseslint.config(
    {
        ignores: ['dist/**', 'out-tsc/**', '.angular/**', 'coverage/**', '.test-results/**', 'src/generated/**'],
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...tseslint.configs.stylistic,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        rules: {
            '@angular-eslint/component-selector': ['error', {type: 'element', prefix: 'doc', style: 'kebab-case'}],
            '@angular-eslint/directive-selector': ['error', {type: 'attribute', prefix: 'doc', style: 'camelCase'}],
            '@angular-eslint/prefer-on-push-component-change-detection': 'error',
            '@angular-eslint/prefer-standalone': 'error',
            '@angular-eslint/prefer-signals': 'error',
            '@angular-eslint/prefer-output-emitter-ref': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/consistent-type-imports': ['error', {fixStyle: 'separate-type-imports'}],
            '@typescript-eslint/consistent-type-assertions': ['error', {assertionStyle: 'never'}],
            'no-restricted-syntax': [
                'error',
                {selector: 'TSEnumDeclaration', message: 'Use a const object + union type.'},
                ...['Input', 'Output', 'HostBinding', 'HostListener', 'ViewChild', 'ContentChild', 'NgModule'].map(
                    (name) => ({
                        selector: `Decorator[expression.callee.name='${name}']`,
                        message: `@${name} is forbidden — use the signal API / host metadata instead.`,
                    })
                ),
            ],
            'no-restricted-properties': [
                'error',
                {property: 'bypassSecurityTrustHtml', message: 'Never bypass sanitization in the docs.'},
            ],
            'no-restricted-imports': ['error', {patterns: [LIBRARY_INTERNAL, LIBRARY_DEEP]}],
        },
    },
    {
        // Examples and snippets are code users copy into their apps.
        files: ['src/pages/**/examples/*.ts', 'src/pages/**/snippets/*.ts'],
        rules: {
            '@angular-eslint/component-selector': ['error', {type: 'element', prefix: 'app', style: 'kebab-case'}],
        },
    },
    {
        files: ['src/kit/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        LIBRARY_INTERNAL,
                        LIBRARY_DEEP,
                        {group: ['@pages/*', '@layout/*'], message: 'kit/ depends on the library only.'},
                    ],
                },
            ],
        },
    },
    {
        files: ['src/pages/**/*.ts'],
        rules: {
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        LIBRARY_INTERNAL,
                        LIBRARY_DEEP,
                        {group: ['@layout/*'], message: 'Pages depend on the library and kit/ only.'},
                        {group: ['@pages/*', '../../*'], message: 'Pages never import other pages.'},
                    ],
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
        rules: {
            '@angular-eslint/template/prefer-control-flow': 'error',
            '@angular-eslint/template/prefer-self-closing-tags': 'error',
        },
    },
    prettier
)
