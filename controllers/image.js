const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'dd87079ca9c5479285a4ef02ea98c981'
});


// const returnClarifaiRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   const PAT = '1a7afba83de642c089f0ac788d63e995';
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = 'kailin';       
//   const APP_ID = 'facerecognition';
//   // Change these to whatever model and image URL you want to use
//   const IMAGE_URL = imageUrl;
//   //const MODEL_ID = 'face-detection';

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
//   });

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//         'Accept': 'application/json',
//         'Authorization': 'Key ' + PAT
//     },
//     body: raw
//   };

//   return requestOptions;
// }


const handleApiCall = (req, res) => {
	app.models
	.predict('face-detection', req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err=> res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	  .increment('entries',1)
	  .returning('entries')
	  .then(entries => {
	  	res.json(entries[0].entries);
	  })
	  .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
	handleImage, handleApiCall
}