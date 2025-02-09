const socket = io()


//console.log('main.js is loaded');

console.log('Connecting to WebSocket server...');

const productList = document.getElementById('products');

socket.on('init', (product) => {
  console.log('Products received from server:', product);
  productList.innerHTML = '';
  product.forEach(product => {
    const card = createNewProducts(product);
    productList.appendChild(card);
  });
});

socket.on('new-product', (product) => {
  const card = createNewProducts(product);
  productList.appendChild(card);
});

function createNewProducts(product) {
  const div = document.createElement('div');
  div.classList.add('column', 'is-one-third');
  div.innerHTML = `
    <div class="card">
      <div class="card-content">
        <p class="title">${product.title}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Code:</strong> ${product.code}</p>
        <p><strong>Price:</strong> $${product.price}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
      </div>
    </div>
  `;
  return div;
}