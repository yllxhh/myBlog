<template>
  <footer class="footer">
    <div class="container">
      <div class="newsletter-section">
        <h3 class="newsletter-title">Subscribe to our Newsletter</h3>
        <p class="newsletter-desc">Sign up for free and be the first to get notified about new posts.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Your email address" v-model="email" />
          <button @click="subscribe">Subscribe</button>
        </div>
        <div class="social-links">
          <a href="#" class="social-link">
            <span class="icon">f</span>
            <span>Facebook</span>
          </a>
          <a href="#" class="social-link">
            <span class="icon">t</span>
            <span>Twitter</span>
          </a>
          <a href="#" class="social-link">
            <span class="icon">in</span>
            <span>Instagram</span>
          </a>
          <a href="#" class="social-link">
            <span class="icon">yt</span>
            <span>Youtube</span>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; Copyright 2024 NoonPost. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const subscribe = () => {
  if (email.value) {
    alert('Thank you for subscribing!')
    email.value = ''
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: #1a253a;
  color: #fff;
  padding: 80px 0 30px;
  margin-top: 80px;

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .newsletter-section {
    text-align: center;
    margin-bottom: 60px;

    .newsletter-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 15px;
      color: #fff;
    }

    .newsletter-desc {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 30px;
    }

    .newsletter-form {
      display: flex;
      max-width: 500px;
      margin: 0 auto 40px;
      gap: 0;

      input {
        flex: 1;
        padding: 15px 25px;
        border: none;
        border-radius: 30px 0 0 30px;
        font-size: 15px;
        outline: none;
        background: #fff;
        color: #333;
      }

      button {
        padding: 15px 35px;
        background: #ff6b81;
        color: #fff;
        border: none;
        border-radius: 0 30px 30px 0;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background: #ff5266;
        }
      }
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;

      .social-link {
        display: flex;
        align-items: center;
        gap: 10px;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-size: 14px;
        transition: all 0.3s;

        &:hover {
          color: #ff6b81;
        }

        .icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          font-size: 14px;
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 30px;
    text-align: center;

    p {
      margin: 0;
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .footer {
    .container {
      padding: 0 20px;
    }

    .newsletter-section {
      .newsletter-form {
        flex-direction: column;
        gap: 15px;

        input,
        button {
          border-radius: 30px;
        }
      }

      .social-links {
        gap: 20px;
      }
    }
  }
}
</style>
