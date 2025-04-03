import { Article } from '@/types/article';

export const mockArticles: Article[] = [
  {
    id: "article-1",
    title: "TP@CK Launches Revolutionary T30 Packaging Solution",
    excerpt: "We're excited to announce the launch of our latest innovation - the T30 packaging machine with enhanced AI capabilities and improved energy efficiency.",
    content: `<p>TP@CK is thrilled to announce the official launch of our revolutionary T30 packaging solution, representing a significant leap forward in packaging technology.</p>

    <p>The T30 builds upon the success of our previous models while introducing several groundbreaking features:</p>

    <ul>
      <li><strong>Advanced AI Integration</strong>: The T30 utilizes our proprietary neural network architecture to optimize packaging operations in real-time, reducing waste by up to 37%.</li>
      <li><strong>Enhanced Energy Efficiency</strong>: Redesigned servo motors and an improved power management system reduce energy consumption by 42% compared to industry standards.</li>
      <li><strong>Expanded Material Compatibility</strong>: The T30 can seamlessly handle a wider range of packaging materials, including fully compostable options.</li>
      <li><strong>Predictive Maintenance System</strong>: Our AI-powered maintenance forecasting reduces downtime by an impressive 74% by identifying potential issues before they occur.</li>
    </ul>

    <p>During the development phase, we worked closely with industry partners to ensure the T30 meets the evolving needs of modern manufacturing environments. The result is a packaging solution that not only improves operational efficiency but also aligns with sustainability goals that are increasingly important to businesses worldwide.</p>

    <p>"The T30 represents years of research and innovation from our engineering team," said Dr. Sarah Chen, Chief Technology Officer at TP@CK. "We've listened carefully to our customers' feedback and have developed a solution that addresses their most pressing challenges while anticipating future needs."</p>

    <p>Early adopters of the T30 have reported significant improvements in their packaging processes, with an average ROI period of just 14 months. The system's intuitive interface and seamless integration with existing warehouse management systems have also received high praise.</p>

    <p>The T30 is now available for order worldwide, with the first units shipping in Q2 2025. For more information or to schedule a demonstration, please contact our sales department.</p>`,
    publishDate: "2025-03-20",
    readTime: 5,
    image: "/images/t30-machine.jpg",
    author: {
      name: "Maria Rodriguez",
      avatar: "/images/testimonial-1.jpg"
    },
    tags: ["innovations", "technology"],
    featured: true
  },
  {
    id: "article-2",
    title: "Sustainability Initiative: Our Path to Carbon Neutrality",
    excerpt: "TP@CK is committed to sustainability. Learn about our comprehensive plan to achieve carbon neutrality across all operations by 2030.",
    content: "Full article content here with multiple paragraphs...",
    publishDate: "2025-03-15",
    readTime: 7,
    image: "/images/hero-background.jpg",
    author: {
      name: "Thomas Weber",
      avatar: "/images/testimonial-2.jpg"
    },
    tags: ["company", "insights"]
  },
  {
    id: "article-3",
    title: "Customer Success Story: How Global Logistics Increased Efficiency by 32%",
    excerpt: "Read how one of our clients implemented TP@CK solutions and achieved remarkable results in just three months.",
    content: "Full article content here with multiple paragraphs...",
    publishDate: "2025-03-10",
    readTime: 6,
    image: "/images/hero-small.jpg",
    author: {
      name: "Emma Chen",
      avatar: "/images/testimonial-3.jpg"
    },
    tags: ["case-studies", "success-stories"]
  },
  {
    id: "article-4",
    title: "The Future of Packaging: Trends to Watch in 2025 and Beyond",
    excerpt: "Our team of experts analyzes the most important packaging trends that will shape the industry in the coming years.",
    content: "Full article content here with multiple paragraphs...",
    publishDate: "2025-03-01",
    readTime: 9,
    image: "/images/product-1.jpg",
    author: {
      name: "Thomas Weber",
      avatar: "/images/testimonial-2.jpg"
    },
    tags: ["insights", "industry", "trends"]
  }
];
