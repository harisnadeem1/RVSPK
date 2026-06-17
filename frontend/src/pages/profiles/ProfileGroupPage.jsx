import React from 'react'
import { Helmet } from 'react-helmet'
import { motion } from 'framer-motion'
import { CheckCircle, GraduationCap } from 'lucide-react'
import TrustBar from '@/components/TrustBar.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'
import PageHero from '@/components/PageHero.jsx'
import CTASection from '@/components/CTASection.jsx'
  
import { useLocation } from "react-router-dom";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

function ProfileGroupPage({ group }) {
  const location = useLocation();

  const titles = {
    "/about/management": "Meet the team",
    "/about/board": "Meet the Board",
    "/about/auditors": "Meet the Auditors",
    "/about/legal": "Meet the Legal Advisors",
  };

  const title = titles[location.pathname];
  const hasMultiple = group.members.length > 1

  return (
    <>
      <Helmet>
        <title>{group.label} — Right Vision Securities</title>
        <meta name="description" content={group.description} />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title={group.label}
        subtitle={group.description}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Company Profile', path: '/company-profile' },
          { label: group.label },
        ]}
      />

      

      {/* ── Member profiles ── */}
      <section className="section-spacing bg-card">
        <div className="container-custom px-4 sm:px-6">

          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              {group.tagline}
            </span>
           {title && (
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
          {title}
        </h2>
      )}
            <p className="text-sm sm:text-sm text-muted-foreground leading-relaxed">
              {hasMultiple
                ? `${group.members.length} professionals responsible for this function at Right Vision Securities.`
                : 'The individual responsible for this function at Right Vision Securities.'}
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8 max-w-5xl mx-auto"
          >
            {group.members.map((member, idx) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-muted rounded-xl sm:rounded-2xl border border-border/60 hover:border-accent/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* ── Profile header ── */}
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 px-6 sm:px-8 pt-8 pb-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    {/* Avatar */}
                    <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-primary-foreground font-bold text-2xl">
                        {member.initials}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-1">
                        {member.department}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-0.5">
                        {member.name}
                      </h3>
                      <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full mt-1">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── Profile body ── */}
                <div className="px-6 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                  {/* Bio — takes 2 cols */}
                  <div className="lg:col-span-2 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Profile
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                    {member.fullBio?.map((para, i) => (
                      <p key={i} className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Right column — responsibilities + credentials */}
                  <div className="space-y-6">

                    {/* Responsibilities */}
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                        Key responsibilities
                      </p>
                      <ul className="space-y-2">
                        {member.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Credentials */}
                    {member.credentials?.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                          Credentials
                        </p>
                        <ul className="space-y-2">
                          {member.credentials.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <GraduationCap className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-muted-foreground leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Get in touch with us"
        description="Contact Right Vision Securities to learn more about our team, services, or to discuss your commodity trading requirements."
        primaryCTA={{ text: 'Contact us', href: '/contact' }}
        secondaryCTA={{ text: 'Company profile', href: '/company-profile' }}
      />

       
      <Footer />
    </>
  )
}

export default ProfileGroupPage