
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
import SectionHeader from '@/components/SectionHeader.jsx';
import ContactCard from '@/components/ContactCard.jsx';
import ComplianceStrip from '@/components/ComplianceStrip.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast('Message sent successfully', {
        description: 'We will respond to your inquiry within 24 hours.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+92 42 3587 123',
      href: 'tel:+92423587123'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+92 300 1234567',
      href: 'https://wa.me/923001234567'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@rightvision.com.pk',
      href: 'mailto:info@rightvision.com.pk'
    },
    {
      icon: MapPin,
      title: 'Office address',
      content: 'Office 204, Ali Trade Center, Gulberg III, Lahore'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Right Vision Securities</title>
        <meta
          name="description"
          content="Contact Right Vision Securities for commodity trading inquiries, account opening, or support. Phone, email, and office location in Lahore."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Contact us"
        subtitle="Get in touch with Right Vision Securities for inquiries, account opening, or support"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact' }
        ]}
      />

      {/* Contact Methods */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <SectionHeader
            title="Get in touch"
            subtitle="Multiple ways to reach our team"
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ContactCard {...method} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <SectionHeader
              title="Send us a message"
              subtitle="Fill out the form below and we will respond within 24 hours"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="professional-card"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                    className="text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                    className="text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Visit our office
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Office 204, 2nd Floor<br />
                    Ali Trade Center<br />
                    Gulberg III<br />
                    Lahore, Punjab<br />
                    Pakistan
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Business hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Support availability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Client support team available during business hours. For urgent matters outside business hours, please email info@rightvision.com.pk and we will respond on the next business day.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden shadow-xl h-[500px] bg-muted flex items-center justify-center"
            >
              <div className="text-center p-8">
                <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Interactive map view of office location
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Time */}
      <section className="section-spacing bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <Clock className="h-16 w-16 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Quick response times
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We aim to respond to all inquiries within 24 hours during business days. For urgent matters or immediate assistance with your account, please call our office during business hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Phone className="mr-2 h-5 w-5" />
                Call us now
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp chat
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ComplianceStrip />
      <Footer />
    </>
  );
}

export default ContactPage;
