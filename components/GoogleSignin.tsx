import { Button } from '@nextui-org/react'

export default function GoogleSignin() {
    return (
        <Button
            className='w-full bg-card text-foreground hover:bg-card/70 font-semibold'
            radius='sm'
        >
            Sign in with Google
        </Button>
    )
}
