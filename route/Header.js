export default {
   props: ['menu'],
   template: `
      <nav>
         <router-link to="/" :class="{ active: menu === 'home' }" @click="$emit('active', 'home')">Home</router-link>
         <router-link to="/about" :class="{ active: menu === 'about' }" @click="$emit('active', 'about')">About</router-link>
         <router-link to="/contact" :class="{ active: menu === 'contact' }" @click="$emit('active', 'contact')">Contact</router-link>
         <router-link to="/blog" :class="{ active: menu === 'blog' }" @click="$emit('active', 'blog')">Blog</router-link>
      </nav>
   `
};
