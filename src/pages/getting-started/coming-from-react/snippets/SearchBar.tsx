import {MButton} from '@banzamel/mineralui/controls'
import {MAirplaneFillIcon, MSearchIcon} from '@banzamel/mineralui/icons'

export function SearchBar() {
    return (
        <>
            <MAirplaneFillIcon size="lg" title="Flights" />
            <MButton startIcon={<MSearchIcon />}>Search</MButton>
        </>
    )
}
