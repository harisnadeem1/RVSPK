import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

const guidelines = [
  "Understand risk prior to trade in commodity future contracts",
  "Keep your contact details (mobile number, email, address etc.) updated with us",
  "No dealing in cash — always place funds in your account maintained with PMEX only",
  "Always keep sufficient margins against your open future contract positions",
  "Do not share your login credentials, personal or financial data with anyone",
  "Maintain adequate funds in your trading account to avoid Auto-liquidation",
  "Prevent unauthorized transactions in your account",
  "Don't believe in fixed returns on deposits placed with any broker or entity",
  "Investing on advice of unauthorized persons or entities may lose all or part of your investment",
];

export default function TradeSafelySection() {
  return (
    <section className="section-spacing bg-card">
      <div className="container-custom px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto"
        >

          {/* ── LEFT — Investor Guidelines ── */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-2">
                Investor Awareness
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight mb-2">
                Investor Guidelines
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Follow these guidelines to protect your investment and trade safely
                on Pakistan's regulated commodity futures exchange.
              </p>
            </div>

            <ul className="space-y-3">
              {guidelines.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-card rounded-xl px-4 py-3 border border-border/60"
                >
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — Original PMEX Alert Card (unchanged) ── */}
          <div className="lg:sticky lg:top-28">
            <div className="max-w-3xl mx-auto rounded-3xl border-4 border-primary/80 bg-card p-6 sm:p-8 flex flex-col gap-5">

              {/* Top logos row */}
              <div className="flex items-center justify-between">
                <img
                  src="/company_logo/pmex.svg"
                  alt="PMEX"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <div className="flex flex-col items-end">
                  <img
                    src="/rvspk_logo.png"
                    alt="Right Vision Securities"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                  <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 italic">
                    Invest with Right Vision
                  </span>
                </div>
              </div>

              {/* Main heading */}
              <div className="text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                  Trade Safely! Avoid<br />Unregulated Platforms
                </h2>
              </div>

              {/* Block 1 — SBP Advisory */}
              <div className="px-1 py-1">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  The State Bank of Pakistan (SBP) has issued an{" "}
                  <a
                    href="https://www.sbp.org.pk/press/2022/Pr-18-May-2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-foreground hover:text-accent transition-colors"
                  >
                    advisory
                  </a>{" "}
                  against illegal offshore forex, margin trading, and CFD platforms such as
                  OctaFX, Exness, XM, and EasyForex, which lure the public through social
                  media ads. SBP has instructed banks and exchange companies to block payments
                  to these platforms due to their high risk and unauthorized operations.
                </p>
              </div>

              {/* Block 2 — PMEX legitimacy */}
              <div className="px-1 py-1">
                <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                  PMEX is Pakistan's only SECP-licensed and regulated commodity futures exchange.
                  Any app, group, or individual offering trading outside this framework is
                  unregulated and puts your money at risk. Always trade through PMEX-licensed
                  brokers, your only safe and legitimate option.
                </p>
              </div>

              {/* Block 3 — Bold closing statement */}
              <div className="px-1 py-1">
                <p className="text-xs sm:text-sm font-bold text-foreground leading-relaxed">
                  Stay vigilant, stay informed, and trade confidently on Pakistan's only
                  regulated commodity futures exchange.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center pt-1">
                <a
                  href="https://www.aof.com.pk/?ODc0NTQ4NDE4Nzc3NzU3Mjc0ODU4MzIzNDY4NDcyNzM3MTI3NzQ4OQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="bg-[#8db96e] hover:bg-[#7aa85c] text-white font-bold text-sm sm:text-base px-8 py-6 rounded-2xl transition-all hover:-translate-y-0.5 shadow-md"
                  >
                    Open Account with Right Vision
                  </Button>
                </a>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}