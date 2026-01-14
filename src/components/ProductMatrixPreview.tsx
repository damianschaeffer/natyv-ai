import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Category = "all" | "voice" | "multimodal" | "operational" | "advisory";

interface ProtocolNode {
  id: string;
  name: string;
  category: Category;
  description: string;
}

const ProductMatrixPreview = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: "All Protocols" },
    { key: "voice", label: "Voice Autonomy" },
    { key: "multimodal", label: "Multi-Modal Synthesis" },
    { key: "operational", label: "Operational Logic" },
    { key: "advisory", label: "Strategic Advisory" },
  ];

  const protocolNodes: ProtocolNode[] = [
    { id: "NT-01", name: "Voice Core", category: "voice", description: "Foundational voice synthesis engine" },
    { id: "NT-02", name: "Dialect Engine", category: "voice", description: "Regional accent adaptation module" },
    { id: "NT-03", name: "Vision Parser", category: "multimodal", description: "Real-time visual input processing" },
    { id: "NT-04", name: "Audio Mesh", category: "multimodal", description: "Spatial audio understanding layer" },
    { id: "NT-05", name: "Logic Router", category: "operational", description: "Decision tree orchestration" },
    { id: "NT-06", name: "State Manager", category: "operational", description: "Conversational memory protocol" },
    { id: "NT-07", name: "Strategy Core", category: "advisory", description: "Enterprise ROI modeling" },
    { id: "NT-08", name: "Governance Hub", category: "advisory", description: "Compliance automation suite" },
  ];

  const filteredNodes =
    activeCategory === "all"
      ? protocolNodes
      : protocolNodes.filter((node) => node.category === activeCategory);

  const getCategoryColor = (category: Category): string => {
    switch (category) {
      case "voice":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "multimodal":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "operational":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "advisory":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <section className="py-32 relative" id="products">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4 block">
            The N-78 Protocol
          </span>
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-4">
            Product Matrix
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
            78 Protocol Nodes engineered for enterprise autonomy
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs font-body uppercase tracking-wider rounded-sm border transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Protocol Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredNodes.map((node, index) => (
              <motion.div
                key={node.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="glass rounded-lg p-6 h-full hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  {/* Node ID */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-primary font-body text-xs tracking-[0.2em]">
                      {node.id}
                    </span>
                    <span
                      className={`px-2 py-1 text-[10px] uppercase tracking-wider rounded border ${getCategoryColor(
                        node.category
                      )}`}
                    >
                      {node.category === "multimodal" ? "Multi-Modal" : node.category}
                    </span>
                  </div>

                  {/* Node Name */}
                  <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {node.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {node.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 text-primary font-body text-sm tracking-wide hover:gap-4 transition-all duration-300 group"
            whileHover={{ x: 4 }}
          >
            <span>View Full Protocol Matrix</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>
          <p className="text-muted-foreground text-xs mt-2 font-body">
            70 more nodes available
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductMatrixPreview;