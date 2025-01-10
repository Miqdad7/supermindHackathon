import React from 'react';
import { Brain, PieChart, Users, Zap, AlertCircle, BarChart2, CodeXml } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-4 sm:p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-teal-500/50 transition-all duration-300">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-900/50 flex items-center justify-center mb-4">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400" />
    </div>
    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-sm sm:text-base text-gray-300">{description}</p>
  </div>
);

const TechStack = ({ icon: Icon, name }) => (
  <div className="flex items-center space-x-2 text-gray-300 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700">
    <Icon className="w-5 h-5" />
    <span>{name}</span>
  </div>
);

const TeamMember = ({ name, role, college, email, github, src }) => (
  <div className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-teal-500/50 transition-all duration-300">
    <Image src={src} height={80} width={80} alt={name} className='mx-auto rounded-full mb-3 aspect-square object-cover' />
    <h3 className="text-lg font-bold text-white mb-1">{name}</h3>
    <p className="text-teal-400 font-medium mb-2">{role}</p>
    <p className="text-gray-400 text-sm mb-2">{college}</p>
    <div className="flex flex-col gap-1 text-sm">
      <a href={`mailto:${email}`} className="text-gray-400 hover:text-teal-400 transition-colors">{email}</a>
      <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-400 transition-colors">GitHub</a>
    </div>
  </div>
);

export default function Home() {
  return (
    <>

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-24 text-center">
        <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-teal-900/50 mb-6 sm:mb-8">
          <Zap className="w-4 h-4 text-teal-400 mr-2" />
          <span className="text-xs sm:text-sm text-teal-400 font-medium">Hackathon Project 2024</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
          Social Media Analytics
          <span className="block text-teal-400">Powered by AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
          Transform your social media data into actionable insights using our AI-powered analytics platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link href={'/dashboard'} className="px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors w-full sm:w-auto font-medium">
            View Dashboard
          </Link>
          <Link href={'https://github.com/Miqdad7/'} className="px-8 py-3 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-colors w-full sm:w-auto font-medium">
            View Github Repo
          </Link>
          
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-4">
          <TechStack icon={CodeXml} name="Next.JS" />
          <TechStack icon={Brain} name="Langflow" />
          <TechStack icon={BarChart2} name="DataStax" />
          <TechStack icon={Zap} name="GPT Integration" />
        </div>
      </section>

      {/* Project Details */}
      <section className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Project Overview</h2>
          <div className="max-w-3xl mx-auto text-gray-300 space-y-6">
            <p>
              Bytelytics is a comprehensive social media analytics platform built during the 2024 Hackathon.
              It leverages the power of Langflow and DataStax Astra DB to provide real-time insights into social media engagement.
            </p>
            <p>
              Our platform analyzes various post types including carousels, reels, and static images to determine their effectiveness.
              Using GPT integration, we generate actionable insights about content performance and audience engagement patterns.
            </p>
            <p>
              Key metrics tracked include average engagement rates, comment analysis, and content type performance comparisons,
              helping social media managers make data-driven decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={PieChart}
            title="Engagement Analytics"
            description="Track likes, shares, and comments across posts with DataStax Astra DB integration."
          />
          <FeatureCard
            icon={Brain}
            title="AI-Powered Insights"
            description="Get intelligent recommendations using GPT integration through Langflow."
          />
          <FeatureCard
            icon={AlertCircle}
            title="Performance Tracking"
            description="Monitor content effectiveness with detailed metrics and trend analysis."
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-800/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-400">The minds behind Bytelytics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <TeamMember
              name="Tharun Raman"
              role="Team Lead"
              college="Nehru Arts and Science College"
              email="tharunraman10@gmail.com"
              github="https://github.com/tharun977"
              src={'/assets/tharun.jpg'}
            />
            <TeamMember
              name="Muhammad Miqdad"
              role="Designer"
              college="Nehru Arts and Science college"
              email="miqdadmikku284@gmail.com"
              github="https://github.com/Miqdad7"
              src={'/assets/miqdad.jpg'}
            />
            <TeamMember
              name="Jishnu P N"
              role="Full-Stack Developer"
              college="Nehru Arts and Science college"
              email="rushi2706@gmail.com"
              github="https://github.com/jishnupn04"
              src={'/assets/jishnu.jpg'}
            />
            <TeamMember
              name="Abhinand K"
              role="Backend Developer"
              college="Nehru Arts and Science college"
              email="chinmaypatel8181@gmail.com"
              github="https://github.com/abhinandappus"
              src={'/assets/abhinand.jpg'}
            />
            
          </div>
        </div>
      </section>

    </>
  );
}