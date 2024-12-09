import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
    return (
        <div className='flex self-center'>
            {/* Need to customize this component */}
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