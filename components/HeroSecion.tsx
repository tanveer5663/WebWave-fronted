import React from "react";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Meteors } from "@/components/magicui/meteors";
import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export function HeroSection() {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-background to-indigo-50/50 dark:from-background dark:to-indigo-900/30 py-24 md:py-32 lg:py-40 min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center ">
        <Meteors number={10} />
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-headline tracking-tight mb-6 animate-slide-in [animation-delay:0.1s]">
          <span className="text-primary-100">Launch</span> Your Vision with
          <br />
          <AuroraText>WebWave Hosting</AuroraText>
          {/* WebWave Hosting */}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto mb-10 animate-slide-in [animation-delay:0.2s]">
          Experience unparalleled uptime, blazing-fast speeds, and expert
          support. WebWave provides the reliable foundation your website
          deserves.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-slide-in [animation-delay:0.3s]">
          <SignedIn>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105 shadow-lg"
            >
              <Link href="/dashboard">Get Started Today</Link>
            </Button>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground transition-transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </Button>
            </SignInButton>
          </SignedOut>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 transition-transform hover:scale-105 shadow-lg"
          >
            <Link href="#plans">Find Your Plan</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
export default HeroSection;
