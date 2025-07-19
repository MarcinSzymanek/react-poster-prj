import { BeatLoader } from 'react-spinners'

export default function Spinner() {
    const override = {
        position: 'fixed',
        top: '2rem',
        right: '2rem',
    }

    return (
        <BeatLoader
            loading={true}
            color="#ffffffff"
            cssOverride={override}
            speedMultiplier={2}
        ></BeatLoader>
    )
}
