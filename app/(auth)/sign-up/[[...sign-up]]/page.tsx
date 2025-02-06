import { SignUp } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
    return (
        <div className='flex min-h-screen items-center justify-center p-4'>
            <SignUp appearance={{
                baseTheme: dark,
                elements: {
                    rootBox: 'bg-transparent',
                    card: 'bg-base-200 shadow-xl rounded-xl',
                    headerTitle: 'text-primary',
                    headerSubtitle: 'text-base-content/80',
                    socialButtonsBlockButton: 'bg-base-300 hover:bg-base-300/80',
                    formButtonPrimary: 'bg-primary hover:bg-primary/80',
                    footerActionLink: 'text-primary hover:text-primary/80',
                    formFieldInput: 'bg-base-300 border-base-300',
                }
            }}
            />
        </div>
    )
}