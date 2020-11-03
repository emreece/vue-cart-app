window.addEventListener('load', () => {
   window.vue =  new Vue({
        el: '#app',
        name: 'Cart',
        data: {
            isLoading: true,
            products:[],
            cart:[]
        },
        methods: {
            moveToCart(index) {
                const item = this.products.splice(index,1)[0];
                this.cart.push(item);
            },
            moveToProducts(index) {
                const item = this.cart.splice(index,1)[0];
                this.products.push(item);
            }
        },
        computed: {
            cartTotal() {
                let total = 0;
                this.cart.forEach(element => {
                    total += parseFloat(element.price);
                });
                return total.toFixed(2);
            },
            cartsCount() {
                let total = 0;
                let data = {};
                this.cart.forEach(element => {
                    total++;
                });
                if(total == 0) { data.message = 'No Item'; data.number = '';} 
                else if (total == 1) { data.message = ' item'; data.number = total;  } 
                else { data.message = 'items'; data.number = total;  }
                return data;
            },
            productsCount() {
                let total = 0;
                let data = {};
                this.products.forEach(element => {
                    total++;
                });
                if(total == 0) { data.message = 'No Item'; data.number = '';} 
                else if (total == 1) { data.message = ' item'; data.number = total;  } 
                else { data.message = 'items'; data.number = total;  }
                return data;
            },
        },
        created() {
            fetch('./data.json')
                .then((res) => {return res.json()})
                .then((res) => {
                    this.isLoading = false; 
                    this.products = res.products;
                    this.cart = res.cart;
                })
        }
    })
})