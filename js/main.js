// var user = window.prompt("write number 5 ..")
// console.log(user);
// -------------------------------

// var i = Number(window.prompt('write a number'))
// if (i %3==0&& i %4==0) {
//     console.log("yes");
// }else{
//     console.log('no');
// }
// ---------------------------------------

// var x = Number(window.prompt("write first number"))
// var y = Number(window.prompt("write second number"))

// if(x>y){
//     console.log(x);
// }else if(y>x){
//     console.log(y);
// }
// -----------------------------------------------

// var x = Number(window.prompt("write a number"))
// if(x<0)
// {
//     console.log('negative');
// }else{
//     console.log('positive');
// }
// ---------------------------------------------------

// var x=Number(window.prompt('write a number'))
// var y=Number(window.prompt('write a number'))
// var z=Number(window.prompt('write a number'))

// if(x>y&&x>z){
//     window.alert('max number is '+x)
// }else if(y>x&&y>z){
//     window.alert('max number is '+y)
// }else if(z>y&&z>x){
//     window.alert('max number is '+z)
// }
// if(x<y&&x<z){
//     window.alert('min number is '+x)
// }else if(y<x&&y<z){
//     window.alert('min number is '+y)
// }else if(z<y&&z<x){
//     window.alert('min number is '+z)
// }
// -----------------------------------------------------

// var x = Number(window.prompt("write a number"))

// if(x %2== 0){
//     console.log('oven');
// }else{
//     console.log('odd');
// }
// -------------------------------------------------------

// var x = window.prompt("write a character")

// if(x == "a"){
//     console.log('vowel');
// }else if(x=="e"){
//     console.log('vowel');
// }
// else if(x=="o"){
//     console.log('vowel');
// }
// else if(x=="u"){
//     console.log('vowel');
// }
// else if(x=="i"){
//     console.log('vowel');
// }else{
//     console.log("Consonant");
// }
// -------------------------------------------------------------

// var x = Number(window.prompt('write a number'))

// for( i=1 ; i<=x ; i++ ){
//     console.log(i);
// }
// ------------------------------------------------------------

// var x = 10;
// console.log(x);
// function welcome() {
//     var x = 100;
//     console.log(x);
// }
// welcome();
// console.log(x);

// function products(rebeatTime, productName , elementId)
// {
//     var x = "";
//     for(var i=0 ; i<rebeatTime ; i++ )
//     {
//         x += productName;
//     }

//     document.getElementById(elementId).innerHTML = x
// }
// products(100,"<h1>T-shirt</h1>",'demo')

// var product = {
//     image :'<img src="img/blog-1.jpg" alt="">',
//     name : 'samsung',
//     category : 'mobiles',
//     price : 15000,
//     buy : function(paymentMethod){
//         console.log('want it ? pay with'+paymentMethod);
//     }
// };
// console.log(product);
// product.buy('master card')

// var productsContainer = [
//     {name:'samsung', category: "tv", price: 20000, desc:'65" '},
//     {name:'toshiba', category: "tv", price: 15000, desc:'65" '},
//     {name:'lg', category: "tv", price: 22000, desc:'65" '},
//     {name:'sony', category: "tv", price: 50000, desc:'65" '}
// ]
// for( i=0 ; i<productsContainer.length ; i++ ){
//     console.log(productsContainer[i].name);
// }
// --------------------------------------------------------------


var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var DescriptionInput = document.getElementById('Description');
var productsContainer = []
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');


if(localStorage.getItem("products") != null)
{
    productsContainer = JSON.parse(localStorage.getItem("products"));
    displayProduct(productsContainer)
}

function addProduct(){
    if(validateProductName() == true)
    {
        var product = {
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            description : DescriptionInput.value
            }
            productsContainer.push(product)
            localStorage.setItem("products" , JSON.stringify(productsContainer))
            displayProduct (productsContainer)
            clearForm()  
    }else
    {
        alert('invalid product name')
    }
}
function displayProduct (arr){
 var cartoona = ''
for( i = 0 ; i < arr.length ; i++ ){
    cartoona += `<tr>
    <td>${arr[i].name}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].category}</td>
    <td>${arr[i].description}</td>
    <td><button class="btn btn-outline-warning" onclick="setFormForUpdate(${i})">Update</button></td>
    <td><button onclick="deleteProducts(${i});" class="btn btn-outline-danger">Delete</button></td>
</tr>`
}
document.getElementById('tbody').innerHTML = cartoona
}
function clearForm(){
    productNameInput.value = ''
    productPriceInput.value = ''
    productCategoryInput.value = ''
    DescriptionInput.value = ''
}
function deleteProducts(productIndex){
    productsContainer.splice(productIndex , 1)
    localStorage.setItem("products" , JSON.stringify(productsContainer))
    displayProduct (productsContainer)
}
function searchProducts(term)
{
    var matchedProducts = [];
    for(var i=0; i<productsContainer.length; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) === true)
        {
            matchedProducts.push(productsContainer[i])
        }
    }
    displayProduct(matchedProducts);
}

function setFormForUpdate(i)
{
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none' , 'd-block');
    productNameInput.value = productsContainer[i].name;
    productPriceInput.value = productsContainer[i].price;
    productCategoryInput.value = productsContainer[i].category;
    DescriptionInput.value = productsContainer[i].description;
    deleteProducts()
}

function validateProductName ()
{
    var regex = /^[A-Z][a-z]{3,8}$/;
    return regex.test(productNameInput.value)
}