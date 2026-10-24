import {useState} from 'react'
import {MButton} from '@banzamel/mineralui/controls'
import {MModal} from '@banzamel/mineralui/overlays'

export function DeleteDialog() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <MButton color="error" onClick={() => setOpen(true)}>
                Delete
            </MButton>
            <MModal
                open={open}
                onClose={() => setOpen(false)}
                title="Delete project?"
                footer={
                    <MButton color="error" onClick={() => setOpen(false)}>
                        Delete
                    </MButton>
                }
            >
                The project and its files are removed for good.
            </MModal>
        </>
    )
}
