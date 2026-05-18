import { Helmet } from 'react-helmet'
import { ShieldCheck } from 'lucide-react'
import TrustBar from '@/components/TrustBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ComplianceStrip from '@/components/ComplianceStrip'
import DynamicForm from '@/components/DynamicForm'
import { whistleblowerFormConfig } from '@/config/whistleblowerFormConfig'

export default function WhistleblowerPage() {
  return (
    <>
      <Helmet>
        <title>Whistleblower Submission – Right Vision Securities</title>
        <meta
          name="description"
          content="Confidentially report misconduct, fraud, or violations at Right Vision Securities. Your identity is fully protected."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Whistleblower Submission"
        subtitle="Report misconduct or violations confidentially — your identity is fully protected"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Whistleblower' }]}
      />

      <section className="section-spacing bg-card">
        <div className="container-custom max-w-3xl mx-auto">

          {/* Confidentiality notice */}
          <div className="flex gap-4 bg-accent/5 border border-accent/20 rounded-xl p-5 mb-8">
            <ShieldCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                Your identity is protected
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The company assures the whistleblower full confidentiality and shall take all
                necessary measures to safeguard identity. Personal data will only be shared
                with regulatory or investigation authorities if legally required.
              </p>
            </div>
          </div>

          <DynamicForm config={whistleblowerFormConfig} />
        </div>
      </section>

       
      <Footer />
    </>
  )
}