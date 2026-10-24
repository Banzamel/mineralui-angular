import {useRef, useState} from 'react'
import {MButton} from '@banzamel/mineralui/controls'
import {useClickOutside} from '@banzamel/mineralui/utils'

export function AccountMenu() {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => setOpen(false))

    return (
        <div ref={ref}>
            <MButton onClick={() => setOpen(!open)}>Account</MButton>
            {open && <p>Signed in as Ada</p>}
        </div>
    )
}
