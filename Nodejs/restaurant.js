function placeorder(ordernumber) {
console.log("placing an order for order number :",ordernumber);
cookanddeliver(function(){ console.log("The order is delivered",ordernumber)});
}

function cookanddeliver(callback) {
setTimeout(callback,5000);
}

placeorder(1);
placeorder(2);
placeorder(3);
