export type TechCategory = 'frontend' | 'ai-ml' | 'infra' | 'backend';

const CATEGORY_KEYWORDS: Record<TechCategory, string[]> = {
  frontend: ['next.js', 'react', 'typescript', 'tailwind', 'framer', 'html', 'css', 'vue', 'svelte', 'app router'],
  'ai-ml': ['claude', 'groq', 'llama', 'gemini', 'openai', 'pgvector', 'vector', 'embedding', 'ai', 'ml', 'function calling'],
  infra: ['supabase', 'postgres', 'drizzle', 'sqlalchemy', 'redis', 'turborepo', 'vercel', 'cloudflare', 'railway', 'docker', 'prisma', 'orm', 'database', 'rest api'],
  backend: ['fastapi', 'hono', 'node.js', 'python', 'express', 'flask', 'django', 'node'],
};

export function getTechCategory(tech: string): TechCategory | null {
  const t = tech.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS) as [TechCategory, string[]][]) {
    if (keywords.some((k) => t.includes(k))) return cat;
  }
  return null;
}

export const TECH_CAT_CLASS: Record<TechCategory, string> = {
  frontend: 'tag--cat-frontend',
  'ai-ml': 'tag--cat-ai-ml',
  infra: 'tag--cat-infra',
  backend: 'tag--cat-backend',
};
