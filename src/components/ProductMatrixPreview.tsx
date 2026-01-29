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
  const categories: {
    key: Category;
    label: string;
  }[] = [{
    key: "all",
    label: "All Protocols"
  }, {
    key: "voice",
    label: "Voice Autonomy"
  }, {
    key: "multimodal",
    label: "Multi-Modal Synthesis"
  }, {
    key: "operational",
    label: "Operational Logic"
  }, {
    key: "advisory",
    label: "Strategic Advisory"
  }];
  const protocolNodes: ProtocolNode[] = [{
    id: "NT-01",
    name: "Voice Core",
    category: "voice",
    description: "Foundational voice synthesis engine"
  }, {
    id: "NT-02",
    name: "Dialect Engine",
    category: "voice",
    description: "Regional accent adaptation module"
  }, {
    id: "NT-03",
    name: "Vision Parser",
    category: "multimodal",
    description: "Real-time visual input processing"
  }, {
    id: "NT-04",
    name: "Audio Mesh",
    category: "multimodal",
    description: "Spatial audio understanding layer"
  }, {
    id: "NT-05",
    name: "Logic Router",
    category: "operational",
    description: "Decision tree orchestration"
  }, {
    id: "NT-06",
    name: "State Manager",
    category: "operational",
    description: "Conversational memory protocol"
  }, {
    id: "NT-07",
    name: "Strategy Core",
    category: "advisory",
    description: "Enterprise ROI modeling"
  }, {
    id: "NT-08",
    name: "Governance Hub",
    category: "advisory",
    description: "Compliance automation suite"
  }];
  const filteredNodes = activeCategory === "all" ? protocolNodes : protocolNodes.filter(node => node.category === activeCategory);
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
  return <section className="py-32 relative" id="products">
      
    </section>;
};
export default ProductMatrixPreview;