<template>
  <Layout>
    <div class="blog-page">
      <!-- Loading Screen -->
      <div class="loading-screen" v-if="isLoading">
        <div class="loading-spinner">
          <div class="spinner-circle"></div>
          <div class="spinner-circle"></div>
          <div class="spinner-circle"></div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="container" v-show="!isLoading">
        <!-- Page Header -->
        <div class="page-header">
          <h1 class="page-title">博客文章</h1>
          <p class="page-subtitle">探索我们的最新技术文章和见解</p>
        </div>

        <!-- Category Filter -->
        <div class="category-filter">
          <button 
            v-for="cat in categories" 
            :key="cat"
            :class="['filter-btn', { active: currentCategory === cat }]"
            @click="currentCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <div class="articles-grid">
          <article 
            v-for="article in filteredArticles" 
            :key="article.id"
            class="article-card"
            :class="article.size"
            @click="goToArticle(article.id)"
          >
            <div class="article-image">
              <img :src="article.image" :alt="article.title" />
              <span class="category-tag" :style="{ background: article.categoryColor }">
                {{ article.category }}
              </span>
            </div>
            <div class="article-content">
              <h3 class="article-title">{{ article.title }}</h3>
              <p class="article-excerpt">{{ article.excerpt }}</p>
              <div class="article-meta">
                <div class="author-info">
                  <img :src="article.authorAvatar" :alt="article.author" class="author-avatar" />
                  <span class="author-name">{{ article.author }}</span>
                </div>
                <span class="date">{{ article.date }}</span>
              </div>
            </div>
          </article>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn">4</button>
          <button class="page-btn">›</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'

const router = useRouter()
const isLoading = ref(true)
const currentCategory = ref('全部')

const categories = ['全部', '前端', '后端', '运维', '数据库', '架构']

const allArticles = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 完全指南',
    excerpt: '深入理解 Vue 3 的组合式 API，掌握 setup、ref、reactive 等核心概念，提升代码组织能力...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '张三',
    authorAvatar: 'https://i.pravatar.cc/40?img=1',
    date: '2024 年 1 月 15 日',
    size: 'normal'
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
    date: '2024 年 1 月 14 日',
    size: 'normal'
  },
  {
    id: 3,
    title: 'TypeScript 高级类型技巧详解',
    excerpt: '探索 TypeScript 中的高级类型用法，包括条件类型、映射类型、工具类型等...',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '王五',
    authorAvatar: 'https://i.pravatar.cc/40?img=3',
    date: '2024 年 1 月 13 日',
    size: 'normal'
  },
  {
    id: 4,
    title: 'Docker 容器化部署完整教程',
    excerpt: '从零开始学习 Docker 容器化部署，包括 Dockerfile 编写、镜像优化、容器编排等...',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=1000&fit=crop',
    category: '运维',
    categoryColor: '#ff6b81',
    author: '赵六',
    authorAvatar: 'https://i.pravatar.cc/40?img=5',
    date: '2024 年 1 月 12 日',
    size: 'tall'
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
    date: '2024 年 1 月 11 日',
    size: 'normal'
  },
  {
    id: 6,
    title: 'React Hooks 深度解析与实践',
    excerpt: '全面解析 React Hooks 的工作原理，包括 useState、useEffect 等常用 Hook 的实现...',
    image: 'https://images.unsplash.com/photo-1633356122155-52f8a8808c97?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '孙八',
    authorAvatar: 'https://i.pravatar.cc/40?img=6',
    date: '2024 年 1 月 10 日',
    size: 'normal'
  },
  {
    id: 7,
    title: '微服务架构设计模式总结',
    excerpt: '总结微服务架构中的常见设计模式，包括服务发现、配置管理、熔断器等...',
    image: 'https://images.unsplash.com/photo-1558494949-ef2bb6db8744?w=800&h=500&fit=crop',
    category: '架构',
    categoryColor: '#ff6b81',
    author: '周九',
    authorAvatar: 'https://i.pravatar.cc/40?img=7',
    date: '2024 年 1 月 9 日',
    size: 'normal'
  },
  {
    id: 8,
    title: '2024 年十大技术趋势展望',
    excerpt: '探索将塑造未来的最重要技术趋势，包括 AI、云计算、边缘计算等...',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop',
    category: '架构',
    categoryColor: '#ff6b81',
    author: '吴十',
    authorAvatar: 'https://i.pravatar.cc/40?img=8',
    date: '2024 年 1 月 8 日',
    size: 'normal'
  },
  {
    id: 9,
    title: 'Kubernetes 集群管理最佳实践',
    excerpt: '学习如何高效管理 K8s 集群，包括资源调度、监控、日志收集等...',
    image: 'https://images.unsplash.com/photo-1555993539-1732b327549b?w=800&h=500&fit=crop',
    category: '运维',
    categoryColor: '#ff6b81',
    author: '郑十一',
    authorAvatar: 'https://i.pravatar.cc/40?img=9',
    date: '2024 年 1 月 7 日',
    size: 'normal'
  }
])

const filteredArticles = computed(() => {
  if (currentCategory.value === '全部') {
    return allArticles.value
  }
  return allArticles.value.filter(article => article.category === currentCategory.value)
})

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<style lang="scss" scoped>
.blog-page {
  min-height: 100vh;
}

.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  .loading-spinner {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .spinner-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #ff6b81;
    animation: bounce 1.4s infinite ease-in-out both;

    &:nth-child(1) {
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;

  .page-title {
    font-size: 48px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 15px;
  }

  .page-subtitle {
    font-size: 18px;
    color: #666;
  }
}

.category-filter {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;

  .filter-btn {
    padding: 12px 28px;
    border: 2px solid #f0f0f0;
    background: #fff;
    border-radius: 30px;
    font-size: 15px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;

    &:hover {
      border-color: #ff6b81;
      color: #ff6b81;
    }

    &.active {
      background: #ff6b81;
      border-color: #ff6b81;
      color: #fff;
    }
  }
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.article-card {
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  &.tall {
    .article-image {
      height: 500px;
    }
  }

  &.normal {
    .article-image {
      height: 280px;
    }
  }
}

.article-image {
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &:hover img {
    transform: scale(1.1);
  }

  .category-tag {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 8px 18px;
    border-radius: 30px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}

.article-content {
  padding: 30px;
}

.article-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 15px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-excerpt {
  font-size: 15px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;

  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .author-name {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
}

.date {
  font-size: 14px;
  color: #999;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;

  .page-btn {
    width: 45px;
    height: 45px;
    border: 2px solid #f0f0f0;
    background: #fff;
    border-radius: 50%;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &.active {
      border-color: #ff6b81;
      background: #ff6b81;
      color: #fff;
    }
  }
}

@media (max-width: 1200px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 40px 20px;
  }

  .page-header {
    .page-title {
      font-size: 36px;
    }
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .article-card {
    &.tall {
      .article-image {
        height: 400px;
      }
    }
  }
}
</style>
