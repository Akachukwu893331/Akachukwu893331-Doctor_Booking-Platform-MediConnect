import { Badge } from "@/components/ui/badge"
import {
  Card,
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
import { ArrowRight, Check, Stethoscope, Play, Shield, Clock, Calendar, Star, Award, Users, Zap, Heart } from "lucide-react";
import { creditBenefits, features, testimonials } from "@/lib/data";
import { PricingTable } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section with improved visual hierarchy */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 to-background z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 font-medium text-sm text-emerald-400 rounded-full">
                  <Heart className="w-4 h-4 mr-1" /> Healthcare made simple
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with doctors <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">anytime, anywhere</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
                Book appointments, consult via video, and manage your healthcare journey all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 shadow-lg shadow-emerald-600/25">
                  <Link href="/onboarding" className="flex items-center">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-emerald-700/30 hover:bg-muted/80 rounded-full px-8">
                  <Link href="/Doctors" className="flex items-center">
                    Find Doctors 
                  </Link>
                </Button>
              </div>
              
              {/* Trust indicators */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-emerald-400" />
                  <span>10,000+ Patients</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2 text-emerald-400" />
                  <span>200+ Doctors</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-emerald-400" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-[380px] md:h-[480px] lg:h-[580px] rounded-2xl overflow-hidden order-first lg:order-last shadow-2xl shadow-emerald-900/30">
              <Image
                src="/banner2.png"
                alt="Doctor consultation"
                fill
                priority
                className="object-cover object-center rounded-2xl"
              />
              
              {/* Floating stats card */}
              <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-[240px]">
                <div className="flex items-center">
                  <div className="bg-emerald-900/20 p-2 rounded-lg mr-3">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Same Day Appointments</p>
                    <p className="text-sm text-muted-foreground">Available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '24/7', label: 'Availability' },
              { value: '98%', label: 'Patient Satisfaction' },
              { value: '15min', label: 'Average Wait Time' },
              { value: '200+', label: 'Specialists' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card/50 rounded-xl border border-emerald-900/20">
                <p className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with improved visual design */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4 rounded-full">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Healthcare Made Simple</h2>
            <p className="text-muted-foreground text-lg">
              Our platform makes healthcare accessible with just a few clicks
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300 group hover:shadow-lg hover:shadow-emerald-900/10 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="bg-emerald-900/20 p-3 rounded-lg w-fit mb-4 transition-all duration-300 group-hover:bg-emerald-800/30 group-hover:scale-105">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
                <div className="px-6 pb-4">
                  <div className="w-0 h-0.5 bg-emerald-400/30 group-hover:w-12 transition-all duration-500"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Consultation Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4 rounded-full">
                Virtual Care
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Quality Care From Home</h2>
              <p className="text-muted-foreground text-lg">
                Experience secure and convenient virtual consultations with board-certified doctors. Our platform ensures you receive the same quality care as an in-person visit.
              </p>
              
              <ul className="space-y-4">
                {[
                  "HD video consultations with specialists",
                  "Secure messaging with your care team",
                  "Prescription refills without leaving home",
                  "Digital health records at your fingertips"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-emerald-900/20 p-1 rounded-full mt-1 mr-3">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 mt-4">
                <Link href="/Doctors">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl shadow-emerald-900/20">
              <div className="absolute inset-0 bg-emerald-900/20 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16 bg-emerald-600/80 hover:bg-emerald-700 backdrop-blur-sm">
                  <Play className="w-8 h-8 fill-white" />
                </Button>
              </div>
              <Image
                src="/banner.png"
                alt="Video consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4 rounded-full">
              Affordable Healthcare
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground text-lg">
              Choose the perfect consultation package that fits your healthcare needs without hidden fees
            </p>
          </div>
          
          <div className="mb-16">
            <PricingTable />
          </div>
          
          <Card className="bg-card/50 border-emerald-900/30 rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-emerald-400" /> How our credit system works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ul className="space-y-4">
                  {creditBenefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-emerald-900/20 p-1 rounded-full mt-1 mr-3">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  {creditBenefits.slice(3).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="bg-emerald-900/20 p-1 rounded-full mt-1 mr-3">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </div>
                      <p
                        className="text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: benefit }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section with improved design */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="bg-emerald-900/30 border-emerald-700/30 px-4 py-1 text-emerald-400 text-sm font-medium mb-4 rounded-full">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Patients & Doctors</h2>
            <p className="text-muted-foreground text-lg">
              Hear from people who have transformed their healthcare experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 border-emerald-900/20 hover:border-emerald-800/40 transition-all duration-300 group overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-emerald-400 font-bold">{testimonial.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    &quot;{testimonial.quote}&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Medical Specialties</h2>
            <p className="text-muted-foreground text-lg">
              Connect with experts across various medical fields
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Cardiology', icon: <Heart className="w-8 h-8" /> },
              { name: 'Dermatology', icon: <Zap className="w-8 h-8" /> },
              { name: 'Pediatrics', icon: <Users className="w-8 h-8" /> },
              { name: 'Psychiatry', icon: <Shield className="w-8 h-8" /> },
              { name: 'Orthopedics', icon: <Award className="w-8 h-8" /> },
              { name: 'Neurology', icon: <Clock className="w-8 h-8" /> }
            ].map((specialty, index) => (
              <div key={index} className="bg-card/50 border border-emerald-900/20 rounded-xl p-6 text-center group hover:border-emerald-800/40 transition-colors">
                <div className="text-emerald-400 mb-3 flex justify-center">{specialty.icon}</div>
                <h3 className="font-medium text-white">{specialty.name}</h3>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-emerald-700/30 hover:bg-muted/80 rounded-full px-8">
              <Link href="/Doctors">
                View All Specialties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      
      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 border-emerald-800/20 rounded-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-3xl mx-auto text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to take control of your healthcare?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join thousands of users who have simplified their healthcare journey with our platform. 
                  Get started today and experience healthcare the way it should be.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-full px-8 shadow-lg shadow-emerald-600/25"
                  >
                    <Link href="/sign-up">Sign Up Now</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-emerald-700/30 hover:bg-muted/80 rounded-full px-8"
                  >
                    <Link href="/pricing">View Pricing</Link>
                  </Button>
                </div>
              </div>

              {/* Decorative healthcare elements */}
              <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-emerald-800/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-emerald-700/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}