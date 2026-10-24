import {MButton} from '@banzamel/mineralui/controls'
import {MBreakpoints, useMaxWidth} from '@banzamel/mineralui/theme'

export function ExportActions() {
    const compact = useMaxWidth(MBreakpoints.md)
    return (
        <>
            <MButton hidden="md">Export report</MButton>
            <MButton fullWidth={compact}>Save</MButton>
        </>
    )
}
