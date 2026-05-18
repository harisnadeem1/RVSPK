import { Helmet } from 'react-helmet'
import TrustBar from '@/components/TrustBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ComplianceStrip from '@/components/ComplianceStrip'
import DynamicForm from '@/components/DynamicForm'
import { grievanceFormConfig } from '@/config/grievanceFormConfig'

export default function GrievancePage() {
  return (
    <>
      <Helmet>
        <title>Client Grievance – Right Vision Securities</title>
        <meta
          name="description"
          content="Submit a client grievance with Right Vision Securities. Your concerns will be reviewed by our compliance team."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Client Grievance"
        subtitle="Submit your grievance and our compliance team will review and respond within 3 business days"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Client Grievance' }]}
      />

      <section className="section-spacing bg-card">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="mb-8">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Client Grievance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Register your grievance
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Right Vision Securities is committed to resolving all client grievances fairly
              and promptly in line with regulatory requirements.
            </p>
          </div>
          <DynamicForm config={grievanceFormConfig} />
        </div>
      </section>

       
      <Footer />
    </>
  )
}