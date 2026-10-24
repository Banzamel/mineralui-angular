import {Link} from 'react-router-dom'
import {MButton} from '@banzamel/mineralui/controls'
import {MHeading, MList, MListItem} from '@banzamel/mineralui/typography'

export function Steps() {
    return (
        <>
            <MHeading level={2}>Getting started</MHeading>
            <MList ordered>
                <MListItem>Install the package</MListItem>
                <MListItem>Add the providers</MListItem>
            </MList>
            <MButton component={Link} to="/docs" variant="outlined">
                Read the docs
            </MButton>
        </>
    )
}
