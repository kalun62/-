'use strict'

const LinkSheet = 'https://script.google.com/macros/s/AKfycbwq2iqUd_YsY8fuB78PZ7Si8CaBqKBHnsmJn5H1JVRCs9T8i4C1Zwmcc6POHxwtlpApvA/exec',
	sendFormBtn = document.querySelector('button'),
	form = document.querySelector('form'),
	inputs = document.querySelectorAll('input'),
	select = document.querySelector('select'),
	selects = document.querySelectorAll('select'),
	infoBlock = document.querySelector('.infoBlock')
	
let baseUsers = []
let dataBaseUsers = []

let time_1_arr = []
let time_2_arr = []
let time_3_arr = []


const courses = () => {
	selects.forEach(select => {
		select.innerHTML = `<option value="default">Выберите курс</option>
							<option class="robot" value="Семейная студия робототехники «Космическая Одиссея»">Семейная студия робототехники «Космическая Одиссея»</option>
							<option class="phisic" value="Семейная лаборатория «Физика вокруг нас»">Семейная лаборатория «Физика вокруг нас»</option>
							<option class="ecology" value="Эко-студия «Экология – дело каждого»">Эко-студия «Экология – дело каждого»</option>
							<option class="sledopit" value="Семейная студия логики и экспериментов «Следопыт»">Семейная студия логики и экспериментов «Следопыт»</option>
							<option class="familyPlay" value="Площадка «Семейная игротека»">Площадка «Семейная игротека»</option>
							<option class="satellite" value="Искусственные спутники Земли и Ваш ребенок">Искусственные спутники Земли и Ваш ребенок</option>
							<option class="avia" value="Мой ребенок – будущий летчик">Мой ребенок – будущий летчик</option>
							<option class="astronomy" value="Шаг в астрономию">Шаг в астрономию</option>
							<option class="robotsAndChild" value="Роботы и ваш ребенок">Роботы и ваш ребенок</option>
							<option class="graphic" value="3Д графика для всей семьи">3Д графика для всей семьи</option>
							<option class="sky" value="Разреши себе небо">Разреши себе небо</option>
							<option class="shooting" value="Стрелковый спорт">Стрелковый спорт</option>
							<option class="tracking" value="Поход как вид семейного отдыха">Поход как вид семейного отдыха</option>
							<option class="charging" value="Зарядка на кроватке">Зарядка на кроватке</option>
							<option class="swimming" value="Плавать – это здорово">Плавать – это здорово</option>
							<option class="play" value="Игра – шаг за шагом">Игра – шаг за шагом</option>
							<option class="totem" value="«Тряпичный оберег»">«Тряпичный оберег»</option>
							<option class="orlyonok" value="«Орлёнок». Вкус приключений»">«Орлёнок». Вкус приключений»</option>
							<option class="sea" value="«Море на моём листе»">«Море на моём листе»</option>
							<option class="hearth" value="«Делюсь теплом своего сердца»">«Делюсь теплом своего сердца»</option>
							<option class="skeytch" value="«Скейтч зарисовки»">«Скейтч зарисовки»</option>
							<option class="decor" value="«Ленточный декор»">«Ленточный декор»</option>
							<option class="menClub" value="Мужской клуб «Сильные духом»">Мужской клуб «Сильные духом»</option>
							`
	})	
}

courses()

form.addEventListener('submit', function(e){
	e.preventDefault()

	validate()

	let error = document.querySelector('.error')

	if(!error){
		const formData = new FormData(form)
		const data = Object.fromEntries(formData.entries())
		let fullName = data.surname.trim() + ' ' + data.name.trim() + ' ' + data.lastname.trim()

		if(baseUsers.includes(fullName.toLowerCase())){
			inputs.forEach(input => {
				input.classList.add('error')
				errorLabels(input)
				if(input.nextElementSibling.classList.contains('label')){
					input.nextElementSibling.innerText = '* Такой пользователь уже существует'
				}
			})
		}else{
			inputs.forEach(input => {
				input.classList.remove('error')
				if(input.nextElementSibling.classList.contains('label')){
					input.nextElementSibling.remove()
				}
			})
			axios.post(LinkSheet, formData)	
			finalWindow()
		}
	}
})

function choiceCourse(){
	let timeInput_1 = document.querySelector('.time_1')
	let timeInput_2 = document.querySelector('.time_2')
	let timeInput_3 = document.querySelector('.time_3')
															// доделать удаление при выбранном пункте
		let options_1 = Array.from(timeInput_1.children)
		let options_2 = Array.from(timeInput_2.children)
		let options_3 = Array.from(timeInput_3.children)

		function changeCourse(elem, option_1, option_2){
			let prevCourse
			console.log(prevCourse);
			elem.addEventListener('change', function(){
				let selected = elem.value
				
				option_1.forEach(item => {
					if(selected === item.innerHTML){
						item.style.display = 'none'
						// prevCourse.style.display = 'none'
					}else{
						item.style.display = 'block'
					}
				})
				option_2.forEach(item => {
					if(selected === item.innerHTML){
						item.style.display = 'none'
						// prevCourse.style.display = 'none'
					}else{
						item.style.display = 'block'
					}
				})
			
			})
		}

		changeCourse(timeInput_1, options_2, options_3)
		changeCourse(timeInput_2, options_1, options_3)
		changeCourse(timeInput_3, options_2, options_1)
}
choiceCourse()

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

	selects.forEach(select => {
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
	})
		
}

const getUsers = () => {
	axios.get(LinkSheet)
		.then((response) => {
			dataBaseUsers = response.data.users
			dataBaseUsers.forEach(user => {
				let userFullName = user.surname.trim() + ' ' + user.name.trim() + ' ' + user.lastname.trim()
				baseUsers.push(userFullName.toLowerCase())

				time_1_arr.push(user.time_1)
				time_2_arr.push(user.time_2)
				time_3_arr.push(user.time_3)
			})

				time_1_arr.forEach(item => {
					disableCourse(item, 'time_1')
				})

				robot = [], phisic = [], ecology = [], sledopit = [], familyPlay = [], satellite = [], avia = [], astronomy = [], robotsAndChild = [], graphic = [], sky = [], shooting = [], tracking = [], charging = [], swimming = [], play = [], totem = [], orlyonok = [], sea = [], hearth = [], skeytch = [], decor = [], menClub = []
			
				time_2_arr.forEach(item => {
					disableCourse(item, 'time_2')
				})

				robot = [], phisic = [], ecology = [], sledopit = [], familyPlay = [], satellite = [], avia = [], astronomy = [], robotsAndChild = [], graphic = [], sky = [], shooting = [], tracking = [], charging = [], swimming = [], play = [], totem = [], orlyonok = [], sea = [], hearth = [], skeytch = [], decor = [], menClub = []
				
				time_3_arr.forEach(item => {
					disableCourse(item, 'time_3')
				})

		})
}
getUsers()


let robot = [], phisic = [], ecology = [], sledopit = [], familyPlay = [], satellite = [], avia = [], astronomy = [], robotsAndChild = [], graphic = [], sky = [], shooting = [], tracking = [], charging = [], swimming = [], play = [], totem = [], orlyonok = [], sea = [], hearth = [], skeytch = [], decor = [], menClub = []
	

	function disableCourse(item, selector){
					
		switch (item) {
			case 'Семейная студия робототехники «Космическая Одиссея»':
				robot.push(item)
				if(robot.length >= 20){
					document.querySelector(`.${selector} .robot`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Семейная лаборатория «Физика вокруг нас»':
				phisic.push(item)
				if(phisic.length >= 20){
					document.querySelector(`.${selector} .phisic`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Эко-студия «Экология – дело каждого»':
				ecology.push(item)
				if(ecology.length >= 20){
					document.querySelector(`.${selector} .ecology`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Семейная студия логики и экспериментов «Следопыт»':
				sledopit.push(item)
				if(sledopit.length >= 20){
					document.querySelector(`.${selector} .sledopit`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Площадка «Семейная игротека»':
				familyPlay.push(item)
				if(familyPlay.length >= 20){
					document.querySelector(`.${selector} .familyPlay`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Искусственные спутники Земли и Ваш ребенок':
				satellite.push(item)
				if(satellite.length >= 15){
					document.querySelector(`.${selector} .satellite`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Мой ребенок – будущий летчик':
				avia.push(item)
				if(avia.length >= 15){
					document.querySelector(`.${selector} .avia`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Шаг в астрономию':
				astronomy.push(item)
				if(astronomy.length >= 15){
					document.querySelector(`.${selector} .astronomy`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Роботы и ваш ребенок':
				robotsAndChild.push(item)
				if(robotsAndChild.length >= 15){
					document.querySelector(`.${selector} .robotsAndChild`).setAttribute('disabled', 'disabled')
				}
				break;
			case '3Д графика для всей семьи':
				graphic.push(item)
				if(graphic.length >= 14){
					document.querySelector(`.${selector} .graphic`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Разреши себе небо':
				sky.push(item)
				if(sky.length >= 11){
					document.querySelector(`.${selector} .sky`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Стрелковый спорт':
				shooting.push(item)
				if(shooting.length >= 15){
					document.querySelector(`.${selector} .shooting`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Поход как вид семейного отдыха':
				tracking.push(item)
				if(tracking.length >= 45){
					document.querySelector(`.${selector} .tracking`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Зарядка на кроватке':
				charging.push(item)
				if(charging.length >= 15){
					document.querySelector(`.${selector} .charging`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Плавать – это здорово':
				swimming.push(item)
				if(swimming.length >= 10){
					document.querySelector(`.${selector} .swimming`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Игра – шаг за шагом':
				play.push(item)
				if(play.length >= 45){
					document.querySelector(`.${selector} .play`).setAttribute('disabled', 'disabled')
				}
				break;
			case '«Тряпичный оберег»':
				totem.push(item)
				if(totem.length >= 15){
					document.querySelector(`.${selector} .totem`).setAttribute('disabled', 'disabled')
				}
				break;
			case '«Орлёнок». Вкус приключений»':
				orlyonok.push(item)
				if(orlyonok.length >= 15){
					document.querySelector(`.${selector} .orlyonok`).setAttribute('disabled', 'disabled')
				}
				break;
			case '«Море на моём листе»':
				sea.push(item)
				if(sea.length >= 15){
					document.querySelector(`.${selector} .sea`).setAttribute('disabled', 'disabled')
				}
				break;
			case '«Делюсь теплом своего сердца»':
				hearth.push(item)
				if(hearth.length >= 15){
					document.querySelector(`.${selector} .hearth`).setAttribute('disabled', 'disabled')
				}
				break;
			case '«Скейтч зарисовки»':
				skeytch.push(item)
				if(skeytch.length >= 15){
					document.querySelector(`.${selector} .skeytch`).setAttribute('disabled', 'disabled')
				}
				break;
			case '«Ленточный декор»':
				decor.push(item)
				if(decor.length >= 15){
					document.querySelector(`.${selector} .decor`).setAttribute('disabled', 'disabled')
				}
				break;
			case 'Мужской клуб «Сильные духом»':
				menClub.push(item)
				if(menClub.length >= 25){
					document.querySelector(`.${selector} .menClub`).setAttribute('disabled', 'disabled')
				}
				break;
			}
	}