'use client'

import { useClerk } from '@clerk/nextjs'
import styles from '../styles/Profile.module.scss'

export const LogoutButton = () => {

    const { signOut } = useClerk()

  return (
    <button className={styles.userLogout} onClick={() => signOut({ redirectUrl: '/' })}> خروج از حساب کاربری</button>
  )
}