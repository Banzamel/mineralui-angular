// Sample people of the calendar pages (same photos as docs-react `sampleAvatars`). Unsplash free license — no
// attribution required for UI mockups.
const UNSPLASH = 'https://images.unsplash.com/photo-'
const FACE = '?w=120&h=120&fit=crop&crop=face'

export const CALENDAR_AVATARS = {
    annaKowalska: `${UNSPLASH}1494790108377-be9c29b29330${FACE}`,
    janNowak: `${UNSPLASH}1507003211169-0a1dd7228f2d${FACE}`,
    ewaMazur: `${UNSPLASH}1438761681033-6461ffad8d80${FACE}`,
    piotrWojcik: `${UNSPLASH}1472099645785-5658abf4ff4e${FACE}`,
    katarzynaLewandowska: `${UNSPLASH}1534528741775-53994a69daeb${FACE}`,
    tomaszKaczmarek: `${UNSPLASH}1633332755192-727a05c4013d${FACE}`,
} as const
