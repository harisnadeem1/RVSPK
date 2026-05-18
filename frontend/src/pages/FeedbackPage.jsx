import { Helmet } from 'react-helmet'
import TrustBar from '@/components/TrustBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import ComplianceStrip from '@/components/ComplianceStrip'
import DynamicForm from '@/components/DynamicForm'
import { feedbackFormConfig } from '@/config/feedbackFormConfig'

export default function FeedbackPage() {
  return (
    <>
      <Helmet>
        <title>Feedback – Right Vision Securities</title>
        <meta
          name="description"
          content="Share your feedback, suggestions, or queries with Right Vision Securities."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Feedback"
        subtitle="We value your feedback and are committed to continuously improving our services"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Feedback' }]}
      />

      <section className="section-spacing bg-card">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="mb-8">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-3">
              Your Opinion Matters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Share your thoughts
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your feedback helps us make our platform and services better for everyone.
            </p>
          </div>
          <DynamicForm config={feedbackFormConfig} />
        </div>
      </section>

       
      <Footer />
    </>
  )
}