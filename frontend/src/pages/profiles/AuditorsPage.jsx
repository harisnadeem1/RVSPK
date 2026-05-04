import React from 'react'
import ProfileGroupPage from './ProfileGroupPage'
import { profileGroups } from '@/data/profiles'

function AuditorsPage() {
  return <ProfileGroupPage group={profileGroups.auditors} />
}

export default AuditorsPage