import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Brain, Users, Shield, Star } from "lucide-react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logo1.svg"
            alt="Juno.ai Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Juno.ai
          </span>
        </div>
        <Link href="/sign-in">
          <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-8">
            <SparklesText className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Meet Your AI Assistant
            </SparklesText>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 font-light">
              Juno.ai handles your tasks, so you can focus on what matters most
            </h2>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Intelligence</h3>
              <p className="text-gray-300 text-sm">Advanced AI that understands context and learns from your preferences</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-300 text-sm">Get instant responses and complete tasks in seconds, not minutes</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-300 text-sm">Your data stays protected with enterprise-grade security</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="space-y-6">
            <Link href="/sign-in">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Join thousands of users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
      </main>

      {/* Bottom section */}
      <footer className="relative z-10 text-center py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-gray-300">
              Powered by cutting-edge AI technology
            </span>
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 Juno.ai. Crafted with care for the future of productivity.
          </p>
        </div>
      </footer>
    </div>
  );
}