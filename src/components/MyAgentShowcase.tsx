import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ClipboardList, 
  User, 
  Building2, 
  Target, 
  Phone, 
  PhoneMissed, 
  DollarSign, 
  CheckCircle,
  Mic,
  Lightbulb,
  BarChart3,
  Send,
  Paperclip,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";

const MyAgentShowcase = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const formFields = [
    { icon: User, label: "Your Name", value: "--" },
    { icon: Building2, label: "Business Type", value: "--" },
    { icon: Target, label: "Business Name", value: "--" },
    { icon: ClipboardList, label: "Service Needs", value: "--" },
    { icon: Phone, label: "Daily Calls", value: "--" },
    { icon: PhoneMissed, label: "Missed Calls", value: "--" },
    { icon: DollarSign, label: "Customer Value", value: "--" },
    { icon: CheckCircle, label: "Trial Offer Response", value: "--" },
  ];

  const quickAssessment = [
    { question: "Recently opened email?", selected: "Yes" },
    { question: "Visited website in 30 days?", selected: "Maybe" },
    { question: "Previously purchased?", selected: "No" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-display italic text-foreground mb-2">
          Experience The <span className="text-primary">My</span><span className="text-amber-400">Agent</span>
          <span className="text-primary align-super text-lg">✦</span> Magic
        </h2>
        <p className="text-muted-foreground font-body">
          AI that listens. Responds. Remembers.
        </p>
      </div>

      {/* Three Panel Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
        {/* Navigation Arrows */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 w-10 h-10 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 w-10 h-10 rounded-full bg-secondary/80 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Left Panel - New Hire Setup */}
        <motion.div 
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">New Hire Setup</h3>
                <p className="text-muted-foreground text-xs">AI-Captured Goal Information</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">⚙</span>
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs">0%</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {formFields.map((field, index) => (
              <div key={index} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
                <field.icon className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-foreground text-sm">{field.label}</p>
                  <p className="text-muted-foreground text-xs">{field.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
            <span className="text-muted-foreground text-xs">0/12 captured</span>
            <span className="text-primary text-xs font-medium">Goal Progress</span>
          </div>
        </motion.div>

        {/* Center Panel - Sophia Chat */}
        <motion.div 
          className="bg-card/50 backdrop-blur-sm border-2 border-primary/50 rounded-xl p-4 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Agent Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-amber-500/30 flex items-center justify-center overflow-hidden border-2 border-primary/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mic className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></span>
              </div>
              <div>
                <h3 className="text-foreground font-semibold">Sophia</h3>
                <p className="text-xs">
                  <span className="text-primary">My</span>
                  <span className="text-amber-400">Agent</span>
                  <span className="text-muted-foreground">® Specialist</span>
                </p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="min-h-[280px] flex flex-col">
            {/* Agent Message */}
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400/30 to-amber-600/30 flex-shrink-0 flex items-center justify-center">
                <User className="w-4 h-4 text-amber-400" />
              </div>
              <div className="bg-primary/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                <p className="text-foreground text-sm">
                  Hello, I'm Sophia! Please let me show you how I can help you with your business as your Exec|
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs ml-11 mb-auto">Just now</p>

            {/* Input Area */}
            <div className="mt-auto pt-4">
              <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 border border-border">
                <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
                  readOnly
                />
                <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Visual Insights */}
        <motion.div 
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">Visual Insights</h3>
                <p className="text-muted-foreground text-xs">AI-Generated Analysis</p>
              </div>
            </div>
          </div>

          {/* Response Heatmap Card */}
          <div className="bg-secondary/30 rounded-lg p-3 mb-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-foreground text-sm font-medium">Response Heatmap</p>
                  <p className="text-muted-foreground text-xs">24-Hour Analysis</p>
                </div>
              </div>
              <button className="text-muted-foreground hover:text-foreground">×</button>
            </div>

            {/* Quick Assessment */}
            <div className="space-y-3">
              <p className="text-foreground text-xs font-medium">Quick Assessment</p>
              
              {quickAssessment.map((item, index) => (
                <div key={index}>
                  <p className="text-muted-foreground text-xs mb-1">{item.question}</p>
                  <div className="flex gap-1">
                    {["Yes", "No", "Maybe"].map((option) => (
                      <button
                        key={option}
                        className={`flex-1 py-1.5 rounded text-xs font-medium transition-colors ${
                          item.selected === option
                            ? option === "Yes"
                              ? "bg-green-500/20 text-green-400 border border-green-500/50"
                              : option === "No"
                              ? "bg-red-500/20 text-red-400 border border-red-500/50"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                            : "bg-secondary/50 text-muted-foreground border border-border/50"
                        }`}
                      >
                        {option === "Yes" && "✓ "}
                        {option === "No" && "✗ "}
                        {option === "Maybe" && "◐ "}
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Revival Score */}
            <div className="mt-4 bg-secondary/50 rounded-lg p-3 border border-amber-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-foreground text-xs font-medium">Revival Score</span>
                <span className="text-green-400 text-lg font-bold">44%</span>
              </div>
              <div className="h-1.5 bg-background rounded-full overflow-hidden mb-1">
                <div className="h-full w-[44%] bg-gradient-to-r from-green-500 to-green-400 rounded-full" />
              </div>
              <p className="text-amber-400 text-xs">↗ Medium - Worth a Try</p>
            </div>

            {/* Expected Value */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-muted-foreground" />
                <span className="text-muted-foreground text-xs">Expected Value</span>
              </div>
              <span className="text-green-400 font-bold">$438</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-primary">● 10 of 10</span>
            <span className="text-muted-foreground">■ Stop</span>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === 0 
                ? "w-8 bg-primary" 
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyAgentShowcase;
