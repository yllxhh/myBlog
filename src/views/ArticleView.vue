<template>
  <Layout>
    <div class="article-page">
      <!-- Loading Screen -->
      <div class="loading-screen" v-if="isLoading">
        <div class="loading-spinner">
          <div class="spinner-circle"></div>
          <div class="spinner-circle"></div>
          <div class="spinner-circle"></div>
        </div>
      </div>

      <div class="container" v-show="!isLoading">
        <div class="article-wrapper">
          <!-- Article Content -->
          <article class="article-main">
            <header class="article-header">
              <div class="article-category-badge">{{ article.category }}</div>
              <h1 class="article-title">{{ article.title }}</h1>
              <div class="article-meta">
                <div class="meta-left">
                  <div class="author-info">
                    <img :src="article.authorAvatar" :alt="article.author" class="author-avatar" />
                    <div class="author-details">
                      <span class="author-name">{{ article.author }}</span>
                      <span class="publish-date">{{ article.date }}</span>
                    </div>
                  </div>
                </div>
                <div class="meta-right">
                  <span class="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {{ article.views }}
                  </span>
                  <span class="meta-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    {{ article.likes }}
                  </span>
                </div>
              </div>
            </header>

            <div class="article-cover">
              <img :src="article.thumbnail" :alt="article.title" />
            </div>

            <div class="article-content" v-html="article.content"></div>

            <div class="article-tags">
              <span class="tag-label">相关标签：</span>
              <span v-for="tag in article.tags" :key="tag" class="tag-item">
                # {{ tag }}
              </span>
            </div>

            <div class="article-actions">
              <button class="action-btn like-btn" @click="toggleLike">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {{ isLiked ? '已点赞' : '点赞' }} ({{ likeCount }})
              </button>
              <button class="action-btn share-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                分享
              </button>
            </div>

            <div class="article-nav">
              <div class="nav-article prev-article" v-if="article.prevArticle">
                <span class="nav-label">上一篇</span>
                <router-link :to="`/article/${article.prevArticle.id}`">
                  <span class="nav-title">{{ article.prevArticle.title }}</span>
                </router-link>
              </div>
              <div class="nav-article next-article" v-if="article.nextArticle">
                <span class="nav-label">下一篇</span>
                <router-link :to="`/article/${article.nextArticle.id}`">
                  <span class="nav-title">{{ article.nextArticle.title }}</span>
                </router-link>
              </div>
            </div>

            <!-- Author Card -->
            <div class="author-card">
              <img :src="article.authorAvatar" :alt="article.author" class="author-card-avatar" />
              <div class="author-card-info">
                <h3 class="author-card-name">{{ article.author }}</h3>
                <p class="author-card-bio">{{ article.authorBio }}</p>
                <div class="author-card-social">
                  <a href="#" class="social-link">GitHub</a>
                  <a href="#" class="social-link">知乎</a>
                  <a href="#" class="social-link">微博</a>
                </div>
              </div>
            </div>

            <!-- Comments Section -->
            <div class="comments-section">
              <h3 class="comments-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                评论 ({{ comments.length }})
              </h3>
              
              <div class="comment-form">
                <div class="form-header">
                  <h4>发表评论</h4>
                  <p>欢迎参与讨论，分享你的看法</p>
                </div>
                <textarea 
                  v-model="newComment"
                  placeholder="写下你的评论..."
                  rows="4"
                  class="comment-input"
                ></textarea>
                <button @click="submitComment" class="submit-comment-btn">
                  发表评论
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>

              <div class="comments-list">
                <div 
                  v-for="comment in comments" 
                  :key="comment.id"
                  class="comment-item"
                >
                  <div class="comment-avatar">
                    <img :src="comment.avatar" :alt="comment.author" />
                  </div>
                  <div class="comment-content">
                    <div class="comment-header">
                      <div class="comment-author-info">
                        <span class="comment-author">{{ comment.author }}</span>
                        <span class="comment-badge" v-if="comment.isAuthor">作者</span>
                      </div>
                      <span class="comment-date">{{ comment.date }}</span>
                    </div>
                    <p class="comment-text">{{ comment.content }}</p>
                    <div class="comment-actions">
                      <button class="comment-action-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {{ comment.likes || 0 }}
                      </button>
                      <button class="comment-action-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="sidebar">
            <!-- Table of Contents -->
            <div class="widget toc-widget">
              <h4 class="widget-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
                文章目录
              </h4>
              <ul class="toc-list">
                <li><a href="#section1" class="toc-link active">1. 引言</a></li>
                <li>
                  <a href="#section2" class="toc-link">2. 核心概念</a>
                  <ul class="toc-sublist">
                    <li><a href="#section2-1" class="toc-link">2.1 setup 函数</a></li>
                    <li><a href="#section2-2" class="toc-link">2.2 reactive 和 ref</a></li>
                    <li><a href="#section2-3" class="toc-link">2.3 computed 和 watch</a></li>
                  </ul>
                </li>
                <li><a href="#section3" class="toc-link">3. 实践应用</a></li>
                <li><a href="#section4" class="toc-link">4. 总结</a></li>
              </ul>
            </div>

            <!-- Related Articles -->
            <div class="widget related-widget">
              <h4 class="widget-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                推荐阅读
              </h4>
              <div class="related-articles">
                <div 
                  v-for="post in relatedArticles" 
                  :key="post.id"
                  class="related-article-item"
                  @click="router.push(`/article/${post.id}`)"
                >
                  <img :src="post.thumbnail" :alt="post.title" />
                  <div class="post-info">
                    <h5>{{ post.title }}</h5>
                    <span class="post-date">{{ post.date }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Newsletter Widget -->
            <div class="widget newsletter-widget">
              <h4 class="widget-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                订阅更新
              </h4>
              <p class="newsletter-desc">获取最新技术文章推送</p>
              <div class="newsletter-form">
                <input type="email" placeholder="输入你的邮箱" class="newsletter-input" />
                <button class="newsletter-btn">订阅</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { getArticleById, getRelatedArticles, getComments } from '@/data/articles.js'

const route = useRoute()
const router = useRouter()
const isLoading = ref(true)
const isLiked = ref(false)
const likeCount = ref(0)
const newComment = ref('')

// 根据 ID 获取文章数据
const article = computed(() => {
  const articleData = getArticleById(route.params.id)
  if (articleData) {
    likeCount.value = parseInt(articleData.likes.replace(',', ''))
  }
  return articleData || {}
})

// 获取相关文章
const relatedArticles = computed(() => {
  return getRelatedArticles(article.value.id)
})

// 获取评论
const comments = computed(() => {
  return getComments(article.value.id)
})

const submitComment = () => {
  if (newComment.value.trim()) {
    comments.value.unshift({
      id: Date.now(),
      author: '访客',
      avatar: 'https://i.pravatar.cc/100?img=0',
      content: newComment.value,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      isAuthor: false
    })
    newComment.value = ''
  }
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
  likeCount.value += isLiked.value ? 1 : -1
}

onMounted(() => {
  window.scrollTo(0, 0)
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})
</script>

<style lang="scss" scoped>
.article-page {
  min-height: 100vh;
  background: #f8f9fa;
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

.article-wrapper {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 50px;
}

.article-main {
  background: #fff;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.article-header {
  margin-bottom: 40px;

  .article-category-badge {
    display: inline-block;
    padding: 8px 20px;
    background: linear-gradient(135deg, #ff6b81 0%, #ff8fa3 100%);
    color: #fff;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    letter-spacing: 0.5px;
  }

  .article-title {
    font-size: 42px;
    font-weight: 800;
    color: #1a1a1a;
    margin-bottom: 25px;
    line-height: 1.3;
    letter-spacing: -0.5px;
  }

  .article-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
    border-top: 2px solid #f0f0f0;
    border-bottom: 2px solid #f0f0f0;

    .meta-left {
      .author-info {
        display: flex;
        align-items: center;
        gap: 15px;

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #ff6b81;
        }

        .author-details {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .author-name {
            font-size: 16px;
            font-weight: 600;
            color: #1a1a1a;
          }

          .publish-date {
            font-size: 14px;
            color: #999;
          }
        }
      }
    }

    .meta-right {
      display: flex;
      gap: 20px;

      .meta-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #666;
        font-size: 14px;
        font-weight: 500;

        svg {
          stroke: #ff6b81;
        }
      }
    }
  }
}

.article-cover {
  margin-bottom: 50px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 450px;
    object-fit: cover;
    transition: transform 0.5s;
  }

  &:hover img {
    transform: scale(1.02);
  }
}

.article-content {
  font-size: 17px;
  line-height: 1.9;
  color: #333;

  :deep(h2) {
    font-size: 28px;
    font-weight: 700;
    margin: 50px 0 25px;
    color: #1a1a1a;
    padding-bottom: 15px;
    border-bottom: 3px solid #ff6b81;
    letter-spacing: -0.3px;
  }

  :deep(h3) {
    font-size: 22px;
    font-weight: 600;
    margin: 40px 0 20px;
    color: #2c2c2c;
  }

  :deep(p) {
    margin-bottom: 25px;
    text-align: justify;
  }

  :deep(ul) {
    margin-bottom: 25px;
    padding-left: 30px;

    li {
      margin-bottom: 12px;
      line-height: 1.8;
    }
  }

  :deep(pre) {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    padding: 25px;
    border-radius: 12px;
    overflow-x: auto;
    margin: 30px 0;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    code {
      font-family: 'Fira Code', 'Consolas', monospace;
      font-size: 14px;
      line-height: 1.7;
      color: #e2e8f0;
    }
  }

  :deep(code) {
    font-family: 'Fira Code', 'Consolas', monospace;
  }

  :deep(strong) {
    font-weight: 600;
    color: #1a1a1a;
  }
}

.article-tags {
  margin: 40px 0;
  padding: 25px 0;
  border-top: 2px solid #f0f0f0;
  border-bottom: 2px solid #f0f0f0;

  .tag-label {
    font-size: 15px;
    font-weight: 600;
    color: #666;
    margin-right: 15px;
  }

  .tag-item {
    display: inline-block;
    padding: 8px 18px;
    background: #f8f9fa;
    color: #666;
    border-radius: 20px;
    font-size: 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background: #ff6b81;
      color: #fff;
      transform: translateY(-2px);
    }
  }
}

.article-actions {
  display: flex;
  gap: 15px;
  margin: 40px 0;

  .action-btn {
    flex: 1;
    padding: 15px 30px;
    border: 2px solid #f0f0f0;
    background: #fff;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s;

    &:hover {
      border-color: #ff6b81;
      color: #ff6b81;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 107, 129, 0.2);
    }

    &.like-btn:hover,
    &.like-btn.active {
      background: #ff6b81;
      color: #fff;
      border-color: #ff6b81;
    }
  }
}

.article-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 50px 0;
  padding: 30px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 15px;

  .nav-article {
    .nav-label {
      display: block;
      font-size: 13px;
      color: #999;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .nav-title {
      font-size: 15px;
      color: #1a1a1a;
      font-weight: 600;
      line-height: 1.5;
      transition: color 0.3s;
    }

    &:hover .nav-title {
      color: #ff6b81;
    }
  }
}

.author-card {
  display: flex;
  gap: 25px;
  padding: 35px;
  background: linear-gradient(135deg, #fff5f7 0%, #fff 100%);
  border-radius: 15px;
  margin: 50px 0;
  border: 2px solid #ffe0e6;

  .author-card-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid #ff6b81;
    flex-shrink: 0;
  }

  .author-card-info {
    flex: 1;

    .author-card-name {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 10px;
    }

    .author-card-bio {
      font-size: 15px;
      color: #666;
      line-height: 1.7;
      margin-bottom: 15px;
    }

    .author-card-social {
      display: flex;
      gap: 12px;

      .social-link {
        padding: 8px 18px;
        background: #fff;
        border: 2px solid #f0f0f0;
        border-radius: 20px;
        font-size: 13px;
        color: #666;
        text-decoration: none;
        transition: all 0.3s;

        &:hover {
          border-color: #ff6b81;
          color: #ff6b81;
          transform: translateY(-2px);
        }
      }
    }
  }
}

.comments-section {
  margin-top: 60px;
  padding-top: 50px;
  border-top: 3px solid #f0f0f0;

  .comments-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 24px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 30px;

    svg {
      stroke: #ff6b81;
    }
  }

  .comment-form {
    background: #f8f9fa;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 40px;

    .form-header {
      margin-bottom: 20px;

      h4 {
        font-size: 18px;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 8px;
      }

      p {
        font-size: 14px;
        color: #666;
      }
    }

    .comment-input {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 12px;
      font-size: 15px;
      resize: vertical;
      font-family: inherit;
      margin-bottom: 15px;
      transition: border-color 0.3s;

      &:focus {
        outline: none;
        border-color: #ff6b81;
      }
    }

    .submit-comment-btn {
      padding: 12px 30px;
      background: linear-gradient(135deg, #ff6b81 0%, #ff8fa3 100%);
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 107, 129, 0.3);
      }
    }
  }

  .comments-list {
    .comment-item {
      display: flex;
      gap: 20px;
      padding: 25px;
      border-bottom: 1px solid #f0f0f0;
      transition: background 0.3s;

      &:hover {
        background: #f8f9fa;
      }

      .comment-avatar {
        flex-shrink: 0;

        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .comment-content {
        flex: 1;

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;

          .comment-author-info {
            display: flex;
            align-items: center;
            gap: 10px;

            .comment-author {
              font-size: 16px;
              font-weight: 600;
              color: #1a1a1a;
            }

            .comment-badge {
              padding: 4px 12px;
              background: #ff6b81;
              color: #fff;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
            }
          }

          .comment-date {
            font-size: 13px;
            color: #999;
          }
        }

        .comment-text {
          font-size: 15px;
          color: #333;
          line-height: 1.7;
          margin-bottom: 15px;
        }

        .comment-actions {
          display: flex;
          gap: 15px;

          .comment-action-btn {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: transparent;
            border: none;
            border-radius: 8px;
            font-size: 13px;
            color: #666;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              background: #f0f0f0;
              color: #ff6b81;
            }
          }
        }
      }
    }
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.widget {
  background: #fff;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .widget-title {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;

    svg {
      stroke: #ff6b81;
    }
  }
}

.toc-widget {
  .toc-list {
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      margin-bottom: 15px;
    }

    .toc-link {
      display: block;
      padding: 10px 15px;
      color: #666;
      text-decoration: none;
      border-radius: 8px;
      font-size: 15px;
      transition: all 0.3s;

      &:hover,
      &.active {
        background: #fff5f7;
        color: #ff6b81;
      }
    }

    .toc-sublist {
      list-style: none;
      padding: 0;
      margin-top: 10px;
      padding-left: 15px;

      li {
        margin-bottom: 8px;
      }

      .toc-link {
        font-size: 14px;
        padding: 8px 12px;
      }
    }
  }
}

.related-widget {
  .related-articles {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .related-article-item {
    display: flex;
    gap: 15px;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #f8f9fa;
      transform: translateX(5px);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 10px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .post-info {
      flex: 1;

      h5 {
        font-size: 15px;
        font-weight: 600;
        color: #1a1a1a;
        margin-bottom: 8px;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .post-date {
        font-size: 13px;
        color: #999;
      }
    }
  }
}

.newsletter-widget {
  background: linear-gradient(135deg, #ff6b81 0%, #ff8fa3 100%);
  color: #fff;

  .widget-title {
    color: #fff;
    border-bottom-color: rgba(255, 255, 255, 0.3);

    svg {
      stroke: #fff;
    }
  }

  .newsletter-desc {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 20px;
  }

  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .newsletter-input {
      padding: 12px 18px;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      background: rgba(255, 255, 255, 0.95);
      color: #1a1a1a;

      &::placeholder {
        color: #999;
      }
    }

    .newsletter-btn {
      padding: 12px 20px;
      background: #fff;
      color: #ff6b81;
      border: none;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

@media (max-width: 1200px) {
  .article-wrapper {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: sticky;
    top: 20px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 40px 20px;
  }

  .article-main {
    padding: 30px 20px;
  }

  .article-header {
    .article-title {
      font-size: 28px;
    }

    .article-meta {
      flex-direction: column;
      gap: 15px;
    }
  }

  .article-cover {
    img {
      height: 250px;
    }
  }

  .article-nav {
    grid-template-columns: 1fr;
  }

  .author-card {
    flex-direction: column;
    text-align: center;

    .author-card-social {
      justify-content: center;
    }
  }
}
</style>
