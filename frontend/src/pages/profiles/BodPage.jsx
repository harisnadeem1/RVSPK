import React from 'react'
import ProfileGroupPage from './ProfileGroupPage'
import { profileGroups } from '@/data/profiles'

function BodPage() {
  return <ProfileGroupPage group={profileGroups.bod} />
}

export default BodPage