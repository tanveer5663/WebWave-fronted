import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react"; // Using Star for ratings
import Image from "next/image";

const testimonialsData = [
  {
    name: "Sarah L.",
    title: "Founder, Bloom & Grow E-Shop",
    quote:
      "WebWave's uptime is phenomenal! My e-commerce site has never been more stable. Their support team is also incredibly responsive and helpful.",
    avatar: "https://placehold.co/100x100.png",
    rating: 5,
    dataAiHint: "woman smiling",
  },
  {
    name: "Mike P.",
    title: "Blogger, TechThoughts",
    quote:
      "Migrating to WebWave was seamless. My blog loads noticeably faster, and the interface is so user-friendly. Highly recommend for any blogger!",
    avatar: "https://placehold.co/100x100.png",
    rating: 5,
    dataAiHint: "man glasses",
  },
  {
    name: "Carlos G.",
    title: "Developer, Innovate Solutions",
    quote:
      "As a developer, I appreciate the robust features and flexibility WebWave offers. Their server performance is top-tier for my client projects.",
    avatar: "https://placehold.co/100x100.png",
    rating: 4,
    dataAiHint: "developer code",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-16 md:py-24 bg-primary/5 dark:bg-primary/10"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-4 text-primary">
            Loved by Innovators Like You
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Hear what our satisfied customers have to say about their WebWave
            experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card
              key={index}
              className="shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 bg-card overflow-hidden"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground/80 italic mb-6 flex-grow">
                  {testimonial.quote}
                </p>
                <div className="flex items-center mt-auto">
                  <Avatar className="h-12 w-12 mr-4">
                    {/* <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      data-ai-hint={testimonial.dataAiHint}
                    /> */}
                    <AvatarFallback>
                      {testimonial.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-foreground/70">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
