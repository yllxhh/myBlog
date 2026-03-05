// 技术博客文章数据
export const articles = [
  {
    id: 1,
    title: 'Vue 3 组合式 API 完全指南',
    excerpt: '深入理解 Vue 3 的组合式 API，掌握 setup、ref、reactive 等核心概念，提升代码组织能力...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '张三',
    authorAvatar: 'https://i.pravatar.cc/40?img=1',
    authorBio: '资深前端工程师，专注 Vue 技术栈 5 年，热衷于技术分享',
    date: '2024 年 1 月 15 日',
    views: '1,234',
    likes: '128',
    tags: ['Vue', 'Vue 3', '组合式 API', 'JavaScript'],
    size: 'normal',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>Vue 3 引入了组合式 API（Composition API），这是一种全新的代码组织方式。它让我们可以更好地组织逻辑，提高代码的可复用性和可维护性。</p>
      <p>在 Vue 2 中，我们使用选项式 API（Options API），数据、方法、计算属性等都是按照选项来组织的。而在 Vue 3 中，组合式 API 允许我们按照逻辑关注点来组织代码。</p>

      <h2 id="section2">2. 核心概念</h2>
      <h3 id="section2-1">2.1 setup 函数</h3>
      <p>setup 函数是组合式 API 的入口点，它在组件创建之前执行。所有的响应式数据、计算属性、方法都应该在 setup 函数中定义。</p>
      <pre><code>export default {
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }
    return { count, increment }
  }
}</code></pre>

      <h3 id="section2-2">2.2 reactive 和 ref</h3>
      <p>reactive 用于创建对象的响应式代理，而 ref 用于创建基本类型的响应式引用。</p>
      <pre><code>const state = reactive({ count: 0 })
const count = ref(0)</code></pre>

      <h3 id="section2-3">2.3 computed 和 watch</h3>
      <p>computed 用于创建计算属性，watch 用于监听响应式数据的变化。</p>
      <pre><code>const double = computed(() => count.value * 2)
watch(count, (newVal, oldVal) => {
  console.log('count 改变了:', newVal)
})</code></pre>

      <h2 id="section3">3. 实践应用</h2>
      <h3>3.1 逻辑复用 - Composables</h3>
      <p>组合式 API 最大的优势就是可以通过 composables 函数来实现逻辑复用。我们可以将通用的逻辑抽取到独立的函数中。</p>
      <pre><code>// useCounter.js
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}</code></pre>

      <h3>3.2 生命周期钩子</h3>
      <p>Vue 3 提供了与 Vue 2 对应的生命周期钩子，但需要使用 on 前缀。</p>
      <pre><code>onMounted(() => {
  console.log('组件已挂载')
})
onUpdated(() => {
  console.log('组件已更新')
})</code></pre>

      <h2 id="section4">4. 总结</h2>
      <p>组合式 API 为 Vue 带来了更强大的代码组织能力。它特别适合：</p>
      <ul>
        <li>大型组件的逻辑拆分</li>
        <li>跨组件的逻辑复用</li>
        <li>更好的 TypeScript 支持</li>
        <li>更灵活的代码组织方式</li>
      </ul>
      <p>希望这篇文章能帮助你更好地理解和掌握 Vue 3 的组合式 API！</p>
    `,
    prevArticle: null,
    nextArticle: {
      id: 2,
      title: 'Node.js 性能优化最佳实践'
    }
  },
  {
    id: 2,
    title: 'Node.js 性能优化最佳实践',
    excerpt: '分享在实际项目中优化 Node.js 应用性能的经验，包括缓存策略、数据库优化、集群部署等...',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    category: '后端',
    categoryColor: '#ff6b81',
    author: '李四',
    authorAvatar: 'https://i.pravatar.cc/40?img=2',
    authorBio: '后端架构师，10 年 Node.js 开发经验，擅长高并发系统设计',
    date: '2024 年 1 月 14 日',
    views: '2,156',
    likes: '256',
    tags: ['Node.js', '性能优化', '后端', '缓存'],
    size: 'normal',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>Node.js 作为基于 Chrome V8 引擎的 JavaScript 运行时，以其非阻塞 I/O 和事件驱动的特性，在高并发场景下表现出色。然而，不当的使用方式也会导致性能问题。</p>
      <p>本文将分享在实际项目中优化 Node.js 应用性能的实战经验，帮助你构建更高效的 Node.js 应用。</p>

      <h2 id="section2">2. 缓存策略</h2>
      <h3 id="section2-1">2.1 Redis 缓存</h3>
      <p>使用 Redis 作为缓存层可以显著减少数据库查询，提升响应速度。</p>
      <pre><code>const Redis = require('ioredis');
const redis = new Redis();

async function getUser(id) {
  const cached = await redis.get(\`user:\${id}\`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  await redis.setex(\`user:\${id}\`, 3600, JSON.stringify(user));
  return user;
}</code></pre>

      <h3 id="section2-2">2.2 内存缓存</h3>
      <p>对于不经常变化的数据，可以使用内存缓存（如 node-cache）来进一步提升性能。</p>
      <pre><code>const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

function getConfig(key) {
  const cached = cache.get(key);
  if (cached) {
    return cached;
  }
  
  const config = loadConfig(key);
  cache.set(key, config);
  return config;
}</code></pre>

      <h2 id="section3">3. 数据库优化</h2>
      <h3>3.1 连接池</h3>
      <p>使用连接池可以避免频繁创建和销毁数据库连接的开销。</p>
      <pre><code>const mysql = require('mysql2/promise');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb',
  connectionLimit: 10,
  waitForConnections: true
});</code></pre>

      <h3>3.2 索引优化</h3>
      <p>合理使用索引可以大幅提升查询性能。确保在经常用于 WHERE、JOIN、ORDER BY 的字段上创建索引。</p>

      <h2 id="section4">4. 集群部署</h2>
      <p>Node.js 是单线程的，可以使用 cluster 模块充分利用多核 CPU。</p>
      <pre><code>const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  require('./app');
}</code></pre>

      <h2 id="section5">5. 总结</h2>
      <p>性能优化是一个持续的过程。通过合理的缓存策略、数据库优化和集群部署，可以让你的 Node.js 应用在高并发场景下依然保持优秀的性能表现。</p>
    `,
    prevArticle: {
      id: 1,
      title: 'Vue 3 组合式 API 完全指南'
    },
    nextArticle: {
      id: 3,
      title: 'TypeScript 高级类型技巧详解'
    }
  },
  {
    id: 3,
    title: 'TypeScript 高级类型技巧详解',
    excerpt: '探索 TypeScript 中的高级类型用法，包括条件类型、映射类型、工具类型等，让类型系统为你服务...',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '王五',
    authorAvatar: 'https://i.pravatar.cc/40?img=3',
    authorBio: 'TypeScript 布道者，致力于推广类型驱动开发',
    date: '2024 年 1 月 13 日',
    views: '1,876',
    likes: '198',
    tags: ['TypeScript', '类型系统', '前端', '编程'],
    size: 'normal',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>TypeScript 的类型系统是其最强大的特性之一。除了基本的类型注解，TypeScript 还提供了丰富的高级类型工具，让我们能够编写更灵活、更安全的代码。</p>

      <h2 id="section2">2. 条件类型</h2>
      <h3 id="section2-1">2.1 基础语法</h3>
      <p>条件类型允许我们根据类型参数来决定最终的类型。</p>
      <pre><code>type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false</code></pre>

      <h3 id="section2-2">2.2 infer 关键字</h3>
      <p>infer 用于在条件类型中推断类型。</p>
      <pre><code>type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Func = () => string;
type Result = ReturnType<Func>;  // string</code></pre>

      <h2 id="section3">3. 映射类型</h2>
      <h3>3.1 基础映射</h3>
      <p>映射类型允许我们基于旧类型创建新类型。</p>
      <pre><code>type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Person {
  name: string;
  age: number;
}

type ReadonlyPerson = Readonly<Person>;
// { readonly name: string; readonly age: number; }</code></pre>

      <h3>3.2 工具类型</h3>
      <p>TypeScript 内置了许多实用的工具类型。</p>
      <pre><code>// Partial: 将所有属性变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Pick: 选择特定属性
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit: 排除特定属性
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;</code></pre>

      <h2 id="section4">4. 实战技巧</h2>
      <h3>4.1 深度 Readonly</h3>
      <pre><code>type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};</code></pre>

      <h3>4.2 函数参数类型</h3>
      <pre><code>type FirstParameter<T> = T extends (arg: infer P, ...args: any[]) => any ? P : never;</code></pre>

      <h2 id="section5">5. 总结</h2>
      <p>掌握这些高级类型技巧可以让你的 TypeScript 代码更加类型安全和灵活。类型系统不仅仅是约束，更是强大的开发工具。</p>
    `,
    prevArticle: {
      id: 2,
      title: 'Node.js 性能优化最佳实践'
    },
    nextArticle: {
      id: 4,
      title: 'Docker 容器化部署完整教程'
    }
  },
  {
    id: 4,
    title: 'Docker 容器化部署完整教程',
    excerpt: '从零开始学习 Docker 容器化部署，包括 Dockerfile 编写、镜像优化、容器编排等实用技巧...',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=1000&fit=crop',
    category: '运维',
    categoryColor: '#ff6b81',
    author: '赵六',
    authorAvatar: 'https://i.pravatar.cc/40?img=5',
    authorBio: 'DevOps 专家，精通容器化和自动化部署',
    date: '2024 年 1 月 12 日',
    views: '3,421',
    likes: '342',
    tags: ['Docker', '容器化', 'DevOps', '部署'],
    size: 'tall',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>Docker 已经成为现代应用部署的标准工具。它让应用的打包、分发和部署变得前所未有的简单。</p>
      <p>本文将带你从零开始学习 Docker，掌握容器化部署的完整流程。</p>

      <h2 id="section2">2. Docker 基础</h2>
      <h3 id="section2-1">2.1 核心概念</h3>
      <p>Docker 有三个核心概念：镜像（Image）、容器（Container）和仓库（Repository）。</p>
      <ul>
        <li><strong>镜像</strong>：一个只读模板，包含运行应用所需的代码、运行时、库等</li>
        <li><strong>容器</strong>：镜像的运行实例</li>
        <li><strong>仓库</strong>：存储镜像的地方，如 Docker Hub</li>
      </ul>

      <h3 id="section2-2">2.2 常用命令</h3>
      <pre><code># 拉取镜像
docker pull nginx:latest

# 运行容器
docker run -d -p 80:80 nginx

# 查看运行中的容器
docker ps

# 构建镜像
docker build -t myapp .</code></pre>

      <h2 id="section3">3. Dockerfile 编写</h2>
      <h3>3.1 基础示例</h3>
      <pre><code>FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]</code></pre>

      <h3>3.2 多阶段构建</h3>
      <p>多阶段构建可以显著减小镜像体积。</p>
      <pre><code># 构建阶段
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 生产阶段
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD ["node", "dist/server.js"]</code></pre>

      <h2 id="section4">4. 镜像优化</h2>
      <h3>4.1 使用 Alpine 基础镜像</h3>
      <p>Alpine 镜像只有 5MB 左右，可以大幅减小镜像体积。</p>

      <h3>4.2 优化层缓存</h3>
      <p>将经常变化的指令放在后面，充分利用 Docker 的层缓存机制。</p>

      <h2 id="section5">5. Docker Compose</h2>
      <pre><code>version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password</code></pre>

      <h2 id="section6">6. 总结</h2>
      <p>Docker 让应用部署变得简单可靠。掌握 Docker 是每个现代开发者的必备技能。</p>
    `,
    prevArticle: {
      id: 3,
      title: 'TypeScript 高级类型技巧详解'
    },
    nextArticle: {
      id: 5,
      title: 'MySQL 索引优化实战指南'
    }
  },
  {
    id: 5,
    title: 'MySQL 索引优化实战指南',
    excerpt: '深入理解 MySQL 索引原理，掌握索引优化技巧，大幅提升数据库查询性能...',
    image: 'https://images.unsplash.com/photo-1544383835-b442e569d6c7?w=800&h=500&fit=crop',
    category: '数据库',
    categoryColor: '#ff6b81',
    author: '钱七',
    authorAvatar: 'https://i.pravatar.cc/40?img=4',
    authorBio: '数据库专家，专注于高性能数据库架构设计',
    date: '2024 年 1 月 11 日',
    views: '2,789',
    likes: '287',
    tags: ['MySQL', '数据库', '索引', '性能优化'],
    size: 'normal',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>索引是数据库性能优化的核心。正确的索引策略可以让查询速度提升几个数量级，而错误的索引设计则可能导致性能灾难。</p>

      <h2 id="section2">2. 索引原理</h2>
      <h3 id="section2-1">2.1 B+ 树结构</h3>
      <p>MySQL 的 InnoDB 引擎使用 B+ 树作为索引的数据结构。B+ 树的特点是：</p>
      <ul>
        <li>所有数据都存储在叶子节点</li>
        <li>叶子节点之间有指针连接，便于范围查询</li>
        <li>树的高度较低，通常 3-4 层就能存储大量数据</li>
      </ul>

      <h3 id="section2-2">2.2 聚簇索引和二级索引</h3>
      <p>InnoDB 有两种索引类型：</p>
      <ul>
        <li><strong>聚簇索引</strong>：数据行和索引存储在一起，主键索引就是聚簇索引</li>
        <li><strong>二级索引</strong>：叶子节点存储的是主键值，需要回表查询</li>
      </ul>

      <h2 id="section3">3. 索引优化策略</h2>
      <h3>3.1 最左前缀原则</h3>
      <p>联合索引 (a, b, c) 遵循最左前缀原则，查询条件必须从最左边开始匹配。</p>
      <pre><code>-- 可以使用索引
WHERE a = 1 AND b = 2
WHERE a = 1

-- 不能使用索引
WHERE b = 2 AND c = 3</code></pre>

      <h3>3.2 覆盖索引</h3>
      <p>如果查询的列都在索引中，可以避免回表，这种查询称为覆盖索引查询。</p>
      <pre><code>-- 创建联合索引
CREATE INDEX idx_name_age ON users(name, age);

-- 覆盖索引查询（不需要回表）
SELECT name, age FROM users WHERE name = '张三';</code></pre>

      <h3>3.3 索引选择原则</h3>
      <ul>
        <li>在 WHERE、JOIN、ORDER BY、GROUP BY 的列上创建索引</li>
        <li>选择区分度高的列作为索引</li>
        <li>避免在低基数的列上创建索引（如性别）</li>
        <li>控制索引数量，每个表的索引不超过 5 个</li>
      </ul>

      <h2 id="section4">4. 索引分析工具</h2>
      <h3>4.1 EXPLAIN</h3>
      <p>使用 EXPLAIN 分析查询执行计划。</p>
      <pre><code>EXPLAIN SELECT * FROM users WHERE name = '张三';</code></pre>
      <p>重点关注 type、key、rows 等字段。</p>

      <h2 id="section5">5. 总结</h2>
      <p>索引优化是数据库性能调优的关键。理解索引原理，合理使用索引，可以让你的数据库查询性能得到质的提升。</p>
    `,
    prevArticle: {
      id: 4,
      title: 'Docker 容器化部署完整教程'
    },
    nextArticle: {
      id: 6,
      title: 'React Hooks 深度解析与实践'
    }
  },
  {
    id: 6,
    title: 'React Hooks 深度解析与实践',
    excerpt: '全面解析 React Hooks 的工作原理，包括 useState、useEffect、useContext 等常用 Hook 的实现...',
    image: 'https://images.unsplash.com/photo-1633356122155-52f8a8808c97?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '孙八',
    authorAvatar: 'https://i.pravatar.cc/40?img=6',
    authorBio: 'React 技术爱好者，擅长前端架构设计',
    date: '2024 年 1 月 10 日',
    views: '1,654',
    likes: '176',
    tags: ['React', 'Hooks', '前端', 'JavaScript'],
    size: 'normal',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>React Hooks 是 React 16.8 引入的全新特性，它让函数组件也能拥有状态和生命周期，彻底改变了 React 应用的开发方式。</p>

      <h2 id="section2">2. 常用 Hooks 详解</h2>
      <h3 id="section2-1">2.1 useState</h3>
      <p>useState 是最基础的 Hook，用于在函数组件中添加状态。</p>
      <pre><code>function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
    </div>
  );
}</code></pre>

      <h3 id="section2-2">2.2 useEffect</h3>
      <p>useEffect 用于处理副作用，可以替代 componentDidMount、componentDidUpdate 和 componentWillUnmount。</p>
      <pre><code>useEffect(() => {
  // 组件挂载和更新时执行
  console.log('组件已挂载或更新');
  
  return () => {
    // 组件卸载时执行
    console.log('组件将卸载');
  };
}, [dependency]); // 依赖数组</code></pre>

      <h3 id="section2-3">2.3 useContext</h3>
      <p>useContext 用于订阅 context 并获取当前值。</p>
      <pre><code>const theme = useContext(ThemeContext);

function ThemedButton() {
  return <button theme={theme}>按钮</button>;
}</code></pre>

      <h2 id="section3">3. 自定义 Hook</h2>
      <p>自定义 Hook 让我们可以提取组件逻辑到可重用的函数中。</p>
      <pre><code>function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
}</code></pre>

      <h2 id="section4">4. Hooks 使用规则</h2>
      <ul>
        <li>只在最顶层使用 Hook，不要在循环、条件或嵌套函数中调用</li>
        <li>只在 React 函数组件或自定义 Hook 中调用</li>
        <li>使用 ESLint 插件确保正确使用 Hook</li>
      </ul>

      <h2 id="section5">5. 总结</h2>
      <p>Hooks 让 React 组件更加简洁和灵活。掌握 Hooks 的使用，可以让你写出更优雅的 React 代码。</p>
    `,
    prevArticle: {
      id: 5,
      title: 'MySQL 索引优化实战指南'
    },
    nextArticle: {
      id: 7,
      title: '微服务架构设计模式总结'
    }
  },
  {
    id: 7,
    title: '微服务架构设计模式总结',
    excerpt: '总结微服务架构中的常见设计模式，包括服务发现、配置管理、熔断器等核心组件...',
    image: 'https://images.unsplash.com/photo-1558494949-ef2bb6db8744?w=800&h=500&fit=crop',
    category: '架构',
    categoryColor: '#ff6b81',
    author: '周九',
    authorAvatar: 'https://i.pravatar.cc/40?img=7',
    authorBio: '系统架构师，专注分布式系统设计 8 年',
    date: '2024 年 1 月 9 日',
    views: '2,345',
    likes: '234',
    tags: ['微服务', '架构设计', '分布式', '后端'],
    size: 'normal',
    content: `
      <h2 id="section1">1. 引言</h2>
      <p>微服务架构已经成为构建大型应用系统的主流选择。它将单一应用拆分为一组小型服务，每个服务运行在自己的进程中，服务间通过轻量级机制通信。</p>
      <p>本文将总结微服务架构中的常见设计模式，帮助你更好地设计和实现微服务系统。</p>

      <h2 id="section2">2. 服务拆分模式</h2>
      <h3 id="section2-1">2.1 按业务领域拆分</h3>
      <p>根据领域驱动设计（DDD）的原则，按照业务边界来拆分服务。每个服务负责一个特定的业务领域。</p>
      <ul>
        <li>用户服务：负责用户管理、认证授权</li>
        <li>订单服务：负责订单处理、支付</li>
        <li>商品服务：负责商品管理、库存</li>
      </ul>

      <h3 id="section2-2">2.2 按功能拆分</h3>
      <p>将通用功能独立为单独的服务，如消息服务、文件服务、日志服务等。</p>

      <h2 id="section3">3. 核心组件模式</h2>
      <h3 id="section3-1">3.1 服务发现</h3>
      <p>服务发现让微服务能够动态地找到其他服务。常见的实现有：</p>
      <ul>
        <li><strong>客户端发现</strong>：客户端查询服务注册中心，如 Eureka</li>
        <li><strong>服务端发现</strong>：通过负载均衡器，如 Consul + Nginx</li>
      </ul>

      <h3 id="section3-2">3.2 API 网关</h3>
      <p>API 网关作为系统的统一入口，负责请求路由、认证授权、限流熔断等。</p>
      <pre><code>常见的 API 网关：
- Kong
- Zuul
- Spring Cloud Gateway
- APISIX</code></pre>

      <h3 id="section3-3">3.3 熔断器模式</h3>
      <p>熔断器可以防止级联故障，提高系统的韧性。</p>
      <pre><code>状态：
- CLOSED（关闭）：正常状态
- OPEN（打开）：熔断状态，直接拒绝请求
- HALF_OPEN（半开）：尝试恢复状态</code></pre>

      <h3 id="section3-4">3.4 配置中心</h3>
      <p>集中管理配置，支持动态刷新。常见的有 Spring Cloud Config、Apollo、Nacos 等。</p>

      <h2 id="section4">4. 数据一致性</h2>
      <h3>4.1 Saga 模式</h3>
      <p>Saga 是一种长事务解决方案，将长事务拆分为一系列本地事务。</p>

      <h3>4.2 事件溯源</h3>
      <p>通过记录事件日志来维护状态，支持状态回溯和审计。</p>

      <h2 id="section5">5. 总结</h2>
      <p>微服务架构带来了灵活性和可扩展性，但也增加了系统的复杂性。合理运用这些设计模式，可以帮助你构建更健壮、更易维护的微服务系统。</p>
    `,
    prevArticle: {
      id: 6,
      title: 'React Hooks 深度解析与实践'
    },
    nextArticle: null
  }
];

// 根据 ID 获取文章
export function getArticleById(id) {
  return articles.find(article => article.id === parseInt(id));
}

// 获取相关文章（排除当前文章）
export function getRelatedArticles(currentId, limit = 3) {
  return articles
    .filter(article => article.id !== currentId)
    .slice(0, limit)
    .map(article => ({
      id: article.id,
      title: article.title,
      thumbnail: article.image,
      date: article.date
    }));
}

// 获取评论数据
export function getComments(articleId) {
  const commentsData = {
    1: [
      {
        id: 1,
        author: '技术达人',
        avatar: 'https://i.pravatar.cc/100?img=2',
        content: '写得非常好，对我理解 Vue 3 帮助很大！已收藏并推荐给团队成员。',
        date: '2024-01-16',
        likes: 12,
        isAuthor: false
      },
      {
        id: 2,
        author: '前端小白',
        avatar: 'https://i.pravatar.cc/100?img=3',
        content: '希望能多出一些 Vue 3 实战相关的文章，特别是关于性能优化方面的内容。',
        date: '2024-01-17',
        likes: 8,
        isAuthor: false
      },
      {
        id: 3,
        author: '张三',
        avatar: 'https://i.pravatar.cc/100?img=1',
        content: '感谢大家的支持！后续会推出更多 Vue 3 实战系列文章，敬请期待。',
        date: '2024-01-18',
        likes: 15,
        isAuthor: true
      }
    ],
    2: [
      {
        id: 1,
        author: '后端工程师',
        avatar: 'https://i.pravatar.cc/100?img=5',
        content: '缓存策略讲得很详细，已经在项目中应用了，性能提升明显！',
        date: '2024-01-15',
        likes: 20,
        isAuthor: false
      },
      {
        id: 2,
        author: '李四',
        avatar: 'https://i.pravatar.cc/100?img=2',
        content: '集群部署那部分很有帮助，解决了我们线上的性能瓶颈问题。',
        date: '2024-01-16',
        likes: 15,
        isAuthor: true
      }
    ],
    3: [
      {
        id: 1,
        author: 'TS 爱好者',
        avatar: 'https://i.pravatar.cc/100?img=6',
        content: '条件类型和 infer 的讲解很透彻，终于理解这些高级用法了！',
        date: '2024-01-14',
        likes: 18,
        isAuthor: false
      }
    ],
    4: [
      {
        id: 1,
        author: 'DevOps 新手',
        avatar: 'https://i.pravatar.cc/100?img=7',
        content: '多阶段构建太实用了！镜像体积从 1GB 降到了 200MB。',
        date: '2024-01-13',
        likes: 25,
        isAuthor: false
      },
      {
        id: 2,
        author: '赵六',
        avatar: 'https://i.pravatar.cc/100?img=5',
        content: '很高兴能帮到大家！后续会出 Kubernetes 系列教程。',
        date: '2024-01-14',
        likes: 30,
        isAuthor: true
      }
    ],
    5: [
      {
        id: 1,
        author: 'DBA 老手',
        avatar: 'https://i.pravatar.cc/100?img=8',
        content: '索引优化讲得很到位，特别是覆盖索引的概念，很多人都会忽略。',
        date: '2024-01-12',
        likes: 22,
        isAuthor: false
      }
    ],
    6: [
      {
        id: 1,
        author: 'React 粉丝',
        avatar: 'https://i.pravatar.cc/100?img=9',
        content: '自定义 Hook 的设计模式很实用，已经在项目中开始使用了！',
        date: '2024-01-11',
        likes: 16,
        isAuthor: false
      }
    ],
    7: [
      {
        id: 1,
        author: '架构师之路',
        avatar: 'https://i.pravatar.cc/100?img=10',
        content: '微服务设计模式总结得很全面，熔断器和 Saga 模式讲解得很清晰。',
        date: '2024-01-10',
        likes: 28,
        isAuthor: false
      },
      {
        id: 2,
        author: '周九',
        avatar: 'https://i.pravatar.cc/100?img=7',
        content: '感谢支持！后续会深入讲解每个模式的具体实现。',
        date: '2024-01-11',
        likes: 35,
        isAuthor: true
      }
    ]
  };
  
  return commentsData[articleId] || [];
}
