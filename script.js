'use strict'

const postLinkSheets = 'https://script.google.com/macros/s/AKfycbwkxhH79iYWUS-AN8tm2_B7cO2wEiXflEcm5QKfx9bqEwkBaUbFdBXIZ3a1JMl-HnAoYg/exec',
	sendFormBtn = document.querySelector('button'),
	form = document.querySelector('form'),
	inputs = document.querySelectorAll('input'),
	select = document.querySelector('select')
	
let baseUsers = []
let dataBaseUsers = []


form.addEventListener('submit', function(e){
	e.preventDefault()

	validate()

	let error = document.querySelector('.error')

	if(!error){
		const formData = new FormData(form)
		const data = Object.fromEntries(formData.entries())
		console.log(data);
		let fullName = data.surname.trim() + ' ' + data.name.trim() + ' ' + data.lastname.trim()

		if(baseUsers.includes(fullName.toLowerCase())){
			inputs.forEach(input => {
				input.classList.add('error')
				errorLabels(input)
				if(input.nextElementSibling.classList.contains('label')){
					input.nextElementSibling.innerText = '* Такой пользователь уже существует'
					if(window.innerWidth < 768){
						input.nextElementSibling.style.left = '14%'
					}	
				}
			})
		}else{
			inputs.forEach(input => {
				input.classList.remove('error')
				if(input.nextElementSibling.classList.contains('label')){
					input.nextElementSibling.remove()
				}
			})
			axios.post(postLinkSheets, formData)	
			finalWindow()
		}
	}
})

function infoCourses(){
	select.addEventListener('change', function(){
		// доделать заполнение информации
	})
}
infoCourses()

function finalWindow(){
	let formWidth = form.getBoundingClientRect().width
	let formHeight = form.getBoundingClientRect().height
	form.style.width = formWidth + 'px'
	form.style.height = formHeight + 'px'
	form.classList.add('finale')
	form.innerHTML = `<div>Спасибо!</div>`
}

function errorLabels(input) {
	let errorLabel = document.createElement('label')
	if(input.classList.contains('error')){
		errorLabel.setAttribute('for', input.name)
		errorLabel.classList.add('label')
		errorLabel.innerHTML = `* Заполните поле`
		if(!input.nextElementSibling.classList.contains('label')){
			input.after(errorLabel)
		}
	}else{
		errorLabel.remove()
	}
}

function validate(){
	inputs.forEach(input => {
		(input.value === '')
			? (input.classList.add('error'), errorLabels(input))
			: input.classList.remove('error')
	
		input.addEventListener('focus', () => {
			if(input.nextElementSibling.classList.contains('label')){
				input.nextElementSibling.remove()
			}
			input.classList.remove('error')
		})		
	})

		if(select.value === 'default'){
			select.classList.add('error')
			errorLabels(select)
			if(select.nextElementSibling.classList.contains('label')){
				select.nextElementSibling.innerText = '* Выберите пункт'
			}
		}else{
			select.classList.remove('error')
		}
				
	select.addEventListener('focus', () => {
		if(select.nextElementSibling.classList.contains('label')){
			select.nextElementSibling.remove()
		}
		select.classList.remove('error')
	})		
}

const getUsers = () => {
	axios.get(postLinkSheets)
		.then((response) => {
			dataBaseUsers = response.data.users
			dataBaseUsers.forEach(user => {
				let userFullName = user.surname.trim() + ' ' + user.name.trim() + ' ' + user.lastname.trim()
				baseUsers.push(userFullName.toLowerCase())
			})
		})
}
getUsers()




// сделать ограничения на 100 человек на курс
// доделать вставку информации о курсах по выбранному select