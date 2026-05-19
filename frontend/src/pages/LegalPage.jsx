
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Shield, FileText, Lock, AlertCircle } from 'lucide-react';
import TrustBar from '@/components/TrustBar.jsx';
import Navbar from '@/components/Navbar.jsx';
import Footer from '@/components/Footer.jsx';
import PageHero from '@/components/PageHero.jsx';
  ;
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function LegalPage() {
  return (
    <>
      <Helmet>
        <title>Legal & Compliance - Right Vision Securities</title>
        <meta
          name="description"
          content="Terms and conditions, disclaimer, privacy policy, and compliance information for Right Vision Securities."
        />
      </Helmet>

      <TrustBar />
      <Navbar />

      <PageHero
        title="Legal and compliance"
        subtitle="Terms, disclaimers, and regulatory information"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Legal' }
        ]}
      />

      <section className="section-spacing bg-card">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
                <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
                <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
              </TabsList>

              {/* Terms and Conditions */}
              <TabsContent value="terms" className="space-y-6">
                <div className="flex items-start gap-4 mb-6">
                  <FileText className="h-8 w-8 text-accent flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Terms and conditions</h2>
                    <p className="text-muted-foreground">Last updated: April 16, 2026</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">1. Account opening and trading</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      By opening an account with Right Vision Securities (Private) Limited, you agree to comply with all terms and conditions of service. All clients must complete the required account documentation, provide valid identification, and meet minimum capital requirements as specified by SECP and PMEX regulations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">2. Trading authorization</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Clients authorize Right Vision Securities to execute commodity and futures trades on their behalf through the Pakistan Mercantile Exchange. All trades are executed at prevailing market prices subject to available liquidity and exchange regulations. The company does not guarantee execution at any specific price level.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">3. Margin requirements and margin calls</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Clients must maintain sufficient margin in their accounts as specified by exchange requirements and company policy. In the event of insufficient margin, Right Vision Securities reserves the right to liquidate positions without prior notice to meet margin requirements. Clients are responsible for monitoring their account margin status.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">4. Commissions and fees</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Trading commissions and fees are disclosed at account opening and are subject to change with prior notice. All commissions are charged per executed contract. Additional fees may apply for specific services such as expedited withdrawals or paper statements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">5. Client responsibilities</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Clients are responsible for understanding the risks of commodity and futures trading, maintaining accurate contact information, reviewing account statements, and reporting any discrepancies within 10 business days. Clients must comply with all applicable laws and regulations regarding commodity trading.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">6. Account termination</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Either party may terminate the account relationship with written notice. Upon termination, all open positions must be closed, and any outstanding balances must be settled. Right Vision Securities reserves the right to close accounts that violate terms of service or applicable regulations.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Disclaimer */}
              <TabsContent value="disclaimer" className="space-y-6">
                <div className="flex items-start gap-4 mb-6">
                  <AlertCircle className="h-8 w-8 text-gold flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Risk disclaimer</h2>
                    <p className="text-muted-foreground">Important information about trading risks</p>
                  </div>
                </div>

                <div className="professional-card bg-gold/10 border-gold/20">
                  <p className="text-foreground font-medium leading-relaxed">
                    Trading in commodity futures and derivatives involves substantial risk of loss and may not be suitable for all investors. You should carefully consider whether trading is appropriate for you in light of your experience, objectives, financial resources, and other relevant circumstances.
                  </p>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Market risk</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Commodity futures prices are subject to rapid and substantial fluctuations. Market conditions can change quickly due to economic data, geopolitical events, weather conditions, supply disruptions, and other factors. Past performance is not indicative of future results.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Leverage risk</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Futures trading involves leverage, which can magnify both gains and losses. A relatively small price movement can result in substantial losses exceeding your initial investment. You may lose your entire account balance and be required to deposit additional funds to meet margin calls.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Liquidity risk</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Certain commodity contracts may experience periods of low liquidity, making it difficult to execute trades at desired prices. During volatile market conditions, spreads may widen significantly, and slippage may occur on orders.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">No investment advice</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Right Vision Securities provides execution services and market information but does not provide investment advice. All trading decisions are made independently by clients. We recommend consulting with financial advisors before engaging in commodity futures trading.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Regulatory information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Right Vision Securities is regulated by SECP and licensed by PMEX. Clients are protected by applicable investor protection regulations. However, regulatory oversight does not eliminate trading risks or guarantee profits.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Privacy Policy */}
              <TabsContent value="privacy" className="space-y-6">
                <div className="flex items-start gap-4 mb-6">
                  <Lock className="h-8 w-8 text-accent flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Privacy policy</h2>
                    <p className="text-muted-foreground">How we collect, use, and protect your information</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Information collection</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Right Vision Securities collects personal information necessary for account opening and regulatory compliance, including name, address, identification documents, financial information, and trading activity. We collect this information directly from clients and through normal business operations.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Use of information</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Client information is used to provide trading services, process transactions, comply with regulatory requirements, prevent fraud, and communicate important account information. We do not sell client information to third parties for marketing purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Information sharing</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Client information may be shared with regulatory authorities as required by law, with service providers who assist in business operations under strict confidentiality agreements, and with exchanges for trade execution and clearing purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Data security</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We implement industry-standard security measures to protect client information, including encrypted data transmission, secure servers, access controls, and regular security audits. Clients are responsible for maintaining the confidentiality of their login credentials.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Client rights</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Clients have the right to access their personal information, request corrections, and receive copies of account documents. To exercise these rights or ask questions about our privacy practices, contact our compliance department.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Compliance */}
              <TabsContent value="compliance" className="space-y-6">
                <div className="flex items-start gap-4 mb-6">
                  <Shield className="h-8 w-8 text-accent flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Compliance information</h2>
                    <p className="text-muted-foreground">Regulatory framework and compliance standards</p>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Regulatory oversight</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Right Vision Securities (Private) Limited is registered with and regulated by the Securities and Exchange Commission of Pakistan (SECP) under registration number SEC/TREC-034/2015. We are an authorized trading member of Pakistan Mercantile Exchange Limited (PMEX).
                    </p>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">SECP Registration:</span> SEC/TREC-034/2015
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">PMEX Membership:</span> Active Trading Member
                      </p>
                      <p className="text-muted-foreground">
                        <span className="font-semibold text-foreground">Compliance Status:</span> Current and in good standing
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Anti-money laundering</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Right Vision Securities maintains comprehensive anti-money laundering (AML) and know-your-customer (KYC) procedures in compliance with SECP regulations and international standards. All clients undergo identity verification and source of funds screening during account opening.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Client fund protection</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Client funds are held in segregated accounts separate from company operating accounts, providing protection in accordance with SECP requirements. Client funds are used exclusively for client trading activities and margin requirements.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Complaint resolution</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Right Vision Securities maintains a formal complaint handling process. Clients with complaints should first contact our compliance department. If issues remain unresolved, clients may escalate complaints to SECP's investor protection department.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">Regulatory reporting</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We submit regular reports to SECP and PMEX as required, including financial statements, trading activity reports, and compliance certifications. Our operations are subject to periodic regulatory examinations to ensure ongoing compliance with all applicable rules.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Questions about our legal policies?
            </h3>
            <p className="text-muted-foreground mb-6">
              For questions about these terms, our privacy practices, or compliance matters, please contact our compliance department.
            </p>
            <p className="text-muted-foreground">
              Email: <a href="mailto:compliance@rightvision.com.pk" className="text-accent hover:text-accent/80 font-medium">compliance@rightvision.com.pk</a>
            </p>
          </div>
        </div>
      </section>

       
      <Footer />
    </>
  );
}

export default LegalPage;
