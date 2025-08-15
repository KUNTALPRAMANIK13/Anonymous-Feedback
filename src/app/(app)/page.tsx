"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import messages from "../message.json";
import Autoplay from "embla-carousel-autoplay";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

function Home() {
  const date = new Date();

  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 bg-gray-800 text-white">
        <section className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            True Feedback - Where your identity remains a secret.
          </p>
        </section>

        <div className="w-full max-w-4xl">
          <Carousel
            opts={{
              align: "center",
              loop: true,
              containScroll: "trimSnaps",
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-4/5 md:basis-2/3 lg:basis-1/2 xl:basis-2/5"
                >
                  <div className="p-1">
                    <Card className="bg-gray-700 border-gray-600 text-white">
                      <CardHeader className="pb-2">
                        <h3 className="text-lg font-semibold text-gray-100">
                          {message.title}
                        </h3>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                        <Mail
                          className="flex-shrink-0 text-blue-400"
                          size={20}
                        />
                        <div className="flex-1">
                          <p className="text-gray-200 mb-2">
                            {message.content}
                          </p>
                          <p className="text-xs text-gray-400">
                            {message.received}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-gray-600 hover:bg-gray-700" />
            <CarouselNext className="text-white border-gray-600 hover:bg-gray-700" />
          </Carousel>
        </div>
      </main>
      <footer className="text-center p-4 md:p-6 bg-gray-900 text-white">
        © {date.getFullYear()} True Feedback. All rights reserved.
      </footer>
    </>
  );
}

export default Home;
