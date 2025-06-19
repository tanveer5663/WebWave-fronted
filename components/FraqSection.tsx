"use client";

import React, { useState, useTransition } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const predefinedQuestions = [
  {
    question: "What is web hosting?",
    answer:
      "Web hosting is a service that allows organizations and individuals to post a website or web page onto the Internet. A web host, or web hosting service provider, is a business that provides the technologies and services needed for the website or webpage to be viewed on the Internet.",
  },
  {
    question: "What types of hosting plans do you offer?",
    answer:
      "We offer a variety of hosting plans including Starter, Pro, and Business, each tailored to different needs, from personal blogs to large e-commerce sites. You can find more details in our Plans section.",
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer:
      "Yes, you can easily upgrade your hosting plan at any time as your website grows or your needs change. Our system allows for seamless upgrades without downtime.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer:
      "Yes, we offer a 30-day money-back guarantee on all our hosting plans. If you're not satisfied for any reason, you can request a full refund within the first 30 days.",
  },
];

export function FaqSection() {
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <section id="faq" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Find answers to common questions. Can&apos;t find what you&apos;re
            looking for? Ask our AI assistant!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-6 font-headline text-primary/90">
              Common Questions
            </h3>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {predefinedQuestions.map((item, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={index}
                  className="bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="p-4 md:p-6 text-left font-medium text-base md:text-lg text-foreground hover:text-primary">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 md:p-6 pt-0 text-foreground/80">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          {/* <Card className="shadow-xl bg-card">
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center">
                <Sparkles className="h-6 w-6 text-accent mr-2" /> Ask Our AI
                Assistant
              </CardTitle>
              <CardDescription>
                Have a specific question? Type it below and our AI will try to
                answer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="question"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/90">
                          Your Question
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., How do I transfer my existing website?"
                            {...field}
                            className="bg-background/50 focus:bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {isPending ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "tanveer"
                    )}
                    Ask AI
                  </Button>
                </form>
              </Form>

              {isPending && (
                <div className="mt-6 text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                  <p className="text-foreground/70 mt-2">Thinking...</p>
                </div>
              )}

              {aiAnswer && !isPending && (
                <div className="mt-6 p-4 border rounded-lg bg-primary/5">
                  <h4 className="font-semibold text-primary mb-2">
                    AI's Answer:
                  </h4>
                  <p className="text-foreground/90 whitespace-pre-wrap">
                    {aiAnswer}
                  </p>
                </div>
              )}
            </CardContent>
          </Card> */}
        </div>
      </div>
    </section>
  );
}
