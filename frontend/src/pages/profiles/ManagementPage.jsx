import React from 'react'
import ProfileGroupPage from './ProfileGroupPage'
import { profileGroups } from '@/data/profiles'

function ManagementPage() {
  return <ProfileGroupPage group={profileGroups.management} />
}

export default ManagementPage