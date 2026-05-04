import React from 'react'
import ProfileGroupPage from './ProfileGroupPage'
import { profileGroups } from '@/data/profiles'

function LegalPage() {
  return <ProfileGroupPage group={profileGroups.legal} />
}

export default LegalPage