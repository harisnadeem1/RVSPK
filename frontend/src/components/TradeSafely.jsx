import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TradeSafelySection() {
  return (
    <section className="section-spacing bg-muted">
      <div className="container-custom px-4 sm:px-6">

        {/* Outer wrapper — blue rounded border matching the image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto rounded-3xl border-4 border-primary/80 bg-card p-6 sm:p-8 flex flex-col gap-5"
        >

          {/* Top logos row — PMEX left, Right Vision right */}
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
          <div className=" px-1 py-1 ">
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
          <div className=" px-1 py-1 ">
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              PMEX is Pakistan's only SECP-licensed and regulated commodity futures exchange.
              Any app, group, or individual offering trading outside this framework is
              unregulated and puts your money at risk. Always trade through PMEX-licensed
              brokers, your only safe and legitimate option.
            </p>
          </div>

          {/* Block 3 — Bold closing statement */}
          <div className=" px-1 py-1 ">
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
      Open Account with Right Vision{" "}
    </Button>
  </a>
</div>

        </motion.div>
      </div>
    </section>
  );
}