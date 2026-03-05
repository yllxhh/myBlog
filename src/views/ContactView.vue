<template>
  <Layout>
    <div class="contact-page">
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
          <h1 class="page-title">联系我们</h1>
          <p class="page-subtitle">有任何问题或建议？欢迎随时联系我们</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-info">
            <h2 class="info-title">联系方式</h2>
            <p class="info-description">
              如果您有任何问题、建议或合作意向，请通过以下方式联系我们，我们会在 24 小时内回复。
            </p>

            <div class="contact-items">
              <div class="contact-item">
                <div class="item-icon">📍</div>
                <div class="item-content">
                  <h3 class="item-label">地址</h3>
                  <p class="item-text">北京市海淀区中关村科技园</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="item-icon">📧</div>
                <div class="item-content">
                  <h3 class="item-label">邮箱</h3>
                  <p class="item-text">contact@techblog.com</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="item-icon">📱</div>
                <div class="item-content">
                  <h3 class="item-label">电话</h3>
                  <p class="item-text">400-888-8888</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="item-icon">💬</div>
                <div class="item-content">
                  <h3 class="item-label">微信</h3>
                  <p class="item-text">TechBlog2024</p>
                </div>
              </div>
            </div>

            <div class="social-section">
              <h3 class="social-title">关注我们</h3>
              <div class="social-links">
                <a href="#" class="social-btn">GitHub</a>
                <a href="#" class="social-btn">知乎</a>
                <a href="#" class="social-btn">微博</a>
                <a href="#" class="social-btn">B 站</a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-wrapper">
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label class="form-label">您的姓名</label>
                <input 
                  type="text" 
                  v-model="formData.name" 
                  class="form-input"
                  placeholder="请输入您的姓名"
                  required 
                />
              </div>

              <div class="form-group">
                <label class="form-label">电子邮箱</label>
                <input 
                  type="email" 
                  v-model="formData.email" 
                  class="form-input"
                  placeholder="请输入您的邮箱"
                  required 
                />
              </div>

              <div class="form-group">
                <label class="form-label">主题</label>
                <select v-model="formData.subject" class="form-input" required>
                  <option value="">请选择主题</option>
                  <option value="合作">合作咨询</option>
                  <option value="投稿">投稿事宜</option>
                  <option value="反馈">问题反馈</option>
                  <option value="其他">其他</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">消息内容</label>
                <textarea 
                  v-model="formData.message" 
                  class="form-textarea"
                  placeholder="请输入您的消息内容..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn">
                发送消息
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </button>
            </form>
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

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  alert('感谢您的留言！我们会尽快回复您。')
  formData.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<style lang="scss" scoped>
.contact-page {
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 60px;
}

.contact-info {
  background: #f8f9fa;
  padding: 50px 40px;
  border-radius: 20px;

  .info-title {
    font-size: 28px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 20px;
  }

  .info-description {
    font-size: 15px;
    color: #666;
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .contact-items {
    margin-bottom: 40px;
  }

  .contact-item {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;

    .item-icon {
      font-size: 32px;
      flex-shrink: 0;
    }

    .item-content {
      .item-label {
        font-size: 14px;
        color: #999;
        margin-bottom: 8px;
      }

      .item-text {
        font-size: 16px;
        color: #1a1a1a;
        margin: 0;
      }
    }
  }

  .social-section {
    .social-title {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 20px;
    }

    .social-links {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;

      .social-btn {
        padding: 10px 24px;
        background: #fff;
        border: 2px solid #e0e0e0;
        border-radius: 25px;
        font-size: 14px;
        color: #666;
        text-decoration: none;
        transition: all 0.3s;

        &:hover {
          border-color: #ff6b81;
          color: #ff6b81;
        }
      }
    }
  }
}

.contact-form-wrapper {
  .contact-form {
    background: #fff;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .form-group {
    margin-bottom: 25px;

    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 10px;
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: 15px 20px;
      border: 2px solid #f0f0f0;
      border-radius: 12px;
      font-size: 15px;
      color: #1a1a1a;
      transition: all 0.3s;
      font-family: inherit;

      &:focus {
        outline: none;
        border-color: #ff6b81;
      }

      &::placeholder {
        color: #999;
      }
    }

    .form-textarea {
      resize: vertical;
      min-height: 150px;
    }
  }

  .submit-btn {
    width: 100%;
    padding: 16px 30px;
    background: #ff6b81;
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: all 0.3s;

    &:hover {
      background: #ff5266;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(255, 107, 129, 0.3);
    }

    svg {
      stroke-width: 2.5;
    }
  }
}

@media (max-width: 1200px) {
  .contact-grid {
    grid-template-columns: 1fr;
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

  .contact-info {
    padding: 30px 25px;
  }

  .contact-form-wrapper {
    .contact-form {
      padding: 25px;
    }
  }
}
</style>
