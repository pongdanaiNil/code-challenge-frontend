import { NextPage } from 'next'
import SignUpForm from '@components/SignUpForm'
import { useEffect, useState } from 'react'

const SignUp: NextPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) { return null }
  return <SignUpForm />
}

export default SignUp
