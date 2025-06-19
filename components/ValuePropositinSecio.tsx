import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, ShieldCheck, LifeBuoy } from "lucide-react";
import { NeonGradientCard } from "./magicui/neon-gradient-card";

const benefits = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-accent" />,
    title: "99.9% Uptime Guarantee",
    description:
      "Reliable hosting that keeps your website online and accessible around the clock.",
    dataAiHint: "shield security",
  },
  {
    icon: <Zap className="h-10 w-10 text-accent" />,
    title: "Blazing Fast Speeds",
    description:
      "Optimized servers and caching for lightning-fast page loads and a great user experience.",
    dataAiHint: "lightning speed",
  },
  {
    icon: <LifeBuoy className="h-10 w-10 text-accent" />,
    title: "24/7 Expert Support",
    description:
      "Our friendly and knowledgeable support team is always here to help you, day or night.",
    dataAiHint: "support help",
  },
];

export function ValuePropositionSection() {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">
            Why Choose WebWave?
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            We&apos;re committed to providing you with the best hosting
            experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <NeonGradientCard key={index} borderSize={2}>
              <Card
                key={index}
                className="text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 bg-card"
                data-ai-hint={benefit.dataAiHint}
              >
                <CardHeader className="items-center">
                  <div className="p-4 bg-accent/10 rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl font-headline text-primary">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70">{benefit.description}</p>
                </CardContent>
              </Card>
            </NeonGradientCard>
          ))}
        </div>
      </div>
    </section>
  );
}
