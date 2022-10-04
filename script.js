'use strict'

const linkSheets = 'https://script.google.com/macros/s/AKfycbyORORBV1DTa5hc4rXabWH68CPGmOXRdPBi7LKN8tVP4Bk_R-MYzzckdE3xcXVjhX5GHQ/exec?p1=SUCCESS&p2=Server1%20is%20complete',
	sendFormBtn = document.querySelector('button'),
	form = document.querySelector('form')

form.addEventListener('submit', function(e){
	e.preventDefault()
	const formData = new FormData(form)
	const data = Object.fromEntries(formData.entries())
	console.log(data);
	axios.post(linkSheets, data)
})

