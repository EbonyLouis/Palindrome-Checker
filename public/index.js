const btn = document.getElementById('check')
const result = document.getElementById('result')


function checkIfTheWordIsPalindromeOrNot(){
 let word = document.querySelector('.word').value

 // NOT SURE HOW I WILL SPECIFY THIS PART
 // const name = this.parentNode.parentNode.childNodes[1].innerText
  fetch(`/api?word=${word}` , {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'word': word,
    })
  })

  .then(res => res.json())
  .then(res => {
    let object = res.prop // res.prop is the info from the object I made in the server.js file
    if(object === "true"){
    result.innerHTML = `${word} is a palindrome`
  }else{
    result.innerHTML = `${word} is not a palindrome`
  }
    window.location.reload(true)
})
// .catch(err => {
//     console.log(`error ${err}`)
//     alert("sorry, there are no results for your search")
// });
}

btn.addEventListener('click', ()=>{
  checkIfTheWordIsPalindromeOrNot()
})


// fetch('messages', {
//   method: 'put',
//   headers: {'Content-Type': 'application/json'},
//   body: JSON.stringify({
//     'name': name,
//     'msg': msg,
//     'thumbUp':thumbUp
//   })
// })
// .then(response => {
//   if (response.ok) return response.json()
// })
// .then(data => {
//   console.log(data)
//   window.location.reload(true)
// })
