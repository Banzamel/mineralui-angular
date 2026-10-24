import {useState} from 'react'
import {MInput} from '@banzamel/mineralui/inputs'
import {validateEmail} from '@banzamel/mineralui/utils'

export function SignupForm() {
    const [email, setEmail] = useState('')
    const result = validateEmail(email)
    return (
        <MInput
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={!result.valid}
            errorText={result.error}
        />
    )
}
