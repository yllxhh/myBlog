<template>
  <Layout>
    <div class="about-page">
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
          <h1 class="page-title">关于我们</h1>
          <p class="page-subtitle">致力于分享高质量的技术内容</p>
        </div>

        <!-- About Section -->
        <div class="about-section">
          <div class="about-grid">
            <div class="about-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" alt="我们的团队" />
            </div>
            
            <div class="about-text">
              <h2 class="section-title">我们的故事</h2>
              <p class="about-description">
                技术博客成立于 2024 年，是一个专注于分享前沿技术知识的平台。我们的使命是让技术学习变得更加简单高效。
              </p>
              <p class="about-description">
                汇聚了来自一线互联网公司的资深工程师和技术专家，我们分享实战经验、最佳实践和深度技术解析，帮助开发者快速成长。
              </p>
              
              <div class="stats-grid">
                <div class="stat-item">
                  <div class="stat-number">500+</div>
                  <div class="stat-label">技术文章</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">100K+</div>
                  <div class="stat-label">月度读者</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">50+</div>
                  <div class="stat-label">技术专家</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <div class="team-section">
          <h2 class="section-title text-center">我们的团队</h2>
          <p class="section-subtitle text-center">遇见背后的技术专家团队</p>
          
          <div class="team-grid">
            <div class="team-member" v-for="member in teamMembers" :key="member.id">
              <div class="member-avatar">
                <img :src="member.avatar" :alt="member.name" />
              </div>
              <h3 class="member-name">{{ member.name }}</h3>
              <p class="member-role">{{ member.role }}</p>
              <p class="member-bio">{{ member.bio }}</p>
              <div class="member-social">
                <a :href="member.social.github" class="social-link">GitHub</a>
                <a :href="member.social.zhihu" class="social-link">知乎</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="values-section">
          <h2 class="section-title text-center">我们的价值观</h2>
          <div class="values-grid">
            <div class="value-card" v-for="value in values" :key="value.id">
              <div class="value-icon">{{ value.icon }}</div>
              <h3 class="value-title">{{ value.title }}</h3>
              <p class="value-description">{{ value.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Layout from '@/components/Layout.vue'

const isLoading = ref(true)

const teamMembers = ref([
  {
    id: 1,
    name: '张三',
    role: '创始人 & 主编',
    bio: '前阿里资深技术专家，专注前端架构和工程化领域 10 年',
    avatar: 'https://i.pravatar.cc/150?img=1',
    social: {
      github: '#',
      zhihu: '#'
    }
  },
  {
    id: 2,
    name: '李四',
    role: '后端技术负责人',
    bio: '资深后端架构师，擅长高并发系统设计和微服务架构',
    avatar: 'https://i.pravatar.cc/150?img=2',
    social: {
      github: '#',
      zhihu: '#'
    }
  },
  {
    id: 3,
    name: '王五',
    role: '全栈工程师',
    bio: '热爱开源的全栈开发者，多个知名开源项目贡献者',
    avatar: 'https://i.pravatar.cc/150?img=3',
    social: {
      github: '#',
      zhihu: '#'
    }
  },
  {
    id: 4,
    name: '赵六',
    role: '运维专家',
    bio: '云原生技术布道者，Kubernetes 和 DevOps 实践专家',
    avatar: 'https://i.pravatar.cc/150?img=4',
    social: {
      github: '#',
      zhihu: '#'
    }
  }
])

const values = ref([
  {
    id: 1,
    icon: '📚',
    title: '深度内容',
    description: '坚持原创深度内容，每篇文章都经过严格审核，确保技术准确性和实用性'
  },
  {
    id: 2,
    icon: '🎯',
    title: '实战导向',
    description: '注重实战经验，提供可落地的解决方案，帮助读者真正掌握技术'
  },
  {
    id: 3,
    icon: '🚀',
    title: '持续创新',
    description: '紧跟技术前沿，及时分享最新技术趋势和最佳实践'
  },
  {
    id: 4,
    icon: '🤝',
    title: '开放共享',
    description: '倡导技术分享精神，构建学习社区，共同成长'
  }
])

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<style lang="scss" scoped>
.about-page {
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
  margin-bottom: 60px;

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

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 30px;

  &.text-center {
    text-align: center;
  }
}

.section-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 50px;

  &.text-center {
    text-align: center;
  }
}

.about-section {
  margin-bottom: 100px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.about-image {
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  }
}

.about-text {
  .about-description {
    font-size: 16px;
    color: #666;
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 40px;
  }

  .stat-item {
    text-align: center;
    padding: 30px;
    background: #f8f9fa;
    border-radius: 15px;

    .stat-number {
      font-size: 42px;
      font-weight: 700;
      color: #ff6b81;
      margin-bottom: 10px;
    }

    .stat-label {
      font-size: 14px;
      color: #666;
    }
  }
}

.team-section {
  margin-bottom: 100px;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.team-member {
  text-align: center;
  padding: 40px 30px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .member-avatar {
    width: 120px;
    height: 120px;
    margin: 0 auto 25px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .member-name {
    font-size: 22px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .member-role {
    font-size: 14px;
    color: #ff6b81;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .member-bio {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .member-social {
    display: flex;
    justify-content: center;
    gap: 15px;

    .social-link {
      font-size: 13px;
      color: #666;
      text-decoration: none;
      padding: 6px 15px;
      border: 2px solid #f0f0f0;
      border-radius: 20px;
      transition: all 0.3s;

      &:hover {
        border-color: #ff6b81;
        color: #ff6b81;
      }
    }
  }
}

.values-section {
  .values-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .value-card {
    text-align: center;
    padding: 40px 30px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .value-icon {
      font-size: 56px;
      margin-bottom: 20px;
    }

    .value-title {
      font-size: 20px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 15px;
    }

    .value-description {
      font-size: 14px;
      color: #666;
      line-height: 1.7;
    }
  }
}

@media (max-width: 1200px) {
  .team-grid,
  .values-grid {
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

  .about-grid {
    grid-template-columns: 1fr;
  }

  .team-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
