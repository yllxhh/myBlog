<template>
  <Layout>
    <div class="home-page">
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
        <div class="articles-grid">
          <article 
            v-for="article in articles" 
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
          <button class="page-btn">></button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { articles } from '@/data/articles.js'

const router = useRouter()
const isLoading = ref(true)

const goToArticle = (id) => {
  router.push(`/article/${id}`)
}

// 模拟加载效果
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<style lang="scss" scoped>
.home-page {
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
