import {createRoot} from 'react-dom/client'
import {MToastProvider} from '@banzamel/mineralui/feedback'
import {MI18nProvider} from '@banzamel/mineralui/i18n'
import {MThemeProvider} from '@banzamel/mineralui/theme'
import {App} from './App'

const en = {app: {toggleTheme: 'Toggle theme', themeChanged: 'Theme changed'}}

createRoot(document.getElementById('root')!).render(
    <MThemeProvider mode="system">
        <MI18nProvider locales={{en}} defaultLocale="en">
            <MToastProvider position="top-right">
                <App />
            </MToastProvider>
        </MI18nProvider>
    </MThemeProvider>
)
