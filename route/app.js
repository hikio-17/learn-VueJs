/** Create component Header */
const Header = {
   props: ['menu'],
   template: `
      <nav>
         <router-link 
            to="/" :class="{ active: menu === 'home' }" 
            @click="$emit('active', 'home')"> Home
         </router-link>
         <router-link 
            to="/about" 
            :class="{ active: menu === 'about' }" 
            @click="$emit('active', 'about')"> About
         </router-link>
         <router-link 
            to="/contact" 
            :class="{ active: menu === 'contact' }" 
            @click="$emit('active', 'contact')"> Contact
         </router-link>
         <router-link 
            to="/blog" 
            :class="{ active: menu === 'blog' }" 
            @click="$emit('active', 'blog')"> Blog
         </router-link>
      </nav>
   `
};

/** Create page Home component */
const Home = {
   props: ['todos'],
   template: `
      <div class="container-todo">
         <div class="left">
            <input 
               type="text" 
               placeholder="Create your todo..." 
               @keyup.enter="$emit('submit', $event)" 
            >
         </div>
         <div class="right">
            <h4 v-if="todos.length">Your todo list today ({{todos.length}})</h4>
            <template v-if="todos.length">
               <ol>
                  <li v-for="(item, index) of todos">
                     {{item.id}}.{{item.todo}} <a href="#" @click.prevent="$emit('remove', item.id)">Remove</a>
                  </li>
               </ol>
            </template>
            <h4 v-else>Don't your todo list</h4>
         </div>
      </div>
   `
};

/** Create component Page About, Contact, Blog */
const About = { template: '<h2>Halaman About</h2>' };
const Contact = { template: '<h2>Halaman Contact</h2>' };
const Blog = { template: '<h2>Halaman Blog</h2>' };

/**  */
const routes = [
   {path: '/', component:Home},
   {path: '/about', component: About},
   {path: '/contact', component: Contact},
   {path: '/blog', component: Blog}
]

/** */
const router = VueRouter.createRouter({
   mode: 'history',
   history: VueRouter.createWebHashHistory(),
   routes,
})

/** */
const app = Vue.createApp({
   data() {
      return {
         components: {
            'navigasi-component': Header,
         },
         menu: 'home',
         currentPath: window.location.hash,
         newTodo: '',
         todos: [
            {id: 1, todo: 'Makan'},
            {id: 2, todo: 'Minum'},
            {id: 3, todo: 'Tidur'},
         ]
      };
   },
   components: {
      'Navigasi': Header,
   },
   methods: {
      handleSubmit(e) {
         const newTodo = {
            id: this.todos.length + 1,
            todo: e.target.value,
         };
         this.todos.push(newTodo);
         e.target.value = '';
      },
      handleRemove(id) {
         this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      activeMenu(menu) {
         this.menu = menu;
      }
   },
   computed: {
      currentView() {
         return routes[this.currentPath.slice(1) || '/' ] || NotFound
      }
   },
   mounted() {
      window.addEventListener('hashchange', () => {
         this.currentPath = window.location.hash;
      });
   }
});

app.use(router);
app.mount('#app');

export default app;