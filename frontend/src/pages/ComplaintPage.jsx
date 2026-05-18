import { Helmet } from 'react-helmet'
import TrustBar from '@/components/TrustBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ComplianceStrip from '@/components/ComplianceStrip'
import DynamicForm from '@/components/DynamicForm'
import { complaintFormConfig } from '@/config/complaintFormConfig'

export default function ComplaintPage() {
  return (
    <>
      <Helmet>
        <title>Complaint Registration – Right Vision Securities</title>
        <meta
          name="description"
          content="Register a formal complaint with Right Vision Securities. Our compliance team will respond within 3 business days."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Complaint Registration"
        subtitle="Register a formal complaint and our compliance team will respond within 3 business days"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Complaint Registration' }]}
      />

      <section className="section-spacing bg-card">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Formal Complaint
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Submit a complaint
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All complaints are handled in accordance with PMEX regulations.
              Please fill in as much detail as possible to help us resolve your issue quickly.
            </p>
          </div>
          <DynamicForm config={complaintFormConfig} />
        </div>
      </section>

       
      <Footer />
    </>
  )
}