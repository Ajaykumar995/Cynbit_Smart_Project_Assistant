/**
 * Intelligent project scoping and tech stack recommendation engine.
 * Computes estimated architecture, complexity, and tech stack based on project inquiry parameters.
 */
export const calculateProjectScope = (projectType, features = [], budget = '', timeline = '') => {
  const featureCount = features.length;

  let complexity = 'Moderate';
  let estimatedHours = '80 - 140 Hours';
  let recommendedStack = ['React.js', 'Node.js', 'Express', 'MongoDB'];

  // Project Type adjustments
  switch (projectType?.toLowerCase()) {
    case 'mobile app':
      recommendedStack = ['React Native / Flutter', 'Node.js API', 'MongoDB Atlas', 'Firebase Cloud Messaging'];
      break;
    case 'ai automation':
      recommendedStack = ['Python / FastAPI', 'LangChain / LlamaIndex', 'React.js', 'Vector DB (Pinecone/Milvus)', 'PostgreSQL / MongoDB'];
      break;
    case 'saas':
      recommendedStack = ['Next.js 14', 'Node.js / TypeScript', 'MongoDB / PostgreSQL', 'Stripe Subscriptions', 'Redis', 'Docker'];
      break;
    case 'web app':
      recommendedStack = ['React.js / Next.js', 'Node.js / Express', 'MongoDB Atlas', 'Tailwind CSS'];
      break;
    case 'website':
      recommendedStack = ['Next.js / Astro', 'Tailwind CSS', 'Headless CMS', 'Vercel / Cloudflare Edge'];
      break;
    default:
      recommendedStack = ['MERN Stack (MongoDB, Express, React, Node.js)', 'Tailwind CSS'];
      break;
  }

  // Feature based additions
  const featureSet = new Set(features.map(f => f.toLowerCase()));
  
  if (featureSet.has('ai chatbot') || featureSet.has('ai automation')) {
    if (!recommendedStack.some(s => s.includes('OpenAI') || s.includes('LangChain'))) {
      recommendedStack.push('OpenAI API / Claude API');
    }
  }
  if (featureSet.has('payments') || featureSet.has('payment gateway')) {
    recommendedStack.push('Razorpay / Stripe Webhooks');
  }
  if (featureSet.has('real-time notifications') || featureSet.has('dashboard')) {
    recommendedStack.push('Socket.io / Redis PubSub');
  }
  if (featureSet.has('analytics')) {
    recommendedStack.push('PostHog / Mixpanel Integration');
  }

  // Complexity calculation
  if (featureCount >= 7 || projectType?.toLowerCase() === 'ai automation' || budget?.includes('3L') || budget?.includes('2L')) {
    complexity = 'Enterprise Grade';
    estimatedHours = '220 - 360 Hours';
  } else if (featureCount >= 4 || budget?.includes('1L') || timeline?.toLowerCase().includes('2-3 months')) {
    complexity = 'Production Scalable';
    estimatedHours = '140 - 220 Hours';
  } else {
    complexity = 'MVP / Agile Prototype';
    estimatedHours = '60 - 120 Hours';
  }

  return {
    complexity,
    estimatedHours,
    recommendedStack: Array.from(new Set(recommendedStack)),
    architectureStyle: complexity === 'Enterprise Grade' ? 'Modular Microservices & Event-Driven' : 'Clean Layered Monolith with RESTful APIs',
  };
};
