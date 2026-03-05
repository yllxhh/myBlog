<template>
  <Layout>
    <div class="category-page">
      <div class="container">
        <div class="category-header">
          <h1 class="category-title">{{ categoryName }}</h1>
          <p class="category-description">探索 {{ categoryName }} 相关的技术文章和教程</p>
        </div>

        <div class="content-wrapper">
          <div class="article-list">
            <div class="articles">
              <article 
                v-for="article in articles" 
                :key="article.id"
                class="article-card"
                @click="goToArticle(article.id)"
              >
                <div class="article-thumbnail">
                  <img :src="article.thumbnail" :alt="article.title" />
                  <span class="article-category" :class="article.categoryClass">
                    {{ article.category }}
                  </span>
                </div>
                <div class="article-content">
                  <h3 class="article-title">{{ article.title }}</h3>
                  <p class="article-excerpt">{{ article.excerpt }}</p>
                  <div class="article-meta">
                    <span class="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {{ article.date }}
                    </span>
                    <span class="meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {{ article.views }} 阅读
                    </span>
                  </div>
                </div>
              </article>
            </div>

            <div class="pagination">
              <button class="page-btn">上一页</button>
              <button class="page-btn active">1</button>
              <button class="page-btn">2</button>
              <button class="page-btn">3</button>
              <button class="page-btn">下一页</button>
            </div>
          </div>

          <aside class="sidebar">
            <div class="widget">
              <h4 class="widget-title">所有分类</h4>
              <ul class="category-list">
                <li 
                  v-for="(cat, index) in allCategories" 
                  :key="index"
                  :class="{ active: cat.name === categoryName }"
                  @click="goToCategory(cat.name)"
                >
                  <span>{{ cat.name }}</span>
                  <span class="count">{{ cat.count }}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'

const route = useRoute()
const router = useRouter()

const categoryName = computed(() => route.params.name)

const articles = ref([
  {
    id: 1,
    title: 'Vue 3 组合式 API 完全指南',
    excerpt: '深入理解 Vue 3 的组合式 API，掌握 setup、ref、reactive 等核心概念，提升代码组织能力...',
    thumbnail: 'https://via.placeholder.com/400x250/1890ff/ffffff?text=Vue3',
    category: '前端',
    categoryClass: 'frontend',
    date: '2024-01-15',
    views: '1,234'
  },
  {
    id: 3,
    title: 'TypeScript 高级类型技巧',
    excerpt: '探索 TypeScript 中的高级类型用法，包括条件类型、映射类型、工具类型等...',
    thumbnail: 'https://via.placeholder.com/400x250/1890ff/ffffff?text=TypeScript',
    category: '前端',
    categoryClass: 'frontend',
    date: '2024-01-10',
    views: '2,156'
  },
  {
    id: 6,
    title: 'React Hooks 深度解析',
    excerpt: '全面解析 React Hooks 的工作原理，包括 useState、useEffect 等常用 Hook...',
    thumbnail: 'https://via.placeholder.com/400x250/1890ff/ffffff?text=React',
    category: '前端',
    categoryClass: 'frontend',
    date: '2024-01-03',
    views: '1,876'
  }
])

const allCategories = ref([
  { name: '前端开发', count: 25 },
  { name: '后端技术', count: 18 },
  { name: '技术随笔', count: 12 },
  { name: '架构设计', count: 8 },
  { name: '工具教程', count: 15 }
])

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

const goToCategory = (name) => {
  router.push(`/category/${name}`)
}
</script>

<style lang="scss" scoped>
.category-page {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .category-header {
    text-align: center;
    padding: 60px 0 40px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin-bottom: 40px;
    border-radius: 12px;
    color: #fff;

    .category-title {
      font-size: 48px;
      margin-bottom: 15px;
    }

    .category-description {
      font-size: 18px;
      opacity: 0.9;
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 40px;
  }

  .article-list {
    .articles {
      display: grid;
      gap: 30px;
    }

    .article-card {
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 25px;
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      }

      .article-thumbnail {
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        &:hover img {
          transform: scale(1.1);
        }

        .article-category {
          position: absolute;
          top: 15px;
          left: 15px;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 12px;
          color: #fff;
          font-weight: 500;

          &.frontend {
            background: rgba(24, 144, 255, 0.9);
          }

          &.backend {
            background: rgba(82, 196, 26, 0.9);
          }

          &.other {
            background: rgba(114, 46, 209, 0.9);
          }
        }
      }

      .article-content {
        padding: 25px;

        .article-title {
          font-size: 22px;
          color: #333;
          margin-bottom: 15px;
          line-height: 1.4;
        }

        .article-excerpt {
          color: #666;
          line-height: 1.8;
          margin-bottom: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .article-meta {
          display: flex;
          gap: 20px;

          .meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
            color: #999;
            font-size: 14px;

            svg {
              stroke: #999;
            }
          }
        }
      }
    }

    .pagination {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-top: 40px;

      .page-btn {
        padding: 10px 20px;
        border: 1px solid #e8e8e8;
        background: #fff;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s;

        &:hover,
        &.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-color: transparent;
        }
      }
    }
  }

  .sidebar {
    .widget {
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
      position: sticky;
      top: 20px;

      .widget-title {
        font-size: 18px;
        color: #333;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #f0f0f0;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      }
    }

    .category-list {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #f5f5f5;
        cursor: pointer;
        transition: all 0.3s;

        &:last-child {
          border-bottom: none;
        }

        &:hover,
        &.active {
          color: #667eea;
          padding-left: 10px;
        }

        .count {
          background: #f5f5f5;
          padding: 2px 10px;
          border-radius: 10px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}

@media (max-width: 968px) {
  .category-page {
    .content-wrapper {
      grid-template-columns: 1fr;
    }

    .article-card {
      grid-template-columns: 1fr;
    }
  }
}
</style>
