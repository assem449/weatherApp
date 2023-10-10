import React from 'react';
import './ClothingRecommendation.css';
import clearSkyHot from '../../images/clearSkyHot.png';
import shirtWithJeans from '../../images/shirtWithJeans.png';
import winterCloth from '../../images/winterCloth.png';
import raincoat from '../../images/raincoat.png';
import jeansWithJacket from '../../images/jeansWithJacket.png';
import surprised from '../../images/surprised.png';

export default function ClothingRecommendation({ weatherDesc, temperature }) {
  console.log('Weather Description:', weatherDesc);
  console.log('Temperature:', temperature);
  const getRecommendedClothes = (weatherDesc, temperature) => {
    const weatherToClothes = {
      'clear sky': {
        hot: { recommendation: 'I recommend wearing a light T-shirt and shorts for a comfortable and casual outfit choice', image: clearSkyHot },
        moderate: { recommendation: 'For a classic and versatile look, opt for a T-shirt and jeans combination that offers both style and comfort', image: shirtWithJeans },
        cold: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket }
      },
      'few clouds': {
        hot: { recommendation: 'I recommend wearing a light T-shirt and shorts for a comfortable and casual outfit choice', image: clearSkyHot },
        moderate: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
        cold: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
      },
      'shower rain': {
        hot: { recommendation: 'Pairing a T-shirt with jeans is a timeless choice, and do not forget to bring an umbrella for unpredictable weather conditions', image: shirtWithJeans},
        moderate: { recommendation: 'Prepare for unexpected rain by wearing a raincoat over your T-shirt and jeans for a practical and comfortable outfit', image: raincoat},
        cold: { recommendation: 'Good luck my friend! Wear something warmer under the raincoat.', image: raincoat},
      },
      'light rain': {
        hot: { recommendation: 'Pairing a T-shirt with jeans is a timeless choice, and do not forget to bring an umbrella for unpredictable weather conditions', image: shirtWithJeans},
        moderate: { recommendation: 'Prepare for unexpected rain by wearing a raincoat over your T-shirt and jeans for a practical and comfortable outfit', image: raincoat},
        cold: { recommendation: 'Good luck my friend! Wear something warmer under the raincoat.', image: raincoat},
      },
      'moderate rain': {
        hot: { recommendation: 'Pairing a T-shirt with jeans is a timeless choice, and do not forget to bring an umbrella for unpredictable weather conditions', image: shirtWithJeans},
        moderate: { recommendation: 'Prepare for unexpected rain by wearing a raincoat over your T-shirt and jeans for a practical and comfortable outfit', image: raincoat},
        cold: { recommendation: 'Good luck my friend! Wear something warmer under the raincoat.', image: raincoat},
      },
      'rain': {
        hot: { recommendation: 'Pairing a T-shirt with jeans is a timeless choice, and do not forget to bring an umbrella for unpredictable weather conditions', image: shirtWithJeans},
        moderate: { recommendation: 'Prepare for unexpected rain by wearing a raincoat over your T-shirt and jeans for a practical and comfortable outfit', image: raincoat},
        cold: { recommendation: 'Good luck my friend! Wear something warmer under the raincoat.', image: raincoat},
      },
      'thunderstorm': {
        hot: { recommendation: 'Pairing a T-shirt with jeans is a timeless choice, and do not forget to bring an umbrella for unpredictable weather conditions', image: shirtWithJeans},
        moderate: { recommendation: 'Prepare for unexpected rain by wearing a raincoat over your T-shirt and jeans for a practical and comfortable outfit', image: raincoat},
        cold: { recommendation: 'Good luck my friend! Wear something warmer under the raincoat.', image: raincoat},
      },
      'snow': {
        hot: { recommendation: 'Is it even posiible?',  image: surprised},
        moderate: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
        cold: { recommendation: 'For chilly weather, layer a sweater or blouse with jeans, and top it off with a warm jacket, scarf, and hat for a stylish and snug ensemble', image: winterCloth },
      },
      'mist': {
        hot: { recommendation: 'I recommend wearing a light T-shirt and shorts for a comfortable and casual outfit choice', image: clearSkyHot },
        moderate: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
        cold: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
        },
      default: {
        hot: { recommendation: 'I recommend wearing a light T-shirt and shorts for a comfortable and casual outfit choice', image: clearSkyHot },
        moderate: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
        cold: { recommendation: 'Consider wearing jeans, and a light jacket for a stylish and adaptable outfit', image: jeansWithJacket},
        },
     
    };


    console.log('Temperature:', temperature);
    console.log(typeof temperature); // Check the data type
    temperature = parseInt(temperature, 10); // Parse the variable to ensure it's a number

    let temperatureRange;
    if (temperature > 25) {
      temperatureRange = 'hot';
    } else if (temperature > 15) {
      temperatureRange = 'moderate';
    } else {
      temperatureRange = 'cold';
    }
    console.log('Temperature range:', temperatureRange);

    const weatherCondition = weatherToClothes[weatherDesc.toLowerCase()] || weatherToClothes.default;
    return weatherCondition[temperatureRange] || {
      recommendation: 'Weather-appropriate clothing',
      image: jeansWithJacket
    };
  };

  const { recommendation, image } = getRecommendedClothes(weatherDesc, temperature);

  return (
    <div className='clothing-recommendation'>
      <div className='image-container'>
        <img src={image} alt={recommendation} />
      </div>
      <div className='recommendation-text'>
      <p className='custom-font'>{recommendation}</p>
      </div>
    </div>
  );
}

