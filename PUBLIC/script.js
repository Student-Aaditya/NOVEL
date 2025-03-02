let input = document.querySelector("#email"); 
let btn = document.querySelector(".btn");

btn.addEventListener("click", function() {
    let email = input.value;
    if (email.includes('@gmail.com')) {
        console.log("valid");
    } else {
        // console.log("invalid");
        alert("enter valid email");
    }
});

module.exports = function Check(inputValue) {
    return inputValue.includes('@gmail.com');
};


