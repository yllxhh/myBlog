<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <h1>技术博客</h1>
          </router-link>
        </div>
        
        <nav class="main-nav">
          <ul class="nav-list">
            <li>
              <router-link to="/" class="nav-link">首页</router-link>
            </li>
            <li>
              <router-link to="/blog" class="nav-link">博客</router-link>
            </li>
            <li>
              <router-link to="/features" class="nav-link">精选</router-link>
            </li>
            <li>
              <router-link to="/about" class="nav-link">关于</router-link>
            </li>
            <li>
              <router-link to="/contact" class="nav-link">联系</router-link>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <div class="social-icons">
            <a href="#" class="social-link" title="facebook">
              <img src="@/assets/images/facebook.svg" alt="SVG 图标" width="20" height="20" />
            </a>
            <a href="#" class="social-link" title="photo">
              <img src="@/assets/images/photo.svg" alt="SVG 图标" width="20" height="20" />
            </a>
            <a href="#" class="social-link" title="微博">
              
              <img src="@/assets/images/twitter.svg" alt="SVG 图标" width="20" height="20" />
            </a>
            <a href="#" class="social-link" title="微信">
              
              <img src="@/assets/images/youtube.svg" alt="SVG 图标" width="20" height="20" />
            </a>
          </div>
          <button class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 15px 0;

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 40px;
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      color: #1a1a1a;
      
      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .main-nav {
    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      gap: 35px;

      li {
        .nav-link {
          text-decoration: none;
          color: #1a1a1a;
          font-size: 16px;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;

          &:hover,
          &.router-link-active {
            color: #ff6b81;
          }
        }
      }
    }
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .social-icons {
    display: flex;
    .social-link {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      font-size: 12px;
      text-decoration: none;
      transition: all 0.3s;
      border-radius: 50%;

      &:hover {
        color: #ff6b81;
        background: rgba(255, 107, 129, 0.1);
      }
    }
  }

  .search-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ff6b81;
    border: none;
    color: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;

    &:hover {
      background: #ff5266;
      transform: scale(1.05);
    }

    svg {
      stroke-width: 2.5;
    }
  }
}

@media (max-width: 1200px) {
  .header {
    .container {
      padding: 0 20px;
    }

    .main-nav {
      .nav-list {
        gap: 20px;
      }
    }
  }
}

@media (max-width: 992px) {
  .header {
    .main-nav {
      display: none;
    }
  }
}
</style>
