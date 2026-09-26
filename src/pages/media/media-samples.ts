// Sample photos of the media pages (same sources as docs-react). Unsplash free license — no attribution required
// for UI mockups; picsum.photos for neutral placeholders.
const UNSPLASH = 'https://images.unsplash.com/photo-'
const FACE = '?w=120&h=120&fit=crop&crop=face'

export const SAMPLE_PEOPLE = [
    {
        id: 'p1',
        name: 'Anna Kowalska',
        description: 'Lead designer',
        avatar: `${UNSPLASH}1494790108377-be9c29b29330${FACE}`,
    },
    {
        id: 'p2',
        name: 'Jan Nowak',
        description: 'Engineering manager',
        avatar: `${UNSPLASH}1507003211169-0a1dd7228f2d${FACE}`,
    },
    {id: 'p3', name: 'Ewa Mazur', description: 'Senior PM', avatar: `${UNSPLASH}1438761681033-6461ffad8d80${FACE}`},
    {
        id: 'p4',
        name: 'Piotr Wojcik',
        description: 'Backend lead',
        avatar: `${UNSPLASH}1472099645785-5658abf4ff4e${FACE}`,
    },
    {
        id: 'p5',
        name: 'Katarzyna Lewandowska',
        description: 'Frontend',
        avatar: `${UNSPLASH}1534528741775-53994a69daeb${FACE}`,
    },
    {id: 'p6', name: 'Tomasz Kaczmarek', description: 'Infra', avatar: `${UNSPLASH}1633332755192-727a05c4013d${FACE}`},
    {
        id: 'p7',
        name: 'Magdalena Zielinska',
        description: 'QA lead',
        avatar: `${UNSPLASH}1580489944761-15a19d654956${FACE}`,
    },
    {id: 'p8', name: 'Marcin Kowal', description: 'Designer', avatar: `${UNSPLASH}1599566150163-29194dcabd9c${FACE}`},
] as const

const WALL = '?w=400&fit=max&q=80'

export const SAMPLE_LANDSCAPES = [
    {src: `${UNSPLASH}1506744038136-46273834b3fb${WALL}`, alt: 'Mountain lake'},
    {src: `${UNSPLASH}1469474968028-56623f02e42e${WALL}`, alt: 'Ocean sunset'},
    {src: `${UNSPLASH}1470071459604-3b5ec3a7fe05${WALL}`, alt: 'Forest path'},
    {src: `${UNSPLASH}1441974231531-c6227db76b6e${WALL}`, alt: 'Dense woodland'},
    {src: `${UNSPLASH}1501854140801-50d01698950b${WALL}`, alt: 'Autumn road'},
    {src: `${UNSPLASH}1475924156734-496f6cac6ec1${WALL}`, alt: 'Misty hills'},
    {src: `${UNSPLASH}1507525428034-b723cf961d3e${WALL}`, alt: 'Tropical beach'},
    {src: `${UNSPLASH}1433086966358-54859d0ed716${WALL}`, alt: 'Green valley'},
    {src: `${UNSPLASH}1482938289607-e9573fc25ebb${WALL}`, alt: 'River canyon'},
    {src: `${UNSPLASH}1446776811953-b23d57bd21aa${WALL}`, alt: 'Snowy peaks'},
    {src: `${UNSPLASH}1472214103451-9374bd1c798e${WALL}`, alt: 'Lavender field'},
    {src: `${UNSPLASH}1500534314209-a25ddb2bd429${WALL}`, alt: 'Calm waters'},
    {src: `${UNSPLASH}1447752875215-b2761acb3c5d${WALL}`, alt: 'Pine forest'},
    {src: `${UNSPLASH}1504567961542-e24d9439a724${WALL}`, alt: 'Golden hour'},
    {src: `${UNSPLASH}1490682143684-14369e18dce8${WALL}`, alt: 'Mountain trail'},
    {src: `${UNSPLASH}1465146344425-f00d5f5c8f07${WALL}`, alt: 'Wildflower meadow'},
    {src: `${UNSPLASH}1470252649378-9c29740c9fa8${WALL}`, alt: 'Desert dunes'},
    {src: `${UNSPLASH}1542202229-7d93c33f5d07${WALL}`, alt: 'Northern lights'},
] as const
