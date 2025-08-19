import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import "./globals.css"; 
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Stethoscope } from "lucide-react";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { PricingTable } from "@clerk/nextjs";


export default function Home() {
  return (
    <div className="bg-background">
      <section className="relative overflow-hidden py-32">
        <div className="container mx-auto px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 font-medium text-sm text-emerald-400">Healthcare made simple</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">Connect with doctors <br/>{""}
              <span className="gradient-title">anytime, anywhere</span></h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Book appointments, consult via video, and manage your healthcare
                journey all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <Button asChild size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <Link href="/onboarding">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="border-emerald-700/30  hover:bg-muted/80">
                  <Link href="/Doctors">
                    Find Doctors 
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="/banner2.png"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover md:pt-14 rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-12 ">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              our platform make healthcare accessible with just few clicks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor ">
            {features.map((feature,index) => {
              return (
                <Card key={index} className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 ">
        <div className="container mx-auto px-12 ">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4">Affordable HealthCare</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Consultation Packages</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the perfect consultation packages that fit your healthcare need
            </p>
          </div>
          <div>
            {/* pricing table */}
              <PricingTable />
              <Card className="mt-20 bg-muted/30 border-emerald-900/30">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-white flex items-center"><Stethoscope className="h-5 w-5 mr-2 text-emerald-400" />How our system credit works</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {creditBenefits.map( (benefit, index)=> {
                        return <li key={index} className="flex items-start">
                          <div className="mr-3 mt-1 bg-emerald-900/20 p-1 rounded-full">
                            <Check className="h-4 w-4 text-emerald-400" />
                          </div>
                          <p
                              className="text-muted-foreground mt-1"
                              dangerouslySetInnerHTML={{ __html: benefit }}
                            />
                        </li>
                    })}
                  </ul>
                </CardContent>
              </Card>
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-12 ">
          <div className="text-center mb-16">
            <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
               Hear from patients and doctors who use our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cursor ">
            {testimonials.map((testimonials,index) => {
              return (
                <Card key={index} className="bg-card border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4">
                        <span className="text-emerald-400 font-bold">{testimonials.initials}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonials.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonials.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      &quot;{testimonials.quote}&quot;
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>



      {/* CTA Section with green medical styling */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to take control of your healthcare?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users who have simplified their healthcare
                  journey with our platform. Get started today and experience
                  healthcare the way it should be.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    <Link href="/sign-up">Sign Up Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-emerald-700/30 hover:bg-muted/80"
                  >
                    <Link href="#pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>

              {/* Decorative healthcare elements */}
              {/* <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-emerald-800/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-emerald-700/10 rounded-full blur-3xl -ml-10 -mb-10"></div> */}
            </CardContent>
          </Card>
        </div>
      </section>

















    </div>
  );
}
