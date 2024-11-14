import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
    return (
        <div className='flex self-center'>
            <SignIn appearance={{
                baseTheme: dark,
                elements : {
                    rootBox: 'bg-base-100 self-center lg:mt-20',
                    cardBox: 'lg:w-96 bg-base-200',
                }
            }}
            />
        </div>
    )
}