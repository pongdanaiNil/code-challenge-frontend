import { NextPage } from 'next'
import SignInForm from '@components/SignInForm'
import { useEffect, useState } from 'react'

const SignIn: NextPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) { return null }
  return <SignInForm />
}

export default SignIn
