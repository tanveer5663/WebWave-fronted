import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, HardDrive, Activity, Lock, ArchiveRestore } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plansData = [
  {
    name: "Starter",
    price: "$2.99",
    period: "/mo",
    description: "Perfect for personal websites and blogs.",
    features: [
      { text: "1 Website", icon: <Globe className="h-4 w-4 text-accent" /> },
      {
        text: "10GB SSD Storage",
        icon: <HardDrive className="h-4 w-4 text-accent" />,
      },
      {
        text: "Unmetered Bandwidth",
        icon: <Activity className="h-4 w-4 text-accent" />,
      },
      {
        text: "Free SSL Certificate",
        icon: <Lock className="h-4 w-4 text-accent" />,
      },
    ],
    cta: "Choose Starter",
    dataAiHint: "basic plan",
  },
  {
    name: "Pro",
    price: "$5.99",
    period: "/mo",
    description: "Ideal for growing businesses and portfolios.",
    features: [
      {
        text: "Unlimited Websites",
        icon: <Globe className="h-4 w-4 text-accent" />,
      },
      {
        text: "50GB SSD Storage",
        icon: <HardDrive className="h-4 w-4 text-accent" />,
      },
      {
        text: "Unmetered Bandwidth",
        icon: <Activity className="h-4 w-4 text-accent" />,
      },
      {
        text: "Free SSL Certificate",
        icon: <Lock className="h-4 w-4 text-accent" />,
      },
      {
        text: "Daily Backups",
        icon: <ArchiveRestore className="h-4 w-4 text-accent" />,
      },
    ],
    cta: "Choose Pro",
    recommended: true,
    dataAiHint: "professional plan",
  },
  {
    name: "Business",
    price: "$9.99",
    period: "/mo",
    description: "For e-commerce and high-traffic sites.",
    features: [
      {
        text: "Unlimited Websites",
        icon: <Globe className="h-4 w-4 text-accent" />,
      },
      {
        text: "100GB SSD Storage",
        icon: <HardDrive className="h-4 w-4 text-accent" />,
      },
      {
        text: "Unmetered Bandwidth",
        icon: <Activity className="h-4 w-4 text-accent" />,
      },
      {
        text: "Free SSL & Domain",
        icon: <Lock className="h-4 w-4 text-accent" />,
      },
      {
        text: "Daily Backups",
        icon: <ArchiveRestore className="h-4 w-4 text-accent" />,
      },
      {
        text: "Priority Support",
        icon: <Lock className="h-4 w-4 text-accent" />,
      },
    ],
    cta: "Choose Business",
    dataAiHint: "business plan",
  },
];

export function PlansSection() {
  return (
    <section
      id="plans"
      className="py-16 md:py-24 bg-primary/5 dark:bg-primary/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">
            Hosting Plans Tailored For You
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Choose the perfect plan to kickstart or scale your online presence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plansData.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-card",
                plan.recommended && "border-2 border-accent shadow-accent/30"
              )}
              data-ai-hint={plan.dataAiHint}
            >
              {plan.recommended && (
                <div className="absolute -top-3 -right-3 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-headline text-primary">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-foreground/70 h-12">
                  {plan.description}
                </CardDescription>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="text-sm text-foreground/60 ml-1">
                    {plan.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      {feature.icon}
                      <span className="ml-2 text-foreground/90">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={cn(
                    "w-full transition-colors",
                    plan.recommended
                      ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground"
                  )}
                >
                  <Link href="#contact">{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
