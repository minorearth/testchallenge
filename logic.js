// const f(x):

// function d2any(dec, base) {
//   return (dec >>> 0).toString(base);
// }

// const f = (input) => {
//   const [a,b]=input.split("");
//   console.log(input, !((a === b))*1) 

//   return;
// };

// n = 2;
// for (let i = 0; i < 2 ** n; i++) {
//   res = d2any(i, 2);
//   full = "0".repeat(n - res.length) + res;
//   f(full)
// }
let arr = [1,2,3,4]
[arr[0], arr[1]] = [arr[1], arr[0]];
console.log(arr)


// const f = (a, x1, x2) => {
//     for (i in a) {
//       let tmp = a[i][x1]
//       a[i][x1] = a[i][x2]
//       a[i][x2] = tmp
//     }
//     return a
//   }
  
//   let a = [[11, 12, 13], [21, 22, 23], [31, 32, 33]]
//   // console.table(a)
//   for (let i = 0; i < 2; i++) {
//     for (let j = i+1; j < 3; j++) { 
//       console.table(f([...a.map(item=>[...item])],i,j))
//     }
  
//   }
  