// code light and dark mode
let sun = document.querySelector('.sun');
let moon = document.querySelector('.moon');
let mode = document.querySelector('.mode');
let Switch = document.querySelector('.switch');
let main = document.querySelector('main');
let deskBar = document.querySelector('.desk-bar');
let nav = document.querySelector('nav');

let count = 0;
mode.addEventListener('click', () => {
    if (count % 2 == 0) {
        Switch.style.left = '46px';
        sun.style.display = 'none';
        moon.style.display = 'block';
        Switch.classList.remove('sun-color');
        Switch.classList.add('moon-color');
        mode.style.backgroundColor = '#111';
        main.style.backgroundImage = `url('bg2.png')`;
        deskBar.style.backgroundColor = 'rgba(220, 200, 218, 0.461)';
        nav.style.color = "white";
    }
    else {
        Switch.style.left = '0px';
        sun.style.display = 'block';
        moon.style.display = 'none';
        Switch.classList.remove('moon-color');
        Switch.classList.add('sun-color');
        mode.style.backgroundColor = '#ffff';
        main.style.backgroundImage = `url('bg1.png')`;
        deskBar.style.backgroundColor = 'rgba(247, 219, 244, 0.849)';
        nav.style.color = "black";
    }
    count++;
})

// code for drop-down button
let dropCount = 0;
const dropDown = document.querySelector('.drop-down i');
const upDown = document.querySelector('ul');
dropDown.addEventListener('click', () => {
    if (dropCount % 2 == 0) {
        upDown.style.height = '120px';
    }
    else {
        upDown.style.height = '0px'
    }
    dropCount++;
})

let go = document.querySelectorAll('.go');
console.log(go)

go[0].addEventListener('click', () => {
    console.log('hi...')
    location.href = '/index.html'
})
go[1].addEventListener('click', () => {
    console.log('hi...')
    location.href = '/about.html'
})
go[2].addEventListener('click', () => {
    location.href = '/contect.html'
}) 

// for openAI api

let Message = document.querySelector('.message-bar');
let commit = document.querySelector('.commit');
let input = document.getElementById('input-value');


let clipCount = 0;

commit.disabled = true
input.addEventListener('change', (e) => {
    if (e.target.value != '') {
        commit.disabled = false
    }
    else {
        commit.disabled = true
    }
})

Message.scrollTop = Message.scrollHeight - Message.clientHeight;

// google api
const apiKey = 'AIzaSyCKqymDA3demI5CesFhYndM0q-BbDQT7T8';
 // Replace with your actual API key

 const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
 

commit.addEventListener('click', () => {
    console.log(input.value)
    if (input.value != '') {
        commit.disabled = true
        Message.innerHTML += `<div class="user-message">${input.value}</div>`
        Message.scrollTop = Message.scrollHeight - Message.clientHeight;

        const requestData = {
            contents: [
              {
                parts: [
                  { text:  input.value}
                ]
              }
            ]
          };

        let getData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                  });
                return response.json(); // Return the JSON parsed response
            } catch (error) {
                console.error('Error:', error);
            }
        }
        getData()
            .then((data) => {
                // console.log(data.candidates[0].content.parts[0].text)
                Message.innerHTML += `<div class="chatbot-message"><pre><p>${data.candidates[0].content.parts[0].text}</p></pre><div>
                    <span>
                        <i class="fa-solid fa-thumbs-up" id="thumbs-up${clipCount}"></i>
                        <i class="fa-solid fa-thumbs-down" id="thumbs-down${clipCount}"></i>
                    </span>
                    <i class="fa-solid fa-clipboard" id="clipboard${clipCount}"></i>
                </div></div>`
                input.value = ''
                Message.scrollTop = Message.scrollHeight - Message.clientHeight;
                commit.disabled = false

                let clip_board = document.querySelector(`#clipboard${clipCount}`);
                let result = data.candidates[0].content.parts[0].text;
                clip_board.addEventListener('click', () => {
                    console.log("hi..")
                    navigator.clipboard.writeText(result)
                })
                // for like and dislike botton
                let dislike = document.querySelector(`#thumbs-down${clipCount}`)
                let like = document.querySelector(`#thumbs-up${clipCount}`)
                like.addEventListener('click', () => {
                    like.style.color = 'blue';
                    dislike.style.color = '#111';
                })

                dislike.addEventListener('click', () => {
                    like.style.color = '#111';
                    dislike.style.color = 'blue';
                })

                like.addEventListener('dblclick', () => {
                    like.style.color = '#111';
                })

                dislike.addEventListener('dblclick', () => {
                    dislike.style.color = '#111';
                })
                clipCount++;
            })
            .catch((error) => console.error(error)); // Catch any errors           
    }

})