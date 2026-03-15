import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const agents = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/agents" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    leverage: z.number().min(0).max(10),
    execution: z.number().min(0).max(10),
    roi: z.number().min(0).max(10),
    total: z.number(),
    date: z.coerce.date(),
    level: z.string().optional(),
    metadata: z.object({
      founder: z.string(),
      team_size: z.string(),
      location: z.string(),
      funding: z.string()
    }).optional(),
    vulnerabilities: z.array(z.object({
      risk: z.string(),
      level: z.enum(['高', '中', '低', '极高']),
      strategy: z.string()
    })).optional(),
    // 商业画布 (9宫格)
    canvas: z.object({
      partners: z.union([z.string(), z.array(z.string())]),     // 关键合作伙伴
      activities: z.union([z.string(), z.array(z.string())]),   // 关键活动
      resources: z.union([z.string(), z.array(z.string())]),    // 核心资源
      value_prop: z.union([z.string(), z.array(z.string())]),   // 价值主张
      relationships: z.union([z.string(), z.array(z.string())]),// 客户关系
      channels: z.union([z.string(), z.array(z.string())]),     // 渠道渠道
      segments: z.union([z.string(), z.array(z.string())]),     // 客户细分
      costs: z.union([z.string(), z.array(z.string())]),        // 成本结构
      revenues: z.union([z.string(), z.array(z.string())]),     // 收入来源
    }),
    // 雷达图数据
    radar: z.array(z.number()).length(6),
  }),
});

export const collections = { agents };
