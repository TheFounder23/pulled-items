var gold = document.querySelector('.gold');
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e7a0f1b42emshed5044437aabf25p19679ajsn83c9ce1fdf21',
		'X-RapidAPI-Host': 'gold-price-live.p.rapidapi.com'
	}
};

fetch('https://gold-price-live.p.rapidapi.com/get_metal_prices', options)
	.then(response => response.json())
	.then(data =>{ 
    var au = data[0].gold;
    var ag  = data.silver;
     gold.innerHTML = au;
  })
	.catch(err => console.error(err));