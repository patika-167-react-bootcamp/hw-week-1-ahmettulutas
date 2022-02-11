
Array.prototype.includesCI = function(search) {
    if  (typeof search === 'string') {
        return result =  this.some(item =>   item.toLowerCase() === search.toLowerCase());
    } 
    else {
      return  "Lütfen bir string değer giriniz.";
        }
    }
        
    
    
// Testler
const arr = ['ahhh', 'b', "ada", "akda"];

console.log(arr.includesCI("ahhh"));
console.log(arr.includesCI("b"))
console.log(arr.includesCI("a"))
console.log(arr.includesCI("A"))
console.log(arr.includesCI("aH"))
console.log(arr.includesCI("AH"))
console.log(arr.includesCI("AHh"))
console.log(arr.includesCI("AŞğ"))
console.log(arr.includesCI(2)) 
console.log(arr.includesCI([1,2,3]))



