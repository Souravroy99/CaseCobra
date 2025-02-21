import React from 'react'
import MaxwidthWrapper from './MaxwidthWrapper'
import Link from 'next/link'
import { buttonVariants } from '@/app/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar = async() => {

  const { getUser} = getKindeServerSession()
  const user = await getUser()

  console.log(`USER: `, user)
  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-14 w-full border-b border-gray-200 bg-white/60 backdrop-blur-lg transition-all">
      <MaxwidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="z-40 flex font-semibold">
            case <span className="text-green-600">cobra</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Sign out
                </Link>

                {isAdmin ? (
                  <Link
                    href="/api/auth/dashboard"
                    className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                  >
                    ✨Dashboard✨
                  </Link>
                ) : null}

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Sign Up
                </Link>

                <Link
                  href="/api/auth/login"
                  className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                >
                  Login
                </Link>

                <div className="hidden h-8 w-px bg-zinc-200 sm:block" />

                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}
                >
                  Create case
                  <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxwidthWrapper>
    </nav>
  )
}

export default Navbar
