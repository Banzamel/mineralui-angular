import {MButton} from '@banzamel/mineralui/controls'
import {useMToast} from '@banzamel/mineralui/feedback'
import {useMI18n} from '@banzamel/mineralui/i18n'
import {MThemeProvider, useMTheme} from '@banzamel/mineralui/theme'

export function ThemeToggle() {
    const {resolvedMode, toggleMode} = useMTheme()
    const {t} = useMI18n()
    const {toast} = useMToast()

    const toggle = () => {
        toggleMode()
        toast({title: t('app.themeChanged'), color: 'success'})
    }

    return (
        <>
            <MButton onClick={toggle}>
                {t('app.toggleTheme')} ({resolvedMode})
            </MButton>
            <MThemeProvider scope="wrapper" mode="light">
                <MButton>Always light</MButton>
            </MThemeProvider>
        </>
    )
}
