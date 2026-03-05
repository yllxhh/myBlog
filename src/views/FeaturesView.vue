<template>
  <Layout>
    <div class="features-page">
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
          <h1 class="page-title">精选文章</h1>
          <p class="page-subtitle">我们精心挑选的高质量技术内容</p>
        </div>

        <div class="articles-grid">
          <article 
            v-for="article in featuredArticles" 
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'

const router = useRouter()
const isLoading = ref(true)

const featuredArticles = ref([
  {
    id: 101,
    title: '深入理解 JavaScript 闭包与作用域链',
    excerpt: '全面解析 JavaScript 中最重要也最难理解的概念之一，通过实际案例掌握闭包的精髓...',
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=500&fit=crop',
    category: '前端',
    categoryColor: '#ff6b81',
    author: '前端大神',
    authorAvatar: 'https://i.pravatar.cc/40?img=11',
    date: '2024 年 1 月 20 日',
    size: 'tall'
  },
  {
    id: 102,
    title: '高并发系统设计之道',
    excerpt: '从 0 到 1 构建高并发系统，分享负载均衡、缓存策略、消息队列等核心架构设计经验...',
    image: 'https://images.unsplash.com/photo-1558494949-ef2bb6db8744?w=800&h=500&fit=crop',
    category: '架构',
    categoryColor: '#ff6b81',
    author: '架构师李明',
    authorAvatar: 'https://i.pravatar.cc/40?img=12',
    date: '2024 年 1 月 19 日',
    size: 'normal'
  },
  {
    id: 103,
    title: 'Python 数据分析从入门到精通',
    excerpt: '使用 Pandas、NumPy、Matplotlib 等工具进行数据分析的完整指南，包含大量实战案例...',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop',
    category: '数据科学',
    categoryColor: '#ff6b81',
    author: '数据专家',
    authorAvatar: 'https://i.pravatar.cc/40?img=13',
    date: '2024 年 1 月 18 日',
    size: 'normal'
  },
  {
    id: 104,
    title: '云原生时代的技术栈选型',
    excerpt: '深入探讨云原生架构下的技术选型策略，包括容器、服务网格、无服务器等前沿技术...',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=500&fit=crop',
    category: '云计算',
    categoryColor: '#ff6b81',
    author: '云架构师',
    authorAvatar: 'https://i.pravatar.cc/40?img=14',
    date: '2024 年 1 月 17 日',
    size: 'normal'
  },
  {
    id: 105,
    title: '移动端性能优化实战手册',
    excerpt: '从加载速度、渲染性能、内存管理等多个维度，全面提升移动应用的用户体验...',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    category: '移动端',
    categoryColor: '#ff6b81',
    author: '移动开发专家',
    authorAvatar: 'https://i.pravatar.cc/40?img=15',
    date: '2024 年 1 月 16 日',
    size: 'normal'
  },
  {
    id: 106,
    title: 'AI 辅助编程的未来已来',
    excerpt: '探索 GitHub Copilot、Cursor 等 AI 编程工具如何改变我们的开发方式，提升编码效率...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    category: '人工智能',
    categoryColor: '#ff6b81',
    author: 'AI 研究员',
    authorAvatar: 'https://i.pravatar.cc/40?img=16',
    date: '2024 年 1 月 15 日',
    size: 'normal'
  },
  {
    id: 107,
    title: '网络安全防护体系建设',
    excerpt: '构建全方位的安全防护体系，从身份认证、数据加密到漏洞扫描的完整实践指南...',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop',
    category: '安全',
    categoryColor: '#ff6b81',
    author: '安全专家',
    authorAvatar: 'https://i.pravatar.cc/40?img=17',
    date: '2024 年 1 月 14 日',
    size: 'normal'
  }
])

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
.features-page {
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
